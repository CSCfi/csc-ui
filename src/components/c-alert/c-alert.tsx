import {
  mdiAlert,
  mdiCloseCircle,
  mdiCheckCircle,
  mdiInformation,
} from '@mdi/js';
import { Component, Host, h, Prop } from '@stencil/core';
import { CAlertType } from '../../types';

/**
 * @group Indicators
 * @slot Default slot - Default slot
 * @slot title - Title slot
 */
@Component({
  tag: 'c-alert',
  styleUrl: 'c-alert.scss',
  shadow: true,
})
export class CAlert {
  /**
   * Type of the alert
   */
  @Prop() type?: CAlertType;

  private _icons = {
    warning: mdiAlert,
    error: mdiCloseCircle,
    success: mdiCheckCircle,
    info: mdiInformation,
  };

  render() {
    const classes = {
      'c-alert': true,
      ...(!!this.type && { [`c-alert--${this.type}`]: true }),
    };

    return (
      <Host>
        <div class={classes}>
          {!!this.type && (
            <svg width='22' height='22' viewBox='0 0 24 24'>
              <path d={this._icons[this.type]} />
            </svg>
          )}
          <div class='c-alert__content'>
            <slot name='title'></slot>
            <slot></slot>
          </div>
        </div>
      </Host>
    );
  }
}
