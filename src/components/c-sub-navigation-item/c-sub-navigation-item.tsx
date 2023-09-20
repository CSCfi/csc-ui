import { Component, h, Host, Element, Prop } from '@stencil/core';
/**
 * @parent c-side-navigation
 */
@Component({
  tag: 'c-sub-navigation-item',
  styleUrl: 'c-sub-navigation-item.scss',
  shadow: true,
})
export class CSubNavigationItem {
  @Element() element: HTMLCSubNavigationItemElement;

  /**
   * Active state
   */
  @Prop() active: boolean;

  /**
   * Element is visible and focusable
   */
  @Prop() focusable = false;

  /**
   * Link url
   */
  @Prop() href: string;

  /**
   * Link target
   */
  @Prop() target: string = null;

  /**
   * Loading state
   */
  @Prop() loading = false;

  private _redirect(event: KeyboardEvent | MouseEvent | PointerEvent) {
    if (
      (event instanceof KeyboardEvent && event?.key === 'Enter') ||
      event instanceof MouseEvent ||
      event instanceof PointerEvent
    ) {
      event.stopPropagation();

      const sidenav = document.querySelector('c-side-navigation');
      sidenav.menuVisible = false;

      if (this.href) {
        if (this.target) {
          window.open(this.href, this.target);
        } else {
          window.location.href = this.href;
        }
      }
    }
  }

  render() {
    const a11y = {
      tabindex: this.focusable ? '0' : '-1',
      role: 'menuitem',
    };

    if (this.active) {
      a11y['aria-current'] = 'page';
    }

    return (
      <Host
        {...a11y}
        class={{ active: this.active }}
        onClick={(e) => this._redirect(e)}
        onKeyDown={(e) => this._redirect(e)}
      >
        <div class="c-sub-navigation-item__wrapper">
          <div class="c-sub-navigation-item">
            <div class="c-sub-navigation-item__content">
              <div class="c-sub-navigation-item__slot">
                <slot></slot>
              </div>
              {this.active && (
                <span class="visuallyhidden">, Current page</span>
              )}
            </div>

            <c-loader
              size={32}
              hide={!this.loading}
              style={{ pointerEvents: 'none' }}
            ></c-loader>
          </div>
        </div>
      </Host>
    );
  }
}
