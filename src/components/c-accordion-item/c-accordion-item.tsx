import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  Listen,
  Element,
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
            <slot name="icon"></slot>
          </div>

          <div class="c-accordion-item__title">{this.heading}</div>

          <div class={indicatorClasses}>
            <c-icon
              path={mdiChevronRight}
              color="var(--c-accordion-item-text)"
              class={this.expanded && 'expanded'}
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
            {this.expanded && <slot></slot>}
          </div>
        </div>
      </details>
    );
  }
}
