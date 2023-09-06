import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
  Watch,
  Element,
} from '@stencil/core';

/**
 * @group Popups
 */
@Component({
  tag: 'c-modal',
  styleUrl: 'c-modal.scss',
  shadow: true,
})
export class CModal {
  @Element() el: HTMLCModalElement;

  private _dialog?: HTMLDialogElement;

  /**
   * Is the modal visible
   */
  @Prop() value = false;

  /**
   * Dismissed when touching/clicking outside the content
   */
  @Prop() dismissable = false;

  /**
   * Width of the dialog. Numeric value is considered as pixel value (400 -> 400px)
   *
   */
  @Prop() width: string | number = 600;

  /**
   * Z-index of the modal
   */
  @Prop() zIndex = 10;

  /**
   * Triggered when value is changed
   */
  @Event({ bubbles: false }) changeValue: EventEmitter<boolean>;

  @State() innerValue = false;

  @State() animateModal = false;

  private _debounce = null;

  @Watch('value')
  onValueChange(value: boolean) {
    if (value) {
      this._handleShow();

      return;
    }

    this._handleClose();
  }

  private _handleShow = () => {
    if (this._dialog) {
      this._dialog.addEventListener('animationend', this._onDialogOpened);
      this._dialog.classList.add('opening');
      this._dialog.showModal();
    }
  };

  private _onDialogOpened = () => {
    if (this._dialog) {
      this._dialog.removeEventListener('animationend', this._onDialogOpened);
      this._dialog.classList.remove('opening');
    }
  };

  private _handleClose = () => {
    if (this._dialog) {
      this._dialog.addEventListener('animationend', this._onDialogClosed);
      this._dialog.classList.add('closing');
    }
  };

  private _onDialogClosed = () => {
    if (this._dialog) {
      this._dialog.removeEventListener('animationend', this._onDialogClosed);
      this._dialog.classList.remove('closing');
      this._dialog.close();
    }
  };

  private _handleClickOutside = () => {
    this._dialog.addEventListener('click', (e) => {
      const dialogDimensions = this._dialog.getBoundingClientRect();

      if (
        e.clientX < dialogDimensions.left ||
        e.clientX > dialogDimensions.right ||
        e.clientY < dialogDimensions.top ||
        e.clientY > dialogDimensions.bottom
      ) {
        if (!this.dismissable) {
          this._dialog.classList.add('nudging');

          if (this._debounce !== null) {
            clearTimeout(this._debounce);
            this._debounce = null;
          }

          this._debounce = window.setTimeout(() => {
            this._dialog.classList.remove('nudging');

            this._debounce = null;
          }, 150);

          return;
        }

        this._handleClose();
        this.changeValue.emit(false);
      }
    });
  };

  private _handleKeyDown = (e) => {
    if (e.keyCode === 27) {
      e.preventDefault();
      this._handleClose();
      this.changeValue.emit(false);
    }
  };

  componentWillLoad() {
    this.innerValue = this.value;

    const width = isNaN(this.width as number) ? this.width : `${this.width}px`;

    this.el.style.setProperty('--c-modal-width', `${width}`);
  }

  componentDidLoad() {
    this._handleClickOutside();
  }

  render() {
    const dialogStyle = {
      'z-index': `${this.zIndex}`,
    };

    return (
      <dialog
        ref={(el) => (this._dialog = el as HTMLDialogElement)}
        style={dialogStyle}
        onKeyDown={this._handleKeyDown}
      >
        <slot></slot>
      </dialog>
    );
  }
}
