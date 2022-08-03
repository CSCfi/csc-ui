import {
  Component,
  Host,
  h,
  Prop,
  EventEmitter,
  Event,
  Element,
  Method,
} from '@stencil/core';

import {
  mdiClose,
  mdiAlert,
  mdiCloseCircle,
  mdiCheckCircle,
  mdiInformation,
} from '@mdi/js';

import { CToastMessage } from '../../types';

/**
 * @parent none
 */
@Component({
  tag: 'c-toast',
  styleUrl: 'c-toast.scss',
  shadow: true,
})
export class CToast {
  @Element() el: HTMLCToastElement;

  /**
   * Messages
   */
  @Prop() message: CToastMessage;

  /**
   * Emit inner value change to parent
   */
  @Event() close: EventEmitter<CToastMessage>;

  private _closed = false;

  private _startTime: number;

  private _remainingTime: number;

  private _icons = {
    close: mdiClose,
    warning: mdiAlert,
    error: mdiCloseCircle,
    success: mdiCheckCircle,
    info: mdiInformation,
  };

  private _timeout;

  /**
   * Close toast
   *
   * @emits close
   */
  @Method()
  async closeToast() {
    if (this._closed) return;

    this._closed = true;

    this.el.classList.remove('show');
    this.el.ontransitionend = () => this.close.emit(this.message);
  }

  componentDidLoad() {
    window.requestAnimationFrame(() => {
      this.el.classList.add('show');
    });

    if (this.message.persistent || this.message.indeterminate) return;

    this._startTime = Date.now();
    this._remainingTime = this.message.duration;

    this._timeout = window.setTimeout(
      () => this.closeToast(),
      +this.message.duration,
    );
  }

  disconnectedCallback() {
    window.clearTimeout(this._timeout);
  }

  private _onMouseEnter() {
    if (this.message.persistent || this.message.indeterminate) return;

    this._remainingTime = this._remainingTime - (Date.now() - this._startTime);

    window.clearTimeout(this._timeout);
  }

  private _onMouseLeave() {
    if (this.message.persistent || this.message.indeterminate) return;

    this._startTime = Date.now();
    this._timeout = window.setTimeout(
      () => this.closeToast(),
      this._remainingTime,
    );
  }

  private _renderCloseButton() {
    const Tag = !!this.message.closeText ? 'c-button' : 'c-icon-button';

    return (
      <Tag
        aria-label="close"
        size="small"
        text
        onClick={() => this.closeToast()}
      >
        <svg
          {...{ ...(!!this.message.closeText && { slot: 'icon' }) }}
          aria-hidden="true"
          viewBox="0 0 24 24"
        >
          <path d={this._icons.close}></path>
        </svg>
        {this.message.closeText}
      </Tag>
    );
  }

  render() {
    const showProgressBar = !this.message.persistent && this.message.progress;

    return (
      <Host
        id={`c-toast--${this.message.id}`}
        class={{ [this.message.type]: true }}
        role="alert"
        aria-atomic="true"
        aria-live="assertive"
        onMouseEnter={() => this._onMouseEnter()}
        onMouseLeave={() => this._onMouseLeave()}
      >
        <span class="visuallyhidden">{this.message.type} notification</span>

        <div class="c-toast__item">
          <svg viewBox="0 0 24 24">
            <path d={this._icons[this.message.type]}></path>
          </svg>

          <div class="c-toast__content">
            {!!this.message.title && <p>{this.message.title}</p>}

            {this.message.message}

            <slot></slot>
          </div>

          {!this.message.indeterminate && this._renderCloseButton()}
        </div>

        {showProgressBar && (
          <div
            class="c-toast__progress"
            style={{ '--c-toast-duration': `${this.message.duration}ms` }}
          >
            <div
              class={{
                'c-toast__progress__bar': true,
                indeterminate: this.message.indeterminate,
              }}
            ></div>
          </div>
        )}
      </Host>
    );
  }
}
