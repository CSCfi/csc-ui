import {
  Component,
  Host,
  h,
  State,
  Prop,
  Event,
  EventEmitter,
  Element,
  Watch,
} from '@stencil/core';
import { CAutocompleteItem, CSelectItem } from '../../types';

/**
 * @parent None
 */
@Component({
  tag: 'c-input',
  styleUrl: 'c-input.scss',
  shadow: false,
})
export class CInput {
  /**
   * Auto focus the input
   */
  @Prop() autofocus = false;

  /**
   * Disable the input
   */
  @Prop() disabled = false;

  /**
   * Render a hidden input outside the shadow dom
   */
  @Prop() form = false;

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
   * Id of the input element
   */
  @Prop() inputId: string;

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
   * Set the validíty of the input
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
  @Prop() value: string | number | boolean | CSelectItem | CAutocompleteItem;

  /**
   * Variant
   */
  @Prop() variant: 'text' | 'select' = 'text';

  /**
   * Emit changes to the parent
   */
  @Event({ bubbles: false }) changeValue: EventEmitter;

  @State() isFocused = false;

  @State() labelWidth = 0;

  @State() preSlotWidth = 0;

  @State() statusText = '';

  @Element() hiddenEl!: HTMLCInputElement;

  @Watch('valid')
  onValidChange() {
    if (this.validateOnBlur && !this._hasBlurred) return;

    this._setAriaDescriptionId();
  }

  @Watch('validation')
  onValidationMessageChange() {
    this._updateStatusText();
  }

  @Watch('value')
  onValueChange(value) {
    if (!value) this._onReset();
  }

  @Watch('placeholder')
  onPlaceholderChange(placeholder) {
    if (placeholder) this._onReset();
  }

  private _hasBlurred = false;

  private _labelRef: HTMLLabelElement;

  private _debounce = null;

  componentDidLoad() {
    if (this.autofocus) {
      setTimeout(() => {
        this._onFocus(false);
      }, 500);
    }

    this._calculateElementWidths();
    this._setAriaDescriptionId();

    if (this.label) {
      this._observer.observe(this._labelRef);
    }

    this.inputField?.addEventListener('focus', () => this._onFocus(false));
    this.inputField?.addEventListener('blur', () => this._onBlur());
    this.inputField?.addEventListener(
      'keypress',
      this._preventNonNumericalInput,
    );

    // hide the placeholder text initially if there is a label
    if (this.inputField) {
      this.inputField.placeholder =
        !!this.label || !this.placeholder ? '' : this.placeholder;

      this.inputField.title = this.label ?? this.placeholder;
    }
  }

  disconnectedCallback() {
    this.inputField?.removeEventListener('focus', () => this._onFocus(false));
    this.inputField?.removeEventListener('blur', () => this._onBlur());
    this.inputField?.removeEventListener(
      'keypress',
      this._preventNonNumericalInput,
    );

    this._observer.disconnect();
  }

  get isActive() {
    return !!this.value || typeof this.value === 'boolean' || this.isFocused;
  }

  private _setAriaDescriptionId() {
    this.inputField.removeAttribute('aria-describedby');

    let type = null;

    if (this.valid && !this.value && this.hint) {
      type = 'hint';
    }

    if (!this.valid) {
      type = 'error';
    }

    if (type) {
      this.inputField.setAttribute(
        'aria-describedby',
        `${type}-${this.inputId}`,
      );
    }
  }

  private _observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this._calculateElementWidths();
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 1 },
  );

  private _calculateElementWidths() {
    this.labelWidth = !!this.label ? this._labelRef.scrollWidth * 0.75 + 6 : 0;
    this.preSlotWidth = this.inputField.offsetLeft;
  }

  private _onBlur = () => {
    // delay the blur event to prevent the label from 'flashing' on c-select selection
    setTimeout(() => {
      this.isFocused = false;
      this._hasBlurred = true;

      // show the label if there's no label or value
      this._onReset();
    }, 100);
  };

  private _onFocus = (click = true) => {
    if (this.disabled) return;

    this.isFocused = true;

    this.inputField?.focus();

    if (click) this.inputField?.click();

    // show the label if there's no value
    if (this.inputField) {
      this.inputField.placeholder =
        !!this.value || !this.placeholder ? '' : this.placeholder;
    }
  };

  private _onReset() {
    if (this.inputField) {
      this.inputField.placeholder =
        !this.label && !this.value && !!this.placeholder
          ? this.placeholder
          : '';
    }
  }

  /**
   * Prevent non numeric values in the numeric fields
   */
  private _preventNonNumericalInput(event: KeyboardEvent) {
    if (this.type !== 'number') return;

    if (!event.key.match(/^[0-9,\.]+$/)) event.preventDefault();
  }

  private _renderBorders() {
    if (this.shadow) return;

    const classes = {
      active: this.isActive,
    };

    return (
      <fieldset aria-hidden="true">
        <legend
          class={classes}
          style={{
            '--c-input-legend-width': this.labelWidth + 'px',
          }}
        >
          <span class="notranslate"></span>
        </legend>
      </fieldset>
    );
  }

  private _renderLabel() {
    if (!this.label) return;

    const classes = {
      active: this.isActive,
    };

    return (
      <label
        htmlFor={this.inputId}
        ref={(el) => (this._labelRef = el as HTMLLabelElement)}
        class={classes}
      >
        {this.label}
        {this.required && <span>&nbsp;*</span>}
      </label>
    );
  }

  get inputField() {
    return this.hiddenEl?.querySelector('.c-input__input') as
      | HTMLInputElement
      | HTMLTextAreaElement;
  }

  private _updateStatusText() {
    if (this._debounce !== null) {
      clearTimeout(this._debounce);
      this._debounce = null;
    }

    this._debounce = window.setTimeout(() => {
      this.statusText = this.valid ? '' : `Error: ${this.validation}`;

      this._debounce = null;
    }, 1400);
  }

  render() {
    const containerClasses = {
      'c-input': true,
      'c-input--disabled': this.disabled,
      'c-input--shadow': this.shadow,
      'c-input--textarea': this.rows > 1,
      'c-input--error': !this.valid,
      [`c-input--${this.variant}`]: true,
    };

    return (
      <Host disabled={this.disabled}>
        <div
          id={'announce-' + this.inputId}
          class="visuallyhidden"
          aria-live="polite"
          aria-atomic="true"
        >
          {this.statusText}
        </div>

        <div class={containerClasses}>
          <div class="c-input__control">
            <div class="c-input__slot" onClick={() => this._onFocus()}>
              {this._renderBorders()}

              <div
                class="c-input__field"
                style={{
                  '--c-input-label-position': this.preSlotWidth + 'px',
                }}
              >
                <slot name="pre"></slot>

                {this._renderLabel()}

                <slot></slot>

                <slot name="post"></slot>
              </div>
            </div>

            {!this.hideDetails && (
              <c-message
                hint={this.hint}
                inputId={this.inputId}
                valid={this.valid}
                validation={this.validation}
              />
            )}
          </div>
        </div>
      </Host>
    );
  }
}
