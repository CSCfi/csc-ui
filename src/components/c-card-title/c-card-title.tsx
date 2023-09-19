import { Component, h } from '@stencil/core';
/**
 * @parent c-card
 * @slot - Card title text
 */
@Component({
  tag: 'c-card-title',
  styleUrl: 'c-card-title.scss',
  shadow: true,
})
export class CCardTitle {
  render() {
    return (
      <header>
        <c-title>
          <slot></slot>
        </c-title>
      </header>
    );
  }
}
