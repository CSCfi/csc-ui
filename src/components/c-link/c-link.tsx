import { Component, h, Prop } from '@stencil/core';
/**
 * Basic hyperlink component
 *
 * @group Buttons
 */
@Component({
  tag: 'c-link',
  styleUrl: 'c-link.scss',
  shadow: true,
})
export class CLink {
  /**
   * Url of link
   */
  @Prop() href: string = null;

  /**
   * Display line under the link
   */
  @Prop() underline = false;

  /**
   * Display link as CSC primary color
   */
  @Prop() primary = false;

  /**
   * regular target attribute of a hyperlink
   */
  @Prop() target: string = null;

  render() {
    const classList = {
      underline: this.underline,
      primary: this.primary,
    };

    return (
      <a class={classList} href={this.href} target={this.target}>
        <slot></slot>
      </a>
    );
  }
}
