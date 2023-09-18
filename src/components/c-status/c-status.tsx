import { Component, Host, h, Prop } from '@stencil/core';

/**
 * @group Indicators
 * @slot Default slot - Status text
 */
@Component({
  tag: 'c-status',
  styleUrl: 'c-status.scss',
  shadow: true,
})
export class CStatus {
  /**
   * Status type
   */
  @Prop() type?: 'info' | 'warning' | 'error' | 'success';

  render() {
    const classes = {
      'c-status': true,
      ...(!!this.type && { [`c-status--${this.type}`]: this.type }),
    };

    return (
      <Host>
        <div class={classes}>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
