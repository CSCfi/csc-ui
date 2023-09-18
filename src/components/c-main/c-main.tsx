import { Component, Host, h } from '@stencil/core';
/**
 * Wrapper component for the whole page
 *
 * @group Layout
 * @slot Default slot - Contents of the page
 */
@Component({
  tag: 'c-main',
  styleUrl: 'c-main.scss',
  shadow: true,
})
export class CMain {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
