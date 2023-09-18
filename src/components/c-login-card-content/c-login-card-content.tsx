import { Component, h } from '@stencil/core';

/**
 * @parent c-login-card
 * @slot - Login card content
 */
@Component({
  tag: 'c-login-card-content',
  styleUrl: 'c-login-card-content.scss',
  shadow: true,
})
export class CLoginCardContent {
  render() {
    return (
      <article>
        <slot></slot>
      </article>
    );
  }
}
