import { Component, h, Host, Prop } from '@stencil/core';

/**
 * @group Buttons
 * @slot Default slot - Default slot for the icon
 */
@Component({
  tag: 'c-icon-button',
  styleUrl: 'c-icon-button.scss',
  shadow: true,
})
export class CIconButton {
  /**
   * Show a badge on top of the icon
   */
  @Prop() badge: string;

  /**
   * Text variant of the button
   */
  @Prop() text = false;

  /**
   * Inverted color for dark backgrounds
   */
  @Prop() inverted = false;

  /**
   * Outlined variant of the button
   */
  @Prop() outlined = false;

  /**
   * Path for the svg icon
   */
  @Prop() path: string = null;

  /**
   * Ghost variant of the button
   */
  @Prop() ghost = false;

  /**
   * Disable the button
   */
  @Prop() disabled = false;

  /**
   * Size of the button
   */
  @Prop() size: 'default' | 'x-small' | 'small' = 'default';

  private _container?: HTMLDivElement;

  private _rippleElement: HTMLCRippleElement;

  private _renderBadge() {
    return <c-badge>{this.badge}</c-badge>;
  }

  private _outerClasses() {
    return {
      'icon-button': true,
      disabled: !!this.disabled,
      text: !!this.text,
      ghost: !!this.ghost,
      outlined: !!this.outlined,
      inverted: !!this.inverted,
      'icon-button--small': this.size === 'small',
      'icon-button--x-small': this.size === 'x-small',
    };
  }

  private _onClick = (event) => {
    this._rippleElement.createRipple(event, this._container);
  };

  render() {
    return (
      <Host>
        <button class={this._outerClasses()} onClick={this._onClick}>
          <div
            class="inner-container"
            ref={(el) => (this._container = el as HTMLDivElement)}
          >
            <slot>
              {this.path && (
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d={this.path} />
                </svg>
              )}
            </slot>
          </div>
          {this.badge && this._renderBadge()}

          <c-ripple
            ref={(el) => (this._rippleElement = el)}
            circular
          ></c-ripple>
        </button>
      </Host>
    );
  }
}
