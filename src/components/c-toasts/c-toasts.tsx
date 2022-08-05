import {
  Component,
  Host,
  h,
  Prop,
  Element,
  Method,
  State,
} from '@stencil/core';
import { CToastMessage, CToastPosition, CToastType } from '../../types';
import { v4 as uuid } from 'uuid';

/**
 * @group Popups
 */
@Component({
  tag: 'c-toasts',
  styleUrl: 'c-toasts.scss',
  shadow: true,
})
export class CToasts {
  @Element() el: HTMLCToastsElement;

  /**
   * Use absolute positioning
   */
  @Prop() absolute = false;

  /**
   * Horizontal position
   */
  @Prop() horizontal: 'left' | 'center' | 'right' = 'center';

  /**
   * Vertical position
   */
  @Prop() vertical: 'top' | 'bottom' = 'bottom';

  @State() messages: CToastMessage[] = [];

  private _getDefaultOptions = () => ({
    type: CToastType.Info,
    duration: 6000,
    persistent: false,
    indeterminate: false,
    position: CToastPosition.Fixed,
    progress: true,
    id: uuid(),
  });

  /**
   * Add a new message
   */
  @Method()
  async addToast(message: CToastMessage) {
    const customMessages = this.messages.filter((message) => message.custom);

    if (message.custom && customMessages.length > 0) {
      console.warn(
        `Custom toast messages are restricted to 1 visible message due to slot reflection limitations.`,
      );
    } else {
      requestAnimationFrame(() => {
        const defaultOptions = this._getDefaultOptions();

        this.messages = [
          ...this.messages,
          {
            ...defaultOptions,
            ...message,
            duration:
              +message?.duration > 0
                ? +message.duration
                : defaultOptions.duration,
          },
        ];
      });
    }
  }

  /**
   * Remove a message by id (id should be specified in the addToast params)
   */
  @Method()
  async removeToast(id: string) {
    const toast = this.el.shadowRoot.querySelector(
      `#c-toast--${id}`,
    ) as HTMLCToastElement;

    toast?.closeToast();
  }

  private _onMessageClose(event: CustomEvent) {
    this._removeMessage(event.detail.id);
  }

  private _removeMessage(id: string) {
    const toast = this.el.shadowRoot.querySelector(
      `#c-toast--${id}`,
    ) as HTMLCToastElement;

    toast?.remove();

    const messageCount = this.el.shadowRoot.querySelectorAll('c-toast').length;

    if (messageCount === 0) {
      this.messages = [].slice();
    }
  }

  private _renderMessage(message: CToastMessage) {
    return (
      <c-toast message={message} onClose={(e) => this._onMessageClose(e)}>
        {message.custom && <slot />}
      </c-toast>
    );
  }

  render() {
    return (
      <Host
        class={{
          absolute: this.absolute,
          [this.vertical]: true,
          [this.horizontal]: true,
        }}
      >
        {this.messages.map((message) => this._renderMessage(message))}
      </Host>
    );
  }
}
