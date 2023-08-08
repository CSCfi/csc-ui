import { Component, Host, h, Prop, Element } from '@stencil/core';

/**
 * @group Other
 */
@Component({
  tag: 'c-icon',
  styleUrl: 'c-icon.scss',
  shadow: true,
})
export class CIcon {
  @Element() host: HTMLCIconElement;

  /**
   * Svg path d attribute value
   */
  @Prop() path: string;

  /**
   * Icon size in pixels
   */
  @Prop() size = 24;

  /**
   * Fill color
   */
  @Prop() color = null;

  /**
   * Inherit parent color
   */
  @Prop() inheritColor = true;

  render() {
    let color = this.inheritColor ? 'currentColor' : 'var(--csc-primary)';

    if (this.color) {
      color = this.color;
    }

    return (
      <Host style={{ height: `${this.size}px` }}>
        <svg width={this.size} height={this.size} viewBox="0 0 24 24">
          <path d={this.path} style={{ fill: color }} />
        </svg>
      </Host>
    );
  }
}
