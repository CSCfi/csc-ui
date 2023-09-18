import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';

/**
 * A loader component that fills the nearest containing element that has css-property position set to 'relative'
 *
 * @group Indicators
 */
@Component({
  tag: 'c-loader',
  styleUrl: 'c-loader.scss',
  shadow: true,
})
export class CLoader {
  /**
   * Delay in seconds of showing the contents in the slot of the loader
   */
  @Prop() contentdelay = 0;

  /**
   * Hide the loader
   */
  @Prop() hide = false;

  /**
   * Size of the loader
   */
  @Prop() size = 48;

  @Element() el: HTMLCLoaderElement;

  @Watch('hide')
  onElementHide(hide) {
    this.el.classList.toggle('active', !hide);
  }

  componentDidLoad() {
    this.el.classList.toggle('active', !this.hide);
  }

  render() {
    const slotHasContent = !!this.el.childNodes.length;

    const styles = {
      '--c-loader-size': `${this.size}px`,
    };

    return (
      <Host>
        <div class='c-loader' style={styles}>
          <svg class='c-loader__loader' viewBox='25 25 50 50'>
            <circle
              class='c-loader__loader-path'
              cx='50'
              cy='50'
              r='20'
            ></circle>
          </svg>

          {slotHasContent && (
            <div
              class='c-loader__slot'
              style={{ 'animation-delay': `${this.contentdelay}s` }}
            >
              <slot></slot>
            </div>
          )}
        </div>
      </Host>
    );
  }
}
