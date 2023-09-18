import {
  Component,
  Prop,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
} from '@stencil/core';
import { mdiPlus, mdiMinus, mdiAccount, mdiPencil } from '@mdi/js';

/**
 * @group Buttons
 * @slot Default slot - Button text
 * @slot icon - Icon
 * @slot description - Additional description to be shown below the button text
 */
@Component({
  tag: 'c-button',
  styleUrl: 'c-button.scss',
  shadow: true,
})
export class CButton {
  /**
   * Inverted button style for dark backgrounds
   */
  @Prop() inverted = false;

  /**
   * Outlined button style
   */
  @Prop() outlined = false;

  /**
   * Light button background
   */
  @Prop() ghost = false;

  /**
   * Danger variant style
   */
  @Prop() danger = false;

  /**
   * True when used as a tab button
   * @private
   */
  @Prop() grouped = false;

  /**
   * Transparent button background
   */
  @Prop() text = false;

  /**
   * Display loader on the button
   */
  @Prop() loading = false;

  /**
   * Fit width to containing element
   */
  @Prop() fit = false;

  /**
   * Remove the default border radius
   */
  @Prop() noRadius = false;

  /**
   * Icon after text
   */
  @Prop() iconEnd = false;

  /**
   * Button type
   */
  @Prop() type: 'button' | 'submit' = 'button';

  /**
   * Disable the button
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Name of the icon to be displayed in the button
   *
   * @deprecated Please use the icon slot instead
   */
  @Prop() icon: 'plus' | 'minus' | 'account' | 'edit';

  /**
   * Value for the button
   * - for use in the c-tab-buttons
   */
  @Prop() value?: number | string;

  /**
   * Id of the button
   */
  @Prop({ attribute: 'id' }) hostId: string;

  /**
   * Size of the button
   */
  @Prop() size: 'default' | 'small' | 'large' = 'default';

  /**
   * Hyperlink url
   */
  @Prop() href: string;

  /**
   * Path for the svg icon
   */
  @Prop() path: string = null;

  /**
   * Hyperlink target
   */
  @Prop() target = '_blank';

  /**
   * Emit changes to the parent
   * @private
   */
  @Event() tabChange: EventEmitter<number | string>;

  @Element() hostElement: HTMLCButtonElement;

  private _container?: HTMLDivElement;

  private _rippleElement: HTMLCRippleElement;

  private _onClick = (event, center = false) => {
    if (this.disabled) {
      event.preventDefault();

      return;
    }

    this._rippleElement.createRipple(event, this._container, center);

    this.tabChange.emit(this.value ?? this.hostElement.dataset.index);

    if (this.type === 'submit') {
      this._closestElementComposed('form', this._container).submit();
    }
  };

  private _onKeyDown = (event: KeyboardEvent) => {
    if (['Space', 'Enter'].includes(event.code)) {
      if (!!this.href) {
        window.open(this.href, this.target);
      }

      event.preventDefault();

      this._onClick(event, true);
    }
  };

  private _closestElementComposed(selector, base) {
    function __closestFrom(el) {
      const found = el.closest(selector);

      return found ? found : __closestFrom(el.getRootNode().host);
    }

    return __closestFrom(base);
  }

  private _containerhasDescriptionSlot: boolean;

  componentWillLoad() {
    this._containerhasDescriptionSlot = !!this.hostElement.querySelector(
      '[slot="description"]',
    );
  }

  render() {
    const SPINNER_SMALL: SVGImageElement = (
      <svg
        class='spinner'
        viewBox='0 0 100 100'
        xmlns='http://www.w3.org/2000/svg'
      >
        <circle class='spinner__circle' cx='50' cy='50' r='45' />
      </svg>
    );

    let selectedIcon = null;
    let svg: SVGImageElement;

    if (this.icon) {
      const icons = {
        plus: mdiPlus,
        minus: mdiMinus,
        account: mdiAccount,
        edit: mdiPencil,
      };
      selectedIcon = icons[this.icon];
      svg = (
        <svg class='button-icon' width='16' height='16' viewBox='0 0 22 22'>
          <path d={selectedIcon} />
        </svg>
      );
    }

    const contentClasses = {
      'c-button': true,
      'c-button--description': this._containerhasDescriptionSlot,
      'c-button--fitted': !!this.fit,
      'c-button--large': this.size === 'large',
      'c-button--no-radius': !!this.noRadius,
      'c-button--small': this.size === 'small',
    };

    const innerClasses = {
      'c-button__content': true,
      'hide-text': this.loading,
    };

    const buttonClasses = {
      fit: !!this.fit,
      grouped: this.grouped,
      outlined: this.outlined,
    };

    const hostClasses = {
      'c-button--active': this.grouped && !this.outlined,
      'no-radius': !!this.noRadius,
      disabled: !!this.disabled,
      ghost: !!this.ghost,
      grouped: this.grouped,
      inverted: this.inverted,
      outlined: this.outlined,
      danger: this.danger,
      text: !!this.text,
      description: !!this._containerhasDescriptionSlot,
    };

    const descriptionSlotClasses = {
      'c-button__description': this._containerhasDescriptionSlot,
      'c-button__description--loading': this.loading,
    };

    const Tag = !!this.href ? 'a' : 'button';

    const hostAttributes = {
      onKeyDown: this._onKeyDown,
    };

    const attributes = {
      id: this.hostId,
      class: buttonClasses,
      tabindex: '-1',
      disabled: this.disabled,
      onClick: this._onClick,
    };

    let linkAttributes = {};

    if (!!this.href) {
      linkAttributes = { href: this.href, target: this.target };
    }

    const renderIcon = (
      <slot name='icon'>
        {this.path && (
          <svg class='icon-by-path' width='24' height='24' viewBox='0 0 24 24'>
            <path d={this.path} />
          </svg>
        )}
      </slot>
    );

    return (
      <Host
        class={hostClasses}
        tabindex={!!this.disabled ? '-1' : '0'}
        {...hostAttributes}
      >
        <Tag {...attributes} {...linkAttributes}>
          <div
            class={contentClasses}
            ref={(el) => (this._container = el as HTMLDivElement)}
          >
            {this.loading && <div class='spinner_wrapper'>{SPINNER_SMALL}</div>}
            <div class={innerClasses}>
              {!this.iconEnd && renderIcon}

              {svg}

              <slot></slot>

              {this.iconEnd && renderIcon}
            </div>
            {this._containerhasDescriptionSlot && (
              <div class={descriptionSlotClasses}>
                <slot name='description'></slot>
              </div>
            )}
          </div>

          <c-ripple ref={(el) => (this._rippleElement = el)}></c-ripple>
        </Tag>
      </Host>
    );
  }
}
