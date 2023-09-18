import { mdiCloseCircle } from '@mdi/js';
import { Component, Host, Prop, State, Watch, h } from '@stencil/core';

/**
 * @parent None
 */
@Component({
  tag: 'c-message',
  styleUrl: 'c-message.scss',
  shadow: true,
})
export class CMessage {
  /**
   * Hint text for the input
   */
  @Prop() hint = '';

  /**
   * Id of the related input element
   */
  @Prop() inputId: string;

  /**
   * Parent validíty
   */
  @Prop() valid = true;

  /**
   * Custom validation message
   */
  @Prop() validation = 'Required field';

  @State() messageOptions = {
    show: true,
    type: 'hint',
    content: '',
  };

  @Watch('valid')
  onValidChange(valid: boolean) {
    // if (this.validateOnBlur && !this._hasBlurred) return;

    this._handleValidation(valid);
  }

  @Watch('validation')
  onValidationMessageChange(message: string) {
    if (this.valid || !message) return;

    this.messageOptions = {
      ...this.messageOptions,
      content: (
        <span>
          <span class='visuallyhidden'>Error: </span>
          {this._validationIcon} {message}
        </span>
      ),
    };
  }

  @Watch('hint')
  onHintMessageChange(message: string) {
    if (!this.valid || !message) return;

    this.messageOptions = {
      ...this.messageOptions,
      content: (
        <span>
          <span class='visuallyhidden'>Hint: </span>
          {message}
        </span>
      ),
    };
  }

  private _handleValidation(valid: boolean, timeout = 200) {
    this.messageOptions = {
      ...this.messageOptions,
      show: false,
    };

    setTimeout(() => {
      this.messageOptions = {
        ...this.messageOptions,
        type: valid ? 'hint' : 'error',
        show: true,
        content: valid ? (
          <span id={`hint-${this.inputId}`}>
            <span class='visuallyhidden'>Hint: </span>
            {this.hint}
          </span>
        ) : (
          <span id={`error-${this.inputId}`}>
            {this._validationIcon}
            <span class='visuallyhidden'>Error: </span>
            {this.validation}
          </span>
        ),
      };
    }, timeout);
  }

  private _validationIcon = (
    <svg height='16px' width='16px' viewBox='0 0 24 24'>
      <path d={mdiCloseCircle} />
    </svg>
  );

  componentDidLoad() {
    this._handleValidation(this.valid, 0);
  }

  render() {
    const classes = {
      'c-message': true,
      'c-message--active': this.messageOptions.show,
    };

    const messageClasses = {
      'c-message-item': true,
      [`c-message-item--${this.messageOptions.type}`]: true,
    };

    return (
      <Host>
        <div class={classes}>
          <div class={messageClasses}>{this.messageOptions.content}</div>
        </div>
      </Host>
    );
  }
}
