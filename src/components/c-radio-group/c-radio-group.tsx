import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  Element,
  State,
  Watch,
} from '@stencil/core';
import { mdiCloseCircle } from '@mdi/js';
import { CRadioGroupItem } from '../../types';

/**
 * @group Form
 * @slot Default slot - Default slot for the label
 */
@Component({
  tag: 'c-radio-group',
  styleUrl: 'c-radio-group.scss',
  shadow: true,
})
export class CRadioGroup {
  /**
   * Value of the radio group
   */
  @Prop({ mutable: true }) value: string | number | CRadioGroupItem;

  /**
   * Hide the hint and error messages
   */
  @Prop() hideDetails = false;

  /**
   * Hint text for the input
   */
  @Prop() hint = '';

  /**
   * Display radio buttons inline
   */
  @Prop() inline = false;

  /**
   * Label of the radio group
   */
  @Prop() label: string;

  /**
   * Color of the radio group
   */
  @Prop() color = '';

  /**
   * Radio group items
   */
  @Prop() items: CRadioGroupItem[] = [];

  /**
   * Disable the radio group
   */
  @Prop() disabled = false;

  /**
   * Return only the item value rather than the whole item object
   */
  @Prop() returnValue: false;

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
   * Emit value change to the parent
   */
  @Event({ bubbles: false }) changeValue: EventEmitter;

  @Element() el: HTMLCRadioGroupElement;

  @State() messageOptions = {
    show: true,
    type: 'hint',
    content: '',
  };

  @Watch('validation')
  onValidationMessageChange(message: string) {
    this.onValidChange(message.length === 0);
  }

  @Watch('valid')
  onValidChange(valid: boolean) {
    this._handleValidation(valid || this.valid);
  }

  componentDidLoad() {
    this._handleValidation(this.valid, 0);
  }

  private _containers?: HTMLDivElement[] = [];

  private _rippleElements: HTMLCRippleElement[] = [];

  private static _uniqueId = 0;

  private _handleKeyDown(event: KeyboardEvent, item, index) {
    if (['Space', 'Enter'].includes(event.code)) {
      event.preventDefault();

      this._select(event, item, index);
    }
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
          <span>{this.hint}</span>
        ) : (
          <span>
            {this._validationIcon} {this.validation}
          </span>
        ),
      };
    }, timeout);
  }

  private _select(event, item, index) {
    if (this.disabled) return;

    this._rippleElements[index].createRipple(
      event,
      this._containers[index],
      true,
    );
    this.value = this.returnValue ? item?.value : item;
    this.changeValue.emit(this.value);
  }

  private _getRadioButton = (item, index) => {
    const itemId = item.value.toString().replace(/[^a-zA-Z0-9-_]/g, '');
    const isChecked = this.returnValue
      ? this.items?.find((i) => i.value === item.value)?.value === this.value
      : this.value === item;

    const classes = {
      'c-radio': true,
      'c-radio--disabled': this.disabled,
      'c-radio--error': this.messageOptions.type === 'error',
    };

    return (
      <label
        class={classes}
        id={itemId}
        onKeyDown={(event) => this._handleKeyDown(event, item, index)}
      >
        <input
          type='radio'
          aria-checked={(this.value === item).toString()}
          aria-disabled={this.disabled.toString()}
          aria-labelledby={itemId}
          disabled={this.disabled}
          checked={isChecked}
          name={CRadioGroup._uniqueId.toString()}
          onChange={(event) => this._select(event, item, index)}
        />

        <span
          class='ripple'
          ref={(el) => (this._containers[index] = el as HTMLDivElement)}
        >
          <span class='selection'></span>

          <c-ripple
            ref={(el) => (this._rippleElements[index] = el)}
            circular
          ></c-ripple>
        </span>

        <div class='c-radio__label'>{item.label}</div>
      </label>
    );
  };

  private _renderMessages() {
    if (this.hideDetails) return;

    const classes = {
      'c-radio__details': true,
      active: this.messageOptions.show,
    };

    const messageClasses = {
      'c-radio__message': true,
      [`c-radio__message--${this.messageOptions.type}`]: true,
    };

    return (
      <div class={classes}>
        <div class={messageClasses}>{this.messageOptions.content}</div>
      </div>
    );
  }

  private _validationIcon = (
    <svg height='16px' width='16px' viewBox='0 0 24 24'>
      <path d={mdiCloseCircle} />
    </svg>
  );

  componentWillLoad() {
    CRadioGroup._uniqueId += 1;
  }

  render() {
    const slotHasContent = !!this.el.childNodes.length;

    const wrapperClasses = {
      'c-radio-group': true,
      'c-radio-group--disabled': this.disabled,
      'c-radio-group--inline': this.inline,
      'c-radio-group--error': this.messageOptions.type === 'error',
    };

    return (
      <div
        class={wrapperClasses}
        role='radiogroup'
        aria-labelledby='c-radio-group__label'
      >
        {(!!this.label || slotHasContent) && (
          <label class='c-radio-group__label'>
            {!!this.label ? this.label : <slot></slot>}
            {this.required && <span class='required'>&nbsp;*</span>}
          </label>
        )}

        <div class='c-radio-group__items'>
          {this.items.map((item, index) => this._getRadioButton(item, index))}
        </div>

        {this._renderMessages()}
      </div>
    );
  }
}
