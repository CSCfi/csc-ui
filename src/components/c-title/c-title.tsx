import { Component, Host, h } from '@stencil/core';

/**
 * @parent None
 * @slot Default slot - Default slot
 */

@Component({
  tag: 'c-title',
  styleUrl: 'c-title.scss',
  shadow: true,
})
export class CTitle {
  render() {
    return (
      <Host>
        <slot></slot>
        <div class="title-underline"></div>
      </Host>
    );
  }
}
