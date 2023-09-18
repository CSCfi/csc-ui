import { Component, Host, h, Prop } from '@stencil/core';
/**
 * Container component for holding current page content
 * @group Layout
 * @slot Default slot - Content to be centered within a page
 */
@Component({
  tag: 'c-container',
  styleUrl: 'c-container.scss',
  shadow: true,
})
export class CContainer {
  /**
   * Maximum width of container in pixels
   */
  @Prop() width: number;

  render() {
    let style = {};

    if (this.width > 0) {
      style = { 'max-width': `${this.width}px` };
    }

    return (
      <Host style={style}>
        <slot></slot>
      </Host>
    );
  }
}
