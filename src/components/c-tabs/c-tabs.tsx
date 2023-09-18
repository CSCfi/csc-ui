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
    this._handleActiveTab();
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

  private _getTabIndex(value: string | number) {
    return this.availableValues.findIndex((tab) => tab === value);
  }

  private _handleActiveTab(isUserAction = false) {
    let position = 0;

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

      if (isActive && isUserAction) {
        tab.focus();
      }
    });
  }

  render() {
    const classes = {
      'c-tabs': true,
      'c-tabs--borderless': this.borderless,
    };

    return (
      <Host role='tablist' class={classes}>
        <slot></slot>
      </Host>
    );
  }
}
