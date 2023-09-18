import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Listen,
  Prop,
} from '@stencil/core';

/**
 * @group Tabs
 * @parent c-tabs
 * @slot Default slot - Default slot
 */
@Component({
  tag: 'c-tab',
  styleUrl: 'c-tab.scss',
  shadow: true,
})
export class CTab {
  @Element() element: HTMLCTabElement;

  /**
   * Mark tab as active
   */
  @Prop() active = false;

  /**
   * Mark tab as disabled
   */
  @Prop() disabled = false;

  /**
   * Id of the tab
   */
  @Prop({ attribute: 'id' }) hostId: string;

  /**
   * Position in the set
   * @private
   */
  @Prop() position: number;

  /**
   * Size of the set
   * @private
   */
  @Prop() setsize: number;

  /**
   * Value for the tab
   * - for use in c-tabs
   */
  @Prop() value?: number | string;

  /**
   * Emit changes to the parent
   *
   * @private
   */
  @Event() tabChange: EventEmitter;

  private _rippleElement: HTMLCRippleElement;

  private _onClick = (event, center = false) => {
    if (this.disabled) return;

    this._rippleElement.createRipple(event, this.element, center);

    this.tabChange.emit(this.value);
  };

  @Listen('keydown', { passive: true })
  handleKeydown(event: KeyboardEvent) {
    if (['Space', 'Enter'].includes(event.code)) {
      event.preventDefault();

      this._onClick(event, true);
    }
  }

  render() {
    const classes = {
      'c-tab': true,
      'c-tab--active': this.active,
      'c-tab--disabled': this.disabled,
    };

    const a11y = {
      'aria-disabled': this.disabled.toString(),
      'aria-hidden': this.disabled.toString(),
      'aria-selected': this.active.toString(),
      'aria-setsize': this.setsize,
      'aria-posinset': this.position,
      role: 'tab',
      tabindex: this.active && !this.disabled ? 0 : -1,
    };

    return (
      <Host {...a11y} id={this.hostId} class={classes} onClick={this._onClick}>
        <slot></slot>

        <c-ripple ref={(el) => (this._rippleElement = el)}></c-ripple>
      </Host>
    );
  }
}
