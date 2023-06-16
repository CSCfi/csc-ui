import {
  Component,
  Prop,
  h,
  Host,
  Event,
  Element,
  EventEmitter,
  Listen,
} from '@stencil/core';
import { createRipple } from '../../utils/utils';

/**
 * @parent c-swiper
 */
@Component({
  tag: 'c-swiper-tab',
  styleUrl: 'c-swiper-tab.scss',
  shadow: true,
})
export class CSwiperTab {
  @Element() el: HTMLCSwiperTabElement;

  /**
   * Disable button
   */
  @Prop() disabled = false;

  /**
   * Mark as active
   */
  @Prop() active = false;

  /**
   * Label of the button
   */
  @Prop() label: string;

  /**
   * Id of the button
   */
  @Prop({ attribute: 'id' }) hostId: string;

  /**
   * Size of the set
   * @private
   */
  @Prop() setsize: number;

  /**
   * Position in the set
   * @private
   */
  @Prop() position: number;

  /**
   * Value of the button
   */
  @Prop() value: number | string;

  /**
   * Emit value change to the parent
   * @private
   */
  @Event({
    bubbles: true,
    composed: true,
    cancelable: true,
  })
  changeValue: EventEmitter<number | string>;

  private _container?: HTMLDivElement;

  @Listen('click', { passive: true })
  onTabClick(event) {
    if (this.active) return;

    createRipple(event, this._container);

    this.changeValue.emit(this.value);
  }

  render() {
    const classes = {
      'c-swiper-tab': true,
      'c-swiper-tab--active': !this.disabled && this.active,
      'c-swiper-tab--disabled': this.disabled,
    };

    const a11y = {
      'aria-selected': this.active ? 'true' : 'false',
      'aria-setsize': this.setsize,
      'aria-posinset': this.position,
      tabindex: this.active ? 0 : -1,
    };

    return (
      <Host {...a11y} role="tab">
        <div id={this.hostId} class={classes}>
          <div
            class="c-swiper-tab__content"
            ref={(el) => (this._container = el as HTMLDivElement)}
          >
            <div class="c-swiper-tab__header">
              {this.label}
              <slot name="icon"></slot>
            </div>
            <div class="c-swiper-tab__description">
              <slot></slot>
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
