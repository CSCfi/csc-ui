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
    return (
      <Host {...{ [this.type]: !!this.type }}>
        {!!this.type && (
          <svg width="22" height="22" viewBox="0 0 24 24">
            <path d={this._icons[this.type]} />
          </svg>
        )}

        <div class="c-alert__content">
          <slot name="title"></slot>
          <slot></slot>
        </div>
      </Host>
    );
  }
}
