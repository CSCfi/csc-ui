import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @parent c-select
 */
@Component({
  tag: 'c-option',
  styleUrl: 'c-option.scss',
  shadow: true,
})
export class COption {
  /**
   * Set option as selected
   */
  @Prop() selected = false;

  /**
   * Set option as disabled
   */
  @Prop() disabled = false;

  /**
   * Option name
   */
  @Prop() name: string;

  /**
   * Option value
   */
  @Prop() value: string | number;

  render() {
    return (
      <Host tabindex="-1">
        <slot></slot>
      </Host>
    );
  }
}
