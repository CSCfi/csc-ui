import { Component, Host, h } from '@stencil/core';

/**
 * @group buttons
 */
@Component({
  tag: 'c-login-buttons',
  styleUrl: 'c-login-buttons.scss',
  shadow: true,
})
export class CLoginButtons {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
