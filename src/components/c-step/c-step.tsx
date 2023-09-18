import { Component, h, Prop } from '@stencil/core';

/**
 * @group Indicators
 * @parent c-steps
 * @slot Default slot - Default slot for the label
 */
@Component({
  tag: 'c-step',
  styleUrl: 'c-step.scss',
  shadow: true,
})
export class CStep {
  /**
   * Mark step as complete
   * @private
   */
  @Prop() complete = false;

  /**
   * Mark step as current
   * @private
   */
  @Prop() current = false;

  render() {
    const rootClasses = {
      'c-step': true,
      'c-step--complete': this.complete,
    };

    return (
      <div class={rootClasses}>
        <div class='c-step__indicator'>
          {!this.complete && (
            <div class={{ dot: true, current: this.current }}></div>
          )}

          {this.complete && (
            <div class='complete'>
              <svg viewBox='0 0 100 100'>
                <path
                  class='path'
                  d='M 12 52 l 24 24 l 47 -47 l -3 -3 l -44 44 l -21 -21 l -3 3'
                />
              </svg>
            </div>
          )}
        </div>
        <div class='c-step__label'>
          <slot></slot>
        </div>
      </div>
    );
  }
}
