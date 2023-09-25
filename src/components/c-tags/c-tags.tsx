import { Component, Host, h } from '@stencil/core';

/**
 * @group buttons
 * @slot Default slot - Default slot
 */
@Component({
  tag: 'c-tags',
  styleUrl: 'c-tags.scss',
  shadow: true,
})
export class CTags {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
