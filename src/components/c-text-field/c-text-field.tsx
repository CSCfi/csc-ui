import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  State,
} from '@stencil/core';
import { mdiCalendar, mdiEye, mdiEyeOff } from '@mdi/js';

/**
 * @group Form
 * @slot pre - Content added before the input
 * @slot post - Content added after the input
 */
@Component({
  tag: 'c-text-field',
  styleUrl: 'c-text-field.scss',
  shadow: false,
})
export class CTextField {
  /**
   * Auto focus the input
   */
  @Prop() autofocus = false;

  /**
   * HTML input autocapitalize
   */
  @Prop() autocapitalize = '';

  /**
   * HTML input autocorrect
   */
  @Prop() autocorrect = '';

  /**
   * HTML input autocomplete
   */
  @Prop() autocomplete = '';

  /**
   * Disable the input
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
   * Id of the input
   */
  @Prop({ attribute: 'id' }) hostId: string;

  /**
   * Trim whitespace from the return value
   */
  @Prop() trimWhitespace = false;

  /**
   * Label of the input
   */
  @Prop() label: string;

  /**
   * Maximum value on a numeric input
   */
  @Prop() max: number = null;

  /**
   * Minimum value on a numeric input
   */
  @Prop() min: number = null;

  /**
   * Name of the input
   */
  @Prop() name: string;

  /**
   * Numeric input
   *
   * @deprecated Use type="number" instead
   */
  @Prop() number = false;

  /**
   * Placeholder of the input
   */
  @Prop() placeholder: string;

  /**
   * Mark as readonly
   */
  @Prop() readonly = false;

  /**
   * Set the input as required
   */
  @Prop() required = false;

  /**
   * Rows on the input
   */
  @Prop() rows = 1;

  /**
   * Shadow variant of the input
   */
  @Prop() shadow = false;

  /**
   * Step size on a numeric input
   */
  @Prop() step: number = null;

  /**
   * Type of the input
   */
  @Prop() type: string;

  /**
   * Set the validity of the input
   */
  @Prop() valid = true;

  /**
   * Manual validation
   */
  @Prop() validate = false;

  /**
   * Validate the input on blur
   */
  @Prop() validateOnBlur = false;

  /**
   * Custom validation message
   */
  @Prop() validation = 'Required field';

  /**
   * Value of the input
   */
  @Prop({ mutable: true }) value: string;

  /**
   * Emit changes to the parent
   */
  @Event({ bubbles: false }) changeValue: EventEmitter;

  @State() isFocused = false;

  @State() labelWidth = 0;

  @State() preSlotWidth = 0;

  @State() messageOptions = {
    show: true,
    type: 'hint',
    content: '',
  };

  @Element() hiddenEl!: HTMLCTextFieldElement;

  private _inputElement: HTMLInputElement;

  private _originalType = '';

  private _inputId: string;

  private static _uniqueId = 0;

  componentWillLoad() {
    CTextField._uniqueId += 1;

    this._originalType = this.type;

    this._inputId = `${(
      this.hostId ||
      this.label ||
      this.placeholder ||
      ''
    ).replace(/[^a-zA-Z0-9-_]/g, '')}_${CTextField._uniqueId}`;
  }

  get isActive() {
    return !!this.value || this.isFocused;
  }

  get passwordIcon() {
    return this.type === 'password' ? mdiEye : mdiEyeOff;
  }

  private _handleChange = (event) => {
    this.value = this.trimWhitespace
      ? event.target.value.trim()
      : event.target.value;

    this.changeValue.emit(this.value);
  };

  private _handleBlur = (event) => {
    if (this.trimWhitespace) {
      const trimmedValue = event.target.value.trim();

      event.target.value = trimmedValue;
    }
  };

  private _renderInputElement() {
    const props = {
      classes: {
        'c-input__input': true,
        'c-input__input--filled': !!this.value,
      },
      shared: {
        id: this._inputId,
        name: this.name,
        disabled: this.disabled,
        readonly: this.readonly,
        value: this.value,
        onInput: this._handleChange,
        onChange: this._handleChange,
        onBlur: this._handleBlur,
      },
      input: {
        type: this.number ? 'number' : this.type || 'text',
        min: this.min,
        max: this.max,
        step: this.step,
        ...(!!this.autocomplete && { autocomplete: this.autocomplete }),
        ...(!!this.autocapitalize && { autocapitalize: this.autocapitalize }),
        ...(!!this.autocorrect && { autocorrect: this.autocorrect }),
      },
      textArea: {
        rows: this.rows,
      },
    };

    const textInput = (
      <input
        class={props.classes}
        {...props.input}
        {...props.shared}
        ref={(el) => (this._inputElement = el)}
      />
    );

    const textArea = (
      <textarea
        class={props.classes}
        {...props.shared}
        {...props.textArea}
      ></textarea>
    );

    return this.rows > 1 ? textArea : textInput;
  }

  private _isFirefox() {
    return !!navigator.userAgent.match(/firefox|fxios/i);
  }

  private _renderDateToggle() {
    if (this._originalType !== 'date' || this._isFirefox()) return;

    const classes = {
      'c-input__date-toggle': true,
      'c-input__date-toggle--disabled': this.disabled,
    };

    return (
      <svg
        class={classes}
        viewBox='0 0 24 24'
        onClick={this._toggleDatepicker.bind(this)}
      >
        <path d={mdiCalendar} />
      </svg>
    );
  }

  private _toggleDatepicker() {
    this._inputElement?.showPicker();
  }

  private _renderPasswordToggle() {
    if (this._originalType !== 'password') return;

    const classes = {
      'c-input__password-toggle': true,
      'c-input__password-toggle--disabled': this.disabled,
    };

    return (
      <svg
        class={classes}
        viewBox='0 0 24 24'
        onClick={this._togglePasswordVisibility}
      >
        <path d={this.passwordIcon} />
      </svg>
    );
  }

  private _togglePasswordVisibility = () => {
    if (this.disabled) return;

    this.type = this.type === 'password' ? 'text' : 'password';
  };

  render() {
    return (
      <Host>
        <c-input
          autofocus={this.autofocus}
          disabled={this.disabled}
          hide-details={this.hideDetails}
          hint={this.hint}
          id={this.hostId}
          input-id={this._inputId}
          label={this.label}
          name={this.name}
          placeholder={this.placeholder}
          readonly={this.readonly}
          required={this.required}
          rows={this.rows}
          shadow={this.shadow}
          type={this.type}
          valid={this.valid}
          validate={this.validate}
          validate-on-blur={this.validateOnBlur}
          validation={this.validation}
          value={this.value}
        >
          <slot name='pre' slot='pre'></slot>

          {this._renderInputElement()}

          {this._renderPasswordToggle()}

          {this._renderDateToggle()}

          <slot name='post' slot='post'></slot>
        </c-input>
      </Host>
    );
  }
}
