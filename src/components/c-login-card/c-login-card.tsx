import { Component, Element, h, Prop, State, Host } from '@stencil/core';

export type CLoginCardBlendMode =
  | 'normal'
  | 'multiply'
  | 'screen'
  | 'overlay'
  | 'darken'
  | 'lighten'
  | 'color-dodge'
  | 'color-burn'
  | 'hard-light'
  | 'soft-light'
  | 'difference'
  | 'exclusion'
  | 'hue'
  | 'saturation'
  | 'color'
  | 'luminosity';

/**
 * @group Cards
 * @slot - Login Card contents
 */
@Component({
  tag: 'c-login-card',
  styleUrl: 'c-login-card.scss',
  shadow: false,
})
export class CLoginCard {
  /**
   * Background position (css background-position)
   */
  @Prop() backgroundPosition = 'bottom right';

  /**
   * Mobile breakpoint in pixels
   */
  @Prop() mobileBreakpoint = 600;

  /**
   * Add colored overlay to the background image
   */
  @Prop() overlay = false;

  /**
   * Add colored overlay to the background image
   */
  @Prop() overlayBlendMode: CLoginCardBlendMode = 'multiply';

  /**
   * Background image
   */
  @Prop() src = '';

  @Element() element: HTMLCLoginCardElement;

  private _observer: ResizeObserver;

  private _cardElement: HTMLDivElement;

  private _paths = {
    desktop:
      'm0.234,0.914 c0.132,-0.026,0.286,-0.05,0.436,-0.163 c0.083,-0.063,0.152,-0.145,0.21,-0.329 c0.055,-0.172,0.072,-0.421,0.072,-0.421 h0.048 v1 h-1 v-0.057 c0,0,0.145,-0.012,0.234,-0.029',
    mobile:
      'm1,1 h-1 v-0.213 c0,0,0.209,-0.046,0.337,-0.109 c0.191,-0.096,0.413,-0.183,0.629,-0.608 c0.028,-0.055,0.034,-0.069,0.034,-0.069',
  };

  @State() path = '';

  @State() imageHeight = '100%';

  componentWillLoad() {
    this._observer = new ResizeObserver(([entry]) => {
      const { width } = entry.contentRect;

      this._handleResize(width);
    });
  }

  componentDidLoad() {
    this._observer.observe(this._cardElement);
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  private _handleResize(width: number) {
    const isMobile = width <= this.mobileBreakpoint;
    const mode = isMobile ? 'mobile' : 'desktop';

    this.imageHeight = isMobile ? `${width * 0.3}px` : '100%';
    this.path = this._paths[mode];
    this._cardElement.classList.toggle('c-login-card--mobile', isMobile);
  }

  render() {
    const style = {
      backgroundImage: `url(${this.src})`,
      backgroundPosition: this.backgroundPosition,
      height: this.imageHeight,
      '--c-login-overlay-mode': !!this.overlay && this.overlayBlendMode,
    };

    const imageClasses = {
      'c-login-card__image': true,
      'c-login-card__image--overlay': !!this.overlay,
    };

    const contentClasses = {
      'c-login-card__content': true,
      'c-login-card__content--no-image': !this.src,
    };

    return (
      <Host>
        {!!this.src && (
          <svg width="0" height="0">
            <defs>
              <clipPath id="cLoginClipPath" clipPathUnits="objectBoundingBox">
                <path d={this.path} />
              </clipPath>
            </defs>
          </svg>
        )}

        <div
          class="c-login-card"
          ref={(el) => (this._cardElement = el as HTMLDivElement)}
        >
          {!!this.src && <div class={imageClasses} style={style}></div>}

          <div class={contentClasses}>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
