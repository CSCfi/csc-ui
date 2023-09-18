import {
  Component,
  h,
  Host,
  Prop,
  Element,
  Event,
  EventEmitter,
  Watch,
} from '@stencil/core';
import { mdiChevronRight } from '@mdi/js';

/**
 * @parent c-sidenavigation
 */
@Component({
  tag: 'c-sidenavigationitem',
  styleUrl: 'c-sidenavigationitem.scss',
  shadow: true,
})
export class CSidenavigationitem {
  @Element() hostElement: HTMLCSidenavigationitemElement;

  /**
   * Indicate active state
   */
  @Prop() active: boolean;

  /**
   * Hyperlink url
   */
  @Prop() href: string;

  /**
   * Hyperlink target
   */
  @Prop() target: string = null;

  /**
   * Loading state
   */
  @Prop() loading = false;

  /**
   * Emit changes to the c-accordion
   * @private
   */
  @Event() itemChange: EventEmitter;

  @Watch('active')
  onActiveChange(active: boolean) {
    this._handleChildFocusableChange(active);
  }

  private _ariaLabel: string;

  private _handleChildFocusableChange(focusable: boolean) {
    if (!this._slotHasContent) return;

    const children = Array.from(
      this.hostElement.querySelector('[slot="subnavitem"]').children,
    );

    children.forEach((child: HTMLCSubnavigationitemElement) => {
      child.ariaHidden = (!focusable).toString();
      child.focusable = focusable;
    });
  }

  private _redirect(event: KeyboardEvent | Event) {
    if (
      (event instanceof KeyboardEvent && event?.key === 'Enter') ||
      !(event instanceof KeyboardEvent)
    ) {
      // event.stopPropagation();
      this.itemChange.emit(event);

      if (!this._slotHasContent) {
        const sidenav = document.querySelector('c-sidenavigation');
        sidenav.menuVisible = false;
      }

      if (this.href) {
        if (this.target) {
          window.open(this.href, this.target);
        } else {
          window.location.href = this.href;
        }
      }
    }
  }

  private _slotHasContent = false;

  componentWillLoad() {
    this._slotHasContent = !!this.hostElement.querySelector(
      '[slot="subnavitem"]',
    );

    const children = Array.from(
      this.hostElement.querySelector('[slot="main"]').childNodes,
    );

    this._ariaLabel = children.find((c) => !!c.nodeValue)?.nodeValue?.trim();

    this._handleChildFocusableChange(this.active);
  }

  render() {
    const classes = {
      'c-sidenavigation-item': true,
      'c-sidenavigation-item--parent': this._slotHasContent,
      active: this.active,
    };

    const subNavigationClasses = {
      subnavactive: this.active,
      subnavitem: !this.active,
    };

    const a11y = {
      role: 'menuitem',
      tabindex: '0',
    };

    if (this._slotHasContent) {
      a11y['aria-expanded'] = (!!this.active)?.toString();
    } else if (this.active) {
      a11y['aria-current'] = 'page';
    }

    return (
      <Host
        {...a11y}
        class={classes}
        onClick={(e) => this._redirect(e)}
        onKeyDown={(e) => this._redirect(e)}
      >
        <div
          class={{
            'c-sidenavigation-item__header': true,
            'c-sidenavigation-item__header--expandable': this._slotHasContent,
          }}
        >
          {this._slotHasContent && (
            <svg width="22" height="22" viewBox="0 0 24 24" class="svg">
              <path d={mdiChevronRight} />
            </svg>
          )}
          <div class="c-sidenavigation-item__slot">
            <slot name="main"></slot>
          </div>
        </div>

        {this._slotHasContent && (
          <nav
            role="menubar"
            aria-label={this._ariaLabel}
            aria-expanded={(!!this.active)?.toString()}
            class={subNavigationClasses}
          >
            <slot name="subnavitem"></slot>
          </nav>
        )}

        <c-loader
          size={32}
          hide={!this.loading}
          style={{ pointerEvents: 'none' }}
        ></c-loader>
      </Host>
    );
  }
}
