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
  @Prop({ mutable: true }) value!: number | string;
  /**
   * Always require a selection
   */
  @Prop() mandatory: boolean = false;
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
  @Event() changeValue: EventEmitter<number | string>;
  @Element() el: HTMLCTabButtonsElement;

  @Watch('value')
  watchPropHandler(value: string | number) {
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

  @Listen('click', { passive: true })
  onHandleClickEvent(ev) {
    if (this.hostDisabled) return;

    const clickStack = ev.composedPath();
    const tabs = clickStack.find((e) => e.tagName === 'C-TAB-BUTTONS');
    const button = clickStack.find((e) => e.tagName === 'C-BUTTON');

    if (!button || !tabs) return;

    const valueIsString = this._isString(this.value);

    const { index } = button.dataset;

    const isActiveAndString = valueIsString && button.value === this.value;
    const isActiveAndNotString =
      !valueIsString && (button.value ?? +index) === +this.value;

    // Disable deselection if mandatory prop is set to true
    if (this.mandatory && (isActiveAndNotString || isActiveAndString)) {
      return;
    }

    const nullValue = valueIsString ? '' : null;

    this.value =
      isActiveAndString || isActiveAndNotString
        ? nullValue
        : button.value ?? +index;
  }

  get buttons() {
    return Array.from(this.el.childNodes).filter(
      (element: HTMLCButtonElement) => element.tagName === 'C-BUTTON',
    ) as HTMLCButtonElement[];
  }

  get valueIsString() {
    return Number.isNaN(+this.value);
  }

  componentDidLoad() {
    // use 0 as value if nothing is provided
    this.value = this.value ?? 0;

    this.buttons.forEach((button: HTMLCButtonElement, index) => {
      button.setAttribute('data-index', String(index));
      button.noRadius = true;
      button.fit = true;
      button.disabled = this.hostDisabled;
      button.size = this.size;

      if (
        (!this._isString(this.value) &&
          (button.value ?? index) !== +this.value) ||
        (this._isString(this.value) && button.value !== this.value)
      ) {
        button.outlined = true;
      }

      const buttonElement = button.shadowRoot.querySelector('.c-button');

      buttonElement.classList.add('grouped');
    });
  }

  private _isString(value) {
    return Number.isNaN(+value);
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