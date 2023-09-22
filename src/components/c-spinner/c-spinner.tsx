import { Component, Host, Prop, h } from '@stencil/core';

/**
 * @group indicators
 */
@Component({
  tag: 'c-spinner',
  styleUrl: 'c-spinner.scss',
  shadow: true,
})
export class CSpinner {
  /**
   * Color of the spinner
   */
  @Prop() color = 'var(--c-primary-600)';

  /**
   * Size of the spinner
   */
  @Prop() size = 24;

  render() {
    const iconParams = {
      cx: this.size / 2,
      cy: this.size / 2,
      r: this.size / 2 - 2,
    };

    const style = {
      '--size': `${this.size}px`,
      '--color': this.color,
    };

    return (
      <Host style={style}>
        <svg class="spinner">
          <circle {...iconParams}></circle>
        </svg>
      </Host>
    );
  }
}
