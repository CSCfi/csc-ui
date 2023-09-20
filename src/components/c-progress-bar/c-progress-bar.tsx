import { Component, Host, h, Prop } from '@stencil/core';

/**
 * @group Indicators
 */
@Component({
  tag: 'c-progress-bar',
  styleUrl: 'c-progress-bar.scss',
  shadow: true,
})
export class CProgressBar {
  /**
   * Progress bar value in percentage (0 to 100)
   */
  @Prop() value = 0;

  /**
   * Hide the percentage display
   */
  @Prop() hideDetails = false;

  /**
   * Place details next to progress bar
   */
  @Prop() singleLine = false;

  /**
   * Optional details message next to percentage display
   */
  @Prop() label = '';

  /**
   * Color of the bar (valid css color)
   *
   * @default var(--csc-primary)
   */
  @Prop() color: string;

  /**
   * Indeterminate state of the progress bar
   */
  @Prop() indeterminate = false;

  private _getSafeValue() {
    if (this.value >= 0 && this.value <= 100) return this.value;

    if (this.value < 0) return 0;

    return 100;
  }

  render() {
    const value = this._getSafeValue();

    const style = {
      '--c-progress-bar-value': `${value}%`,
      '--c-progress-bar-color': this.color ? this.color : null,
    };

    const classes = {
      'c-progress': true,
      'c-progress--indeterminate': this.indeterminate,
      'adjacent-details': this.singleLine,
    };

    const detailsClasses = {
      'c-progress__percentage': true,
      'c-progress__percentage--negative': this.value < 0,
      'adjacent-details': this.singleLine,
    };

    const a11y = {
      'aria-busy': (!this.indeterminate).toString(),
      title: `${value} %`,
    };

    const params: {
      role: string;
      max: string;
      value?: string;
      'aria-valuenow'?: string;
    } = {
      role: 'progressbar',
      max: '100',
    };

    if (!this.indeterminate) {
      params.value = value.toString();
      params['aria-valuenow'] = value.toString();
    }

    return (
      <Host {...a11y}>
        <label class={classes} style={style}>
          <progress {...params}>{!this.indeterminate && `${value}%`}</progress>
        </label>

        {!this.indeterminate && !this.hideDetails && (
          <div class={detailsClasses}>
            {this.value} % {this.label}
          </div>
        )}
      </Host>
    );
  }
}
