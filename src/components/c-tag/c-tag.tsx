import { mdiClose } from '@mdi/js';
import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

/**
 * @parent c-tags
 * @slot Default slot - Default slot
 */
@Component({
  tag: 'c-tag',
  styleUrl: 'c-tag.scss',
  shadow: true,
})
export class CTag {
  /**
   * Mark tag as active
   */
  @Prop() active = false;

  /**
   * Stretch to fill the container row
   */
  @Prop() block = false;

  /**
   * Stretch to fill the container
   */
  @Prop() fit = false;

  /**
   * Remove the hover effect
   */
  @Prop() flat = false;

  /**
   * Mark tag as closeable
   */
  @Prop() closeable = false;

  /**
   * Display an optional badge at the start of the tag
   */
  @Prop() badge: string | number = null;

  /**
   * Emit close event on close icon click
   */
  @Event() close: EventEmitter;

  private _onClose() {
    this.close.emit();
  }

  render() {
    const hostClasses = {
      'c-tag': true,
      'c-tag--closeable': this.closeable,
      'c-tag--badge': !!this.badge || this.badge === 0,
      'c-tag--active': this.active,
      'c-tag--block': this.block,
      'c-tag--fit': this.fit,
      'c-tag--flat': this.flat,
    };

    const hostParams = {
      tabindex: 0,
      ...(!this.flat && {
        role: 'button',
      }),
    };

    const badgeClasses = {
      'c-tag__badge': true,
      'c-tag__badge--active': this.active,
    };

    return (
      <Host tabindex="0" {...hostParams} class={hostClasses}>
        {!!this.badge && <div class={badgeClasses}>{this.badge}</div>}

        <slot></slot>

        {this.closeable && (
          <c-icon-button onClick={() => this._onClose()}>
            <c-icon size={16} path={mdiClose}></c-icon>
          </c-icon-button>
        )}
      </Host>
    );
  }
}
