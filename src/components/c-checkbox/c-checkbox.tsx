import {
  Component,
  Host,
  h,
  Listen,
  Prop,
  Event,
  EventEmitter,
  State,
  Watch,
} from '@stencil/core';
import { mdiCloseCircle } from '@mdi/js';

/**
 * @group Form
 * @slot Default slot - Default slot for the label
 */
@Component({
  tag: 'c-checkbox',
  styleUrl: 'c-checkbox.scss',
  shadow: true,
})
export class CCheckbox {
  /**
   * Disable the checkbox
   */
  @Prop() disabled = false;

  /**
   * Hide the hint and error messages
   */
  @Prop() hideDetails = false;

  /**
   * Hint text for the input
   */
  @Prop() hint = '';

  /**
   * Indeterminate state
   */
  @Prop() indeterminate = false;

  /**
   * Element label
   */
  @Prop() label = '';

  /**
   * Set as required
   */
  @Prop() required = false;

  /**
   * Set the validity of the input
   */
  @Prop() valid = true;

  /**
   * Custom validation message
   */
  @Prop() validation = 'Required field';

  /**
   * Is the element checked
   */
  @Prop({ mutable: true }) value = false;

  /**
   * Triggered when element is checked or unchecked
   */
  @Event({ bubbles: false }) changeValue: EventEmitter;

  @State() messageOptions = {
    show: false,
    type: 'hint',
    content: '',
  };

  private _container: HTMLDivElement;

  private _rippleElement: HTMLCRippleElement;

  private _validationIcon = (
    <svg height='16px' width='16px' viewBox='0 0 24 24'>
      <path d={mdiCloseCircle} />
    </svg>
  );

  @Watch('validation')
  onValidationMessageChange(message: string) {
    this.onValidChange(message.length === 0);
  }

  @Watch('valid')
  onValidChange(valid: boolean) {
    this._handleValidation(valid || this.valid);
  }

  @Listen('keydown', { passive: true })
  handleKeyDown(event: KeyboardEvent) {
    if (['Space'].includes(event.code)) {
      event.preventDefault();
      this.toggleState(event);
    }
  }

  componentWillLoad() {
    if (typeof this.value !== 'boolean') {
      console.warn(`[C-CHECKBOX] Property 'value' should be a boolean.`);
    }
  }

  componentDidLoad() {
    this._handleMessageOptions(this.valid);
  }

  private _handleMessageOptions(valid: boolean) {
    requestAnimationFrame(() => {
      this.messageOptions = {
        ...this.messageOptions,
        type: valid ? 'hint' : 'error',
        show: true,
        content: valid ? (
          <span>{this.hint}</span>
        ) : (
          <span>
            {this._validationIcon} {this.validation}
          </span>
        ),
      };
    });
  }

  private _handleValidation(valid: boolean, timeout = 200) {
    setTimeout(() => {
      this._handleMessageOptions(valid);
    }, timeout);
  }

  private toggleState(event) {
    if (this.disabled) return;

    this._rippleElement.createRipple(event, this._container, true);

    this.value = !this.value;
    this.changeValue.emit(this.value);
  }

  private _renderMessages() {
    if (this.hideDetails) return;

    const classes = {
      'c-checkbox__details': true,
      active: this.messageOptions.show,
    };

    const messageClasses = {
      'c-checkbox__message': true,
      [`c-checkbox__message--${this.messageOptions.type}`]: true,
    };

    return (
      <div class={classes}>
        <div class={messageClasses}>{this.messageOptions.content}</div>
      </div>
    );
  }

  render() {
    const wrapperClasses = {
      'c-checkbox': true,
      'c-checkbox--disabled': this.disabled,
      'c-checkbox--error': this.messageOptions.type === 'error',
    };

    const labelClasses = {
      'c-checkbox__label': true,
      'c-checkbox__label--indeterminate': this.indeterminate,
    };

    return (
      <Host>
        <div class={wrapperClasses}>
          <input
            class='visuallyhidden'
            id='checkbox'
            type='checkbox'
            aria-checked={(!!this.value).toString()}
            aria-disabled={this.disabled.toString()}
            checked={this.value}
            disabled={this.disabled}
            onChange={(event) => this.toggleState(event)}
          />

          <label class={labelClasses} htmlFor='checkbox'>
            <div
              class='ripple'
              ref={(el) => (this._container = el as HTMLDivElement)}
            >
              <svg viewBox='0 0 100 100'>
                {!this.indeterminate && !!this.value && (
                  <path
                    class='path'
                    d='M 12 52 l 24 24 l 47 -47 l -3 -3 l -44 44 l -21 -21 l -3 3'
                  />
                )}
                {this.indeterminate && (
                  <path class='path' d='M20 56 h60 v-8 h-60 z' />
                )}
              </svg>

              <c-ripple
                ref={(el) => (this._rippleElement = el)}
                circular
              ></c-ripple>
            </div>

            <div class='c-checkbox__label-content'>
              {!!this.label ? this.label : <slot></slot>}
              {this.required && <span class='required'>&nbsp;*</span>}
            </div>
          </label>
        </div>

        {this._renderMessages()}
      </Host>
    );
  }
}
