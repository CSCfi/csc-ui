import {
  Component,
  h,
  Element,
  Prop,
  State,
  Event,
  EventEmitter,
} from '@stencil/core';

/**
 * @group Form
 * @slot label - Label text for the switch
 */
@Component({
  tag: 'c-switch',
  styleUrl: 'c-switch.scss',
  shadow: true,
})
export class CSwitch {
  /**
   * Disable the switch
   */
  @Prop({ attribute: 'disabled' }) hostDisabled = false;

  /**
   * Id for the element
   */
  @Prop({ attribute: 'id' }) hostId: string;

  /**
   * Set as required
   */
  @Prop() required = false;

  /**
   * Value of the element
   */
  @Prop({ mutable: true }) value = false;

  @Element() host: HTMLCSwitchElement;

  @State() hasLabel = false;

  /**
   * Emit inner value change to parent
   */
  @Event({ bubbles: false }) changeValue: EventEmitter<boolean>;

  componentDidLoad() {
    const slotted = this.host.childNodes;

    this.hasLabel = slotted && slotted.length > 0;
  }

  private _valueChangedHandler = (event: Event) => {
    const value = (event.currentTarget as HTMLInputElement).checked;

    this.value = value;
    this.changeValue.emit(value);
  };

  render() {
    const classes = {
      'c-switch': true,
      'c-switch--disabled': !!this.hostDisabled,
      'c-switch--label': this.hasLabel,
    };

    return (
      <label class={classes} htmlFor={this.hostId}>
        <div class="c-switch__input">
          <input
            id={this.hostId}
            aria-checked={this.value}
            type="checkbox"
            role="switch"
            disabled={this.hostDisabled}
            checked={this.value}
            onInput={this._valueChangedHandler}
          />
          <span class="c-switch__slider"></span>
        </div>
        {this.hasLabel ? (
          <div class="c-switch__label">
            <slot></slot>

            {this.required && <span class="required">&nbsp;*</span>}
          </div>
        ) : null}
      </label>
    );
  }
}
