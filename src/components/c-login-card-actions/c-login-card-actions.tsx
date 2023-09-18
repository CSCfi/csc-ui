import { Component, h, Prop } from '@stencil/core';

/**
 * @parent c-login-card
 * @slot Default slot - Login card actions
 */
@Component({
  tag: 'c-login-card-actions',
  shadow: true,
})
export class CLoginCardActions {
  /**
   * Align the actions
   */
  @Prop() align: 'start' | 'center' | 'end' = 'center';

  /**
   * Justify the actions
   */
  @Prop() justify:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'stretch'
    | 'space-around' = 'start';

  render() {
    return (
      <c-card-actions
        align={this.align}
        justify={this.justify}
        style={{ padding: '0px' }}
      >
        <slot></slot>
      </c-card-actions>
    );
  }
}
