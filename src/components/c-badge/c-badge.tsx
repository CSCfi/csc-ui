import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'c-badge',
  styleUrl: 'c-badge.scss',
  shadow: true,
})
export class CBadge {
  render() {
    return (
      <Host class="c-badge">
        <slot></slot>
      </Host>
    );
  }
}
