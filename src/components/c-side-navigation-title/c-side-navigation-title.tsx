import { Component, Host, h } from '@stencil/core';

/**
 * @parent c-sidenavigation
 */
@Component({
  tag: 'c-side-navigation-title',
  styleUrl: 'c-side-navigation-title.scss',
  shadow: true,
})
export class CSideNavigationTitle {
  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }
}
