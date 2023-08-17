import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  Listen,
  Element,
} from '@stencil/core';

/**
 * @parent c-accordion
 * @slot - Default slot
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
   * Icon
   * @deprecated Please use the icon slot instead
   */
  @Prop() icon: 'enabled' | 'disabled' | 'bell' | 'pending';

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

  private _accordionDetails: HTMLDetailsElement;

  private _accordionHeader: HTMLDetailsElement;

  private _accordionContent: HTMLDivElement;

  @Listen('keydown', { capture: true })
  handleKeyDown(event: KeyboardEvent) {
    if (
      (event.target as HTMLElement).tagName === 'C-ACCORDION-ITEM' &&
      (event.key === 'Enter' || event.code === 'Space')
    ) {
      event.preventDefault();
      this._toggle(event);
    }
  }

  @Listen('changeValue')
  stop(event: Event) {
    event.stopPropagation();
  }

  private _toggle(event: Event) {
    if (!this.collapsable && this.expanded) {
      event.preventDefault();

      return;
    }

    this.expanded = !this.expanded;
    this.itemChange.emit({ value: this.value, expanded: this.expanded });

    if (this._animation) {
      this._animation.cancel();
    }

    const detailsHeight = this._accordionDetails.offsetHeight;

    requestAnimationFrame(() => {
      this._accordionDetails.classList.add('c-accordion-item--expanding');

      const headerHeight = this._accordionHeader.offsetHeight;
      const contentHeight = this._accordionContent.offsetHeight;

      this._animation = this._accordionDetails.animate(
        {
          height: [`${detailsHeight}px`, `${headerHeight + contentHeight}px`],
        },
        { duration: 300, easing: 'cubic-bezier(0.25, 0.8, 0.5, 1)' },
      );

      this._animation.onfinish = () => {
        this._animation = null;
        this._accordionDetails.classList.remove('c-accordion-item--expanding');
      };
    });
  }

  private static _uniqueId = 0;

  private _icons = {
    enabled: (
      <path
        fill="var(--csc-primary)"
        d="M16,7V3H14V7H10V3H8V7H8C7,7 6,8 6,9V14.5L9.5,18V21H14.5V18L18,14.5V9C18,8 17,7 16,7Z"
      />
    ),
    disabled: (
      <path
        fill="var(--csc-primary)"
        d="M22.11 21.46L2.39 1.73L1.11 3L6.25 8.14C6.1 8.41 6 8.7 6 9V14.5L9.5 18V21H14.5V18L15.31
        17.2L20.84 22.73L22.11 21.46M13.09 16.59L12.67 17H11.33L10.92 16.59L8 13.67V9.89L13.89 15.78L13.09 16.59M12.2 9L10.2
        7H14V3H16V7C17 7 18 8 18 9V14.5L17.85 14.65L16 12.8V9.09C16 9.06 15.95 9 15.92 9H12.2M10 6.8L8 4.8V3H10V6.8Z"
      />
    ),
    bell: (
      <path
        fill="var(--csc-primary)"
        d="M12 2A2 2 0 0 0 10 4A2 2 0 0 0 10 4.29C7.12 5.14 5 7.82 5 11V17L3 19V20H21V19L19 17V11C19 7.82 16.88 5.14 14 4.29A2 2 0 0 0 14 4A2 2 0 0 0 12 2M12 6A5 5 0 0 1 17 11V18H7V11A5 5 0 0 1 12 6M21 7V13H23V7H21M21 15V17H23V15H21M10 21A2 2 0 0 0 12 23A2 2 0 0 0 14 21H10Z"
      />
    ),
    pending: (
      <path
        fill="var(--csc-primary)"
        d="M21 11.11V5C21 3.9 20.11 3 19 3H14.82C14.4 1.84 13.3 1 12 1S9.6 1.84 9.18 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11.11C12.37 22.24 14.09 23 16 23C19.87 23 23 19.87 23 16C23 14.09 22.24 12.37 21 11.11M12 3C12.55 3 13 3.45 13 4S12.55 5 12 5 11 4.55 11 4 11.45 3 12 3M5 19V5H7V7H17V5H19V9.68C18.09 9.25 17.08 9 16 9H7V11H11.1C10.5 11.57 10.04 12.25 9.68 13H7V15H9.08C9.03 15.33 9 15.66 9 16C9 17.08 9.25 18.09 9.68 19H5M16 21C13.24 21 11 18.76 11 16S13.24 11 16 11 21 13.24 21 16 18.76 21 16 21M16.5 16.25L19.36 17.94L18.61 19.16L15 17V12H16.5V16.25Z"
      />
    ),
  };

  private _getIcon() {
    return <svg viewBox="0 0 24 24">{this._icons[this.icon]}</svg>;
  }

  componentWillLoad() {
    CAccordionItem._uniqueId += 1;
  }

  render() {
    const hostClasses = {
      'c-accordion-item': true,
      'c-accordion-item--expanded': this.expanded,
      'c-accordion-item--outlined': this.outlined,
    };

    const headerClasses = {
      'c-accordion-item__header': true,
      'c-accordion-item__header--expanded': this.expanded,
    };

    const indicatorClasses = {
      'c-accordion-item__indicator': true,
      'c-accordion-item__indicator--expanded': this.expanded,
    };

    return (
      <details
        id={`panel__${CAccordionItem._uniqueId}`}
        ref={(el) => (this._accordionDetails = el as HTMLDetailsElement)}
        class={hostClasses}
        open={!!this.expanded}
      >
        <summary
          id={`header__${CAccordionItem._uniqueId}`}
          ref={(el) => (this._accordionHeader = el as HTMLDetailsElement)}
          aria-controls={`panel__${CAccordionItem._uniqueId}`}
          aria-expanded={this.expanded.toString()}
          aria-label={this.heading}
          class={headerClasses}
          onClick={(event) => this._toggle(event)}
        >
          <div class="c-accordion-item__icon" aria-visible="hidden">
            {!!this.icon ? this._getIcon() : <slot name="icon"></slot>}
          </div>

          <div class="c-accordion-item__title">{this.heading}</div>

          <div class={indicatorClasses}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              class={this.expanded && 'expanded'}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="var(--csc-primary)"
                d="M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
              />
            </svg>
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
            {this.expanded && <slot></slot>}
          </div>
        </div>
      </details>
    );
  }
}
