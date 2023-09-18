import {
  Component,
  Event,
  EventEmitter,
  Host,
  Prop,
  State,
  Watch,
  h,
} from '@stencil/core';

/**
 * @group Form
 */
@Component({
  tag: 'c-otp-input',
  styleUrl: 'c-otp-input.scss',
  shadow: true,
})
export class COtpInput {
  /**
   * Hide the hint and error messages
   */
  @Prop() hideDetails = false;

  /**
   * Hint text for the input
   */
  @Prop() hint = '';

  /**
   * Id of the element
   */
  @Prop({ attribute: 'id' }) elementId!: string;

  /**
   * Length of the OTP code
   */
  @Prop() length = 6;

  /**
   * Set the validíty of the input
   */
  @Prop() valid = true;

  /**
   * Custom validation message
   */
  @Prop() validation = 'Required field';

  /**
   * Run on input - returns the current value
   */
  @Event({ bubbles: false }) changeValue: EventEmitter<string>;

  /**
   * Run on completion - returns the current value
   */
  @Event({ bubbles: false }) completion: EventEmitter<string>;

  @State() statusText = '';

  private _backSpacePressed = false;

  private _debounce = null;

  private _isPasting = false;

  private _inputs: HTMLInputElement[] = new Array(this.length).fill(null);

  private static _uniqueId = 0;

  private _value = '';

  @Watch('validation')
  onValidationMessageChange() {
    this._updateStatusText();
  }

  private _emitValue() {
    requestAnimationFrame(() => {
      this._value = [...this._inputs].map((input) => input.value).join('');

      const isFullyFilled = this._value.length === this.length;

      this.changeValue.emit(isFullyFilled ? this._value : null);

      if (isFullyFilled) {
        this.completion.emit(this._value || null);
      }

      this._updateStatusText();
    });
  }

  private _getElements(event: InputEvent | KeyboardEvent) {
    const target = event.target as HTMLInputElement;
    const nextElement = target.nextElementSibling as HTMLInputElement;
    const previousElement = target.previousElementSibling as HTMLInputElement;

    return { target, nextElement, previousElement };
  }

  /**
   * Select value in an input on focus
   */
  private _onFocus(index: number) {
    this._inputs[index].select();
  }

  private _onKeyDown(event: KeyboardEvent) {
    this._backSpacePressed = false;

    const { target, previousElement } = this._getElements(event);

    if (event.key === 'Backspace') {
      this._backSpacePressed = true;

      // go to the previous element if the input is empty
      if (previousElement && !target.value) {
        previousElement.focus();
      }

      this._emitValue();
    }
  }

  get id() {
    return this.elementId || `c-otp-input--${COtpInput._uniqueId}`;
  }

  private _onInput(event: InputEvent) {
    const { target, nextElement, previousElement } = this._getElements(event);

    // exclude non numeric input values
    if (isNaN(+target.value)) {
      event.preventDefault();

      target.value = null;

      return;
    }

    if (this._isPasting) {
      this._isPasting = false;

      return;
    }

    if (this._backSpacePressed) {
      return;
    }

    if (event.data) {
      nextElement?.focus();
    } else {
      previousElement?.focus();
    }

    this._emitValue();
  }

  // TODO:  prevent pasting non numeric values and iclude validation
  private _onPaste(event: ClipboardEvent) {
    event.preventDefault();

    const pasteData = event.clipboardData.getData('text');

    if (isNaN(+pasteData)) {
      return;
    }

    this._isPasting = true;

    for (const [index, value] of pasteData.split('').entries()) {
      // prevent pasting too long codes
      if (index >= this._inputs.length) {
        continue;
      }

      this._inputs[index].value = null;
      this._inputs[index].value = value;
    }

    const nextElementIndex = Math.min(this.length, pasteData.length) - 1;

    requestAnimationFrame(() => {
      this._inputs[nextElementIndex].focus();

      this._emitValue();
    });
  }

  private _updateStatusText() {
    if (this._debounce !== null) {
      clearTimeout(this._debounce);
      this._debounce = null;
    }

    this._debounce = window.setTimeout(() => {
      this.statusText = this.valid ? '' : `Error: ${this.validation} `;
      this.statusText += `Currently entered - ${this._value
        .split('')
        .join(' - ')}`;
      this.statusText = this.statusText.trim();

      this._debounce = null;
    }, 1400);
  }

  private _renderInput(index: number) {
    return (
      <input
        id={`c-otp-input--${COtpInput._uniqueId}-${index + 1}`}
        ref={(el) => (this._inputs[index] = el as HTMLInputElement)}
        aria-label={`Enter code - digit number - ${index + 1} of ${
          this.length
        }`}
        type="tel"
        maxlength="1"
        onFocus={() => this._onFocus(index)}
        onInput={(event) => this._onInput(event)}
        onKeyDown={(event) => this._onKeyDown(event)}
        onPaste={(event) => index === 0 && this._onPaste(event)}
      />
    );
  }

  componentWillLoad() {
    COtpInput._uniqueId += 1;
  }

  render() {
    const classes = {
      'c-otp-input': true,
      'c-otp-input--hide-details': this.hideDetails,
    };

    return (
      <Host
        id={this.id}
        style={{ '--c-otp-input-count': this.length.toString() }}
      >
        <div
          id={'announce-' + this.id}
          class="visuallyhidden"
          aria-live="polite"
          aria-atomic="true"
        >
          {this.statusText}
        </div>

        <div class={classes}>
          {new Array(this.length)
            .fill(0)
            .map((_, index) => this._renderInput(index))}

          <c-message
            hint={this.hint}
            inputId={this.elementId}
            valid={this.valid}
            validation={this.validation}
          />
        </div>
      </Host>
    );
  }
}
