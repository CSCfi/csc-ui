import { Component, h, Prop } from '@stencil/core';

/**
 * @parent c-login-card
 * @slot - Login card actions
 */
@Component({
  tag: 'c-login-card-actions',
  styleUrl: 'c-login-card-actions.scss',
  shadow: true,
})
export class CLoginCardActions {
  /**
   * Align the actions
   */
  @Prop() align: 'start' | 'center' | 'end' = 'center';

  /**
   * Remove padding
   * @private
   */
  @Prop() removePadding = false;

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
    const classes = {
      'c-login-card-actions': true,
      [`c-login-card-actions--align-${this.align}`]: true,
      [`c-login-card-actions--justify-${this.justify}`]: true,
    };

    return (
      <footer class={{ 'remove-padding': this.removePadding }}>
        <menu class={classes}>
          <slot></slot>
        </menu>
      </footer>
    );
  }
}
