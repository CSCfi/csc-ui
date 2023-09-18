import { Component, Host, h, Prop } from '@stencil/core';

/**
 * @group Buttons
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

  render() {
    const classes = {
      'c-tag': true,
      'c-tag--closeable': this.closeable,
      'c-tag--badge': !!this.badge || this.badge === 0,
      active: this.active,
      flat: this.flat,
    };

    const hostClasses = {
      fit: this.fit,
      flat: this.flat,
    };

    const hostParams = {
      tabindex: 0,
      ...(!this.flat && {
        role: 'button',
      }),
    };

    return (
      <Host tabindex='0' {...hostParams} class={hostClasses}>
        <div class={classes}>
          <div class='row'>
            {!!this.badge && <div class='badge'>{this.badge}</div>}

            <slot></slot>

            {this.closeable && (
              <svg viewBox='0 0 24 24'>
                <path
                  fill='currentColor'
                  d='M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z'
                />
              </svg>
            )}
          </div>
        </div>
      </Host>
    );
  }
}
