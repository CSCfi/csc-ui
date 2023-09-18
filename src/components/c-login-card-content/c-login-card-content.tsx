import { Component, Host, h } from '@stencil/core';

/**
 * @parent c-login-card
 * @slot Default slot - Login card content
 */
@Component({
  tag: 'c-login-card-content',
  styleUrl: 'c-login-card-content.scss',
  shadow: true,
})
export class CLoginCardContent {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
