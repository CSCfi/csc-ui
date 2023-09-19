import { mdiFullscreen, mdiFullscreenExit } from '@mdi/js';
import {
  Component,
  Element,
  Host,
  h,
  Prop,
  State,
  Method,
} from '@stencil/core';

/**
 * @group Cards
 * @slot Default slot - Card components
 */
@Component({
  tag: 'c-card',
  styleUrl: 'c-card.scss',
  shadow: true,
  assetsDirs: ['assets'],
})
export class CCard {
  /**
   * Background color
   */
  @Prop() backgroundColor = 'white';

  /**
   * Enable the fullscreen toggle button
   */
  @Prop() fullscreen = false;

  @State() isFullscreen = false;

  @Element() host: HTMLCCardElement;

  private _onFullscreen() {
    this.isFullscreen = !this.isFullscreen;

    const modalWrapper =
      this.host.parentElement?.shadowRoot?.querySelector('.modal-wrapper');

    if (modalWrapper) {
      (modalWrapper as HTMLDivElement).style.display = this.isFullscreen
        ? 'block'
        : 'flex';
    }
  }

  componentDidLoad() {
    const title = this.host.querySelector('c-card-title');

    if (!!title && this.fullscreen) {
      title.style.marginRight = '40px';
    }
  }

  /**
   * Exit fullscreen from the outside
   */
  @Method()
  async exitFullscreen() {
    this.isFullscreen = false;

    const modalWrapper =
      this.host.parentElement?.shadowRoot?.querySelector('.modal-wrapper');

    if (modalWrapper) {
      (modalWrapper as HTMLDivElement).style.display = 'flex';
    }
  }

  /**
   * Enter fullscreen from the outside
   */
  @Method()
  async enterFullscreen() {
    this.isFullscreen = true;
  }

  render() {
    const style = {
      'background-color': this.backgroundColor,
    };

    const hostClasses = {
      'c-card': true,
      'c-card--fullscreen': this.isFullscreen,
    };

    return (
      <Host class={hostClasses} style={style}>
        {this.fullscreen && (
          <c-icon-button
            aria-hidden="true"
            class="c-card__fullscreen-toggle"
            title={this.isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            text
            onClick={() => this._onFullscreen()}
          >
            <c-icon
              path={this.isFullscreen ? mdiFullscreenExit : mdiFullscreen}
            />
          </c-icon-button>
        )}
        <slot></slot>
      </Host>
    );
  }
}
