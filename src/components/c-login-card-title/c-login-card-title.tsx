import { Component, h } from '@stencil/core';

/**
 * @parent c-login-card
 * @slot - Login card title text
 */
@Component({
  tag: 'c-login-card-title',
  styleUrl: 'c-login-card-title.scss',
  shadow: true,
})
export class CLoginCardTitle {
  render() {
    return (
      <header>
        <slot></slot>
      </header>
    );
  }
}
