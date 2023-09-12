import { Component, h } from '@stencil/core';
/**
 * @parent c-card
 * @slot - Card contents
 */
@Component({
  tag: 'c-card-content',
  styleUrl: 'c-card-content.scss',
  shadow: true,
})
export class CCardContent {
  render() {
    return (
      <article class="c-card-content">
        <slot></slot>
      </article>
    );
  }
}
