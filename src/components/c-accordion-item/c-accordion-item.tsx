import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  Listen,
  Element,
  Host,
} from '@stencil/core';
import { mdiChevronRight } from '@mdi/js';

/**
 * @parent c-accordion
 * @slot Default slot - Default slot
 */
@Component({
  tag: 'c-accordion-item',
  styleUrl: 'c-accordion-item.scss',
  shadow: true,
})
export class CAccordionItem {
  @Element() el: HTMLCAccordionItemElement;

  /**
   * Marks the item as collapsable
   * @private
   */
  @Prop() collapsable = false;

  /**
   * Heading of the accordion item
   */
  @Prop() heading: string;

  /**
   * Value of the accordion item
   */
  @Prop() value: number | string;

  /**
   * Expansion status of the item
   */
  @Prop() expanded = false;

  /**
   * Show an outline around the expanded item
   * @private
   */
  @Prop() outlined = false;

  /**
   * Emit changes to the c-accordion
   * @private
   */
  @Event() itemChange: EventEmitter;

  private _animation: Animation;

  private _accordionElement: HTMLDetailsElement;

  private _accordionHeader: HTMLDetailsElement;

  private _accordionContent: HTMLDivElement;

  private _isCollapsing = false;

  private _isExpanding = false;

  private static _uniqueId = 0;

  @Listen('keydown', { capture: true })
  handleKeyDown(event: KeyboardEvent) {
    if (
      (event.target as HTMLElement).tagName === 'C-ACCORDION-ITEM' &&
      (event.key === 'Enter' || event.code === 'Space')
    ) {
      event.preventDefault();

      this._onToggleAccordion(event);
    }
  }

  @Listen('changeValue')
  stop(event: Event) {
    event.stopPropagation();
  }

  private get _collapsedHeight() {
    const outlineHeight = this.outlined ? 4 : 0;

    return this._accordionHeader.offsetHeight + outlineHeight;
  }

  private get _expandedHeight() {
    const outlineHeight = this.outlined ? 4 : 0;
    const headerHeight = this._accordionHeader.offsetHeight;
    const contentHeight = this._accordionContent.offsetHeight;

    return headerHeight + contentHeight + outlineHeight;
  }

  private _onToggleAccordion(e) {
    e.preventDefault();

    if (!this.collapsable && this.expanded) return;

    this._accordionElement.classList.add('c-accordion-item--expanding');

    if (this._isCollapsing || !this.expanded) {
      this._expand();
    } else if (this._isExpanding || this.expanded) {
      this._collapse();
    }
  }

  private _collapse() {
    this._isCollapsing = true;

    const startHeight = `${this._accordionElement.offsetHeight}px`;

    const endHeight = `${this._collapsedHeight}px`;

    if (this._animation) {
      this._animation.cancel();
    }

    this.itemChange.emit({ value: this.value, expanded: this.expanded });

    this._animation = this._accordionElement.animate(
      { height: [startHeight, endHeight] },
      { duration: 300, easing: 'cubic-bezier(0.25, 0.8, 0.5, 1)' },
    );

    this._animation.onfinish = () => this._onAnimationFinish(false);
    this._animation.oncancel = () => (this._isCollapsing = false);
  }

  private _expand() {
    this._accordionElement.style.height = `${this._accordionElement.offsetHeight}px`;

    this.expanded = true;

    window.requestAnimationFrame(() => {
      this._isExpanding = true;

      const startHeight = `${this._collapsedHeight}px`;

      const endHeight = `${this._expandedHeight}px`;

      if (this._animation) {
        this._animation.cancel();
      }

      this.itemChange.emit({ value: this.value, expanded: this.expanded });

      this._animation = this._accordionElement.animate(
        { height: [startHeight, endHeight] },
        { duration: 300, easing: 'cubic-bezier(0.25, 0.8, 0.5, 1)' },
      );

      this._animation.onfinish = () => this._onAnimationFinish(true);
      this._animation.oncancel = () => (this._isExpanding = false);
    });
  }

  private _onAnimationFinish(isOpen: boolean) {
    this.expanded = isOpen;

    this._animation = null;

    this._isCollapsing = false;

    this._isExpanding = false;

    this._accordionElement.style.height = '';

    this._accordionElement.classList.remove('c-accordion-item--expanding');

    this.expanded = isOpen;
  }

  componentWillLoad() {
    CAccordionItem._uniqueId += 1;
  }

  render() {
    const accordionClasses = {
      'c-accordion-item': true,
      'c-accordion-item--expanded': this.expanded,
      'c-accordion-item--outlined': this.outlined,
    };

    const headerClasses = {
      'c-accordion-item__header': true,
      'c-accordion-item__header--collapsable': this.collapsable,
      'c-accordion-item__header--expanded': this.expanded,
    };

    const indicatorClasses = {
      'c-accordion-item__indicator': true,
      'c-accordion-item__indicator--expanded': this.expanded,
    };

    return (
      <Host>
        <details
          id={`panel__${CAccordionItem._uniqueId}`}
          ref={(el) => (this._accordionElement = el as HTMLDetailsElement)}
          class={accordionClasses}
          open={!!this.expanded}
        >
          <summary
            ref={(el) => (this._accordionHeader = el as HTMLDetailsElement)}
            class={headerClasses}
            onClick={(event) => this._onToggleAccordion(event)}
          >
            <div class="c-accordion-item__icon" aria-visible="hidden">
              <slot name="icon"></slot>
            </div>

            <div class="c-accordion-item__title">{this.heading}</div>

            <div class={indicatorClasses}>
              <c-icon
                path={mdiChevronRight}
                color="var(--c-accordion-item-text)"
                class={{ expanded: this.expanded }}
              ></c-icon>
            </div>
          </summary>

          <div
            ref={(el) => (this._accordionContent = el as HTMLDivElement)}
            class="c-accordion-item__content-wrapper"
          >
            <div
              class="c-accordion-item__content"
              role="region"
              aria-labelledby={`header__${CAccordionItem._uniqueId}`}
            >
              <slot></slot>
            </div>
          </div>
        </details>
      </Host>
    );
  }
}
