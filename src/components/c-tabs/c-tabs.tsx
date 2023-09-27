import {
  Component,
  h,
  Host,
  Element,
  Event,
  Prop,
  EventEmitter,
  Listen,
  Watch,
} from '@stencil/core';

/**
 * @group Content Selectors
 * @slot Default slot - Default slot
 */
@Component({
  tag: 'c-tabs',
  styleUrl: 'c-tabs.scss',
  shadow: true,
})
export class CTabs {
  /**
   * Currently active tab
   */
  @Prop({ mutable: true }) value!: number | string;

  /**
   * Disable the bottom border
   */
  @Prop() borderless = false;

  /**
   * Emit changes to the parent
   */
  @Event({ bubbles: false }) changeValue: EventEmitter;

  @Element() el: HTMLCTabsElement;

  private _initialized = false;

  private _resizeObserver: ResizeObserver;

  private _debounce = null;

  @Watch('value')
  onExternalValueChange() {
    this._handleActiveTab();
    this.changeValue.emit(this.value);
  }

  @Listen('tabChange', { passive: true })
  tabChangeHandler(e) {
    this.value = e.detail;
  }

  @Listen('keydown', { capture: true })
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.code === 'Space') {
      this.value = (event.target as HTMLCTabElement).value;
    }
  }

  @Listen('keyup', { capture: true })
  handleKeyUp(ev: KeyboardEvent) {
    const isArrowLeft = ev.key === 'ArrowLeft';
    const isArrowRight = ev.key === 'ArrowRight';
    const tabIndex = this._getTabIndex(this.value);

    const firstAvailableValue = this.availableValues.at(0);
    const lastAvailableValue = this.availableValues.at(-1);

    const isBeginning = this.value === firstAvailableValue;
    const isEnd = this.value === lastAvailableValue;

    const nextValue = isEnd
      ? firstAvailableValue
      : this.availableValues[tabIndex + 1];
    const previousValue = isBeginning
      ? lastAvailableValue
      : this.availableValues[tabIndex - 1];

    if (!isArrowRight && !isArrowLeft) return;

    if (isArrowLeft) {
      this.value = previousValue;
    }

    if (isArrowRight) {
      this.value = nextValue;
    }

    this._handleActiveTab(true);

    this.changeValue.emit(this.value);
  }

  componentDidLoad() {
    this._observer.observe(this.el);

    this._resizeObserver = new ResizeObserver(() => {
      this._handleResize();
    });

    this._resizeObserver.observe(this.el);
  }

  get tabs() {
    return (Array.from(this.el.childNodes) as HTMLCTabElement[]).filter(
      (tab) => tab.tagName === 'C-TAB',
    );
  }

  get setsize() {
    return this.tabs.length;
  }

  get availableValues() {
    return this.tabs.filter((tab) => !tab.disabled).map((tab) => tab.value);
  }

  private _observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this._handleActiveTab();

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 1 },
  );

  private _getTabIndex(value: string | number) {
    return this.availableValues.findIndex((tab) => tab === value);
  }

  private _setIndicatorLeft(value: number) {
    this.el.style.setProperty('--c-tabs-indicator-left', `${value}px`);
  }

  private _setIndicatorWidth(value: number) {
    this.el.style.setProperty('--c-tabs-indicator-width', value.toString());
  }

  private _handleActiveTab(isUserAction = false) {
    requestAnimationFrame(() => {
      let position = 0;

      const oldTab =
        (this.el.querySelector('[aria-selected="true"]') as HTMLCTabElement) ??
        this.tabs[0];

      this.tabs.forEach((tab: HTMLCTabElement) => {
        if (!tab.disabled) {
          position += 1;
        }

        const isActive = tab.value === this.value;

        tab.active = isActive;

        if (!isUserAction && !tab.disabled) {
          tab.position = position;
          tab.setsize = this.availableValues.length;
        }

        if (isActive) {
          this._moveIndicator(oldTab, tab);
        }

        if (isActive && isUserAction) {
          tab.focus();
        }
      });
    });
  }

  private _handleResize() {
    if (this._debounce !== null) {
      clearTimeout(this._debounce);
      this._debounce = null;
    }

    this._debounce = setTimeout(() => {
      this._handleActiveTab();
    }, 200);
  }

  private _moveIndicator(oldTab: HTMLCTabElement, newTab: HTMLCTabElement) {
    requestAnimationFrame(() => {
      if (this._initialized) {
        this.el.style.setProperty('--_transition-speed', '200ms');
      }

      const newTabWidth = newTab.offsetWidth / this.el.offsetWidth;

      const newTabPosition = oldTab.compareDocumentPosition(newTab);

      let transitionWidth = 0;

      // if the new tab is to the right
      if (newTabPosition === 4) {
        transitionWidth =
          newTab.offsetLeft + newTab.offsetWidth - oldTab.offsetLeft;
      } else {
        // if the tab is to the left
        transitionWidth =
          oldTab.offsetLeft + oldTab.offsetWidth - newTab.offsetLeft;

        this._setIndicatorLeft(newTab.offsetLeft);
      }

      this._setIndicatorWidth(transitionWidth / this.el.offsetWidth);

      const onTransitionEnd = (event) => {
        if (event.propertyName !== 'scale') return;

        this._setIndicatorLeft(newTab.offsetLeft);

        this._setIndicatorWidth(newTabWidth);

        this.el.removeEventListener('transitionend', onTransitionEnd);

        if (!this._initialized) {
          this.el.classList.add('c-tabs--initialized');
        }

        this._initialized = true;
      };

      this.el.addEventListener('transitionend', onTransitionEnd);
    });
  }

  render() {
    const classes = {
      'c-tabs': true,
      'c-tabs--borderless': this.borderless,
    };

    return (
      <Host role="tablist" class={classes}>
        <slot></slot>
      </Host>
    );
  }
}
