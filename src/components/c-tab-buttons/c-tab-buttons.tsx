import {
  Component,
  h,
  Element,
  Prop,
  Event,
  EventEmitter,
  Watch,
  Listen,
} from '@stencil/core';

/**
 * @group Content Selectors
 * @slot - Default slot for the c-button elements
 */
@Component({
  tag: 'c-tab-buttons',
  styleUrl: 'c-tab-buttons.scss',
  shadow: true,
})
export class CTabButtons {
  /**
   * Value of tab buttons
   */
  @Prop({ mutable: true }) value: number | string = 0;

  /**
   * Always require a selection
   */
  @Prop() mandatory = false;

  /**
   * Size of the buttons
   */
  @Prop() size: 'default' | 'small' = 'default';

  /**
   * Disable tab buttons
   */
  @Prop({ attribute: 'disabled' }) hostDisabled = false;

  /**
   * Emit changes to the parent
   */
  @Event({ bubbles: false }) changeValue: EventEmitter<number | string>;

  @Element() el: HTMLCTabButtonsElement;

  private _isIndexBased: boolean;

  @Watch('value')
  onValueChange(value: string | number) {
    this.el.childNodes.forEach((button: HTMLCButtonElement) => {
      button.outlined = true;
    });

    if (value !== null) {
      const button =
        this.buttons.find((btn) => btn.value === value) || this.buttons[value];

      if (button) button.outlined = false;
    }

    this.changeValue.emit(this.buttons[value]?.value ?? value);
  }

  @Listen('tabChange', { passive: true })
  onTabChange(event: CustomEvent) {
    const isActive =
      this.value !== null &&
      (this._isIndexBased
        ? +event.detail === +this.value
        : event.detail === this.value);

    // Disable deselection if mandatory prop is set to true
    if (this.mandatory && isActive) {
      return;
    }

    const nullValue = this._isIndexBased ? null : '';
    const value = this._isIndexBased ? +event.detail : event.detail;

    this.value = isActive ? nullValue : value;
  }

  get buttons() {
    return Array.from(this.el.childNodes).filter(
      (element: HTMLCButtonElement) => element.tagName === 'C-BUTTON',
    ) as HTMLCButtonElement[];
  }

  componentDidLoad() {
    this._isIndexBased = this.buttons.every(
      (button) => typeof button.value === 'undefined',
    );

    this.buttons.forEach((button: HTMLCButtonElement, index) => {
      button.setAttribute('data-index', String(index));
      button.grouped = true;
      button.disabled = this.hostDisabled;
      button.size = this.size;

      const isActive =
        this.value !== null &&
        (this._isIndexBased
          ? index === +this.value
          : button.value === this.value);

      button.outlined = !isActive;

      const buttonElement = button.shadowRoot.querySelector('.c-button');

      buttonElement.classList.add('grouped');
    });
  }

  render() {
    const classes = {
      'c-tab-buttons': true,
      'c-tab-buttons--disabled': this.hostDisabled,
    };

    return (
      <div class={classes}>
        <slot></slot>
      </div>
    );
  }
}
