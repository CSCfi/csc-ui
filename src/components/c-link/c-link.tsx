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
   * regular target attribute of a hyperlink
   */
  @Prop() target: string = null;

  /**
   * Customisable font weight
   */
  @Prop() weight = '600';

  render() {
    const classList = {
      underline: this.underline,
    };

    const style = {
      fontWeight: this.weight.toString(),
    };

    return (
      <a class={classList} href={this.href} target={this.target} style={style}>
        <slot></slot>
      </a>
    );
  }
}
