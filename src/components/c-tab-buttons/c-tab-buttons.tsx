import {
  Component,
  h,
  Element,
  Prop,
  Event,
  EventEmitter,
  Watch,
  Listen,
  Host,
} from '@stencil/core';

/**
 * @group Content Selectors
 * @slot Default slot - Default slot for the c-button elements
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
      button.setAttribute('outlined', 'true');
    });

    if (value !== null) {
      this.buttons.forEach((button: HTMLCButtonElement) => {
        button.setAttribute('outlined', 'true');
      });

      const button =
        this.buttons.find((btn) => btn.value === value) || this.buttons[value];

      if (button) {
        button.removeAttribute('outlined');
      }
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
      button.setAttribute('outlined', 'true');

      button.outlined = true;
      button.disabled = this.hostDisabled;
      button.size = this.size;

      const isActive =
        this.value !== null &&
        (this._isIndexBased
          ? index === +this.value
          : button.value === this.value);

      if (isActive) {
        button.removeAttribute('outlined');
      }
    });
  }

  render() {
    const classes = {
      'c-tab-buttons': true,
      disabled: this.hostDisabled,
    };

    return (
      <Host class={classes}>
        <slot></slot>
      </Host>
    );
  }
}
