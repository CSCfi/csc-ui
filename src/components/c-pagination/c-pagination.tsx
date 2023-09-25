import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
  Watch,
} from '@stencil/core';
import { mdiChevronLeft, mdiChevronRight, mdiDotsHorizontal } from '@mdi/js';
import { CMenuOption, CPaginationOptions } from '../../types';

/**
 * @group Navigation
 */

@Component({
  tag: 'c-pagination',
  styleUrl: 'c-pagination.scss',
  shadow: true,
})
export class CPagination {
  /**
   * Object containing values that are needed for pagination.
   *
   * Note! startFrom and endTo are assigned automatically to the object based on other values
   */
  @Prop() value: CPaginationOptions = {
    itemCount: 0,
  };

  /**
   * Hide details (per page dropdown and the 'x - y of n pages' text)
   */
  @Prop() hideDetails = false;

  /**
   * Hide page number buttons
   */
  @Prop() simple = false;

  /**
   * Hide details (per page dropdown and the 'x - y of n pages' text)
   */
  @Prop() size: 'default' | 'small' = 'default';

  @State() private _currentPage;

  @State() private _itemsPerPage;

  @State() private _totalVisible;

  /**
   * Triggered when values are changed
   */
  @Event({ bubbles: false }) changeValue: EventEmitter<CPaginationOptions>;

  /**
   * Hide range indicator
   */
  @Prop() hideRange = false;

  /**
   * Items per page options
   */
  @Prop() itemsPerPageOptions: number[] = [5, 25, 50, 100];

  @State() tick = '';

  @Watch('value')
  valueHandler(value: CPaginationOptions, oldValue: CPaginationOptions) {
    if (this._isEqual(value, oldValue)) return;

    this._setRange();
  }

  private _isEqual(options1: CPaginationOptions, options2: CPaginationOptions) {
    const keys1 = Object.keys(options1 || {});
    const keys2 = Object.keys(options2 || {});

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (const key of keys1) {
      if (options1[key] !== options2[key]) {
        return false;
      }
    }

    return true;
  }

  componentWillLoad() {
    this._setRange();
  }

  private _textContent = {
    itemsPerPageText: 'Items per page:',
    nextPage: 'Next page',
    prevPage: 'Previous page',
  };

  private _getText(key: string) {
    const source = this.value.textOverrides?.[key]
      ? this.value.textOverrides
      : this._textContent;

    return source[key];
  }

  private _setRange() {
    if (!this.value) return;

    this._currentPage = this.value.currentPage || 1;
    this._itemsPerPage = this.value.itemsPerPage || 25;
    this._totalVisible = this.value.totalVisible || 7;
    this.value.startFrom =
      this._currentPage * this._itemsPerPage - this._itemsPerPage;
    this.value.endTo = this._currentPage * this._itemsPerPage - 1;
    this.changeValue.emit(this.value);
  }

  private _buttons: HTMLLIElement[] = [];

  private _valueChangeHandler() {
    this.value.currentPage = this._currentPage;
    this.value.itemsPerPage = this._itemsPerPage;
    this._setRange();
  }

  private _getItemsPerPage() {
    const itemsPerPageOptions: CMenuOption[] = this.itemsPerPageOptions.map(
      (i) => ({
        name: i.toString(),
        action: () => {
          this._itemsPerPage = i;
          this._currentPage = 1;
          this._valueChangeHandler();
        },
      }),
    );

    const onMenuClick = (event) => {
      event.stopPropagation();
    };

    return (
      <c-menu items={itemsPerPageOptions} nohover onClick={onMenuClick}>
        <div>
          <span class="items-per-page">
            {this._getText('itemsPerPageText')} {this._itemsPerPage}
          </span>
        </div>
      </c-menu>
    );
  }

  private _getTotalPages() {
    return Math.ceil(this.value.itemCount / this._itemsPerPage);
  }

  private _increasePageNumber = () => {
    if (this._currentPage < this._getTotalPages()) {
      this._currentPage += 1;
      this._valueChangeHandler();
    }
  };

  private _decreasePageNumber = () => {
    if (this._currentPage > 1) {
      this._currentPage -= 1;
      this._valueChangeHandler();
    }
  };

  private _setPage(number) {
    this._currentPage = number;
    this._valueChangeHandler();
  }

  private _getRange() {
    if (this.hideRange || !this.value.itemCount) return;

    const end = Math.min(
      this._currentPage * this._itemsPerPage,
      this.value.itemCount,
    );
    const start = this.value.startFrom + 1;

    const pageTextOverride = this.value.textOverrides?.pageText;

    let parsedPageTextOverride;

    if (pageTextOverride) {
      parsedPageTextOverride = pageTextOverride({
        start: start,
        end: end,
        count: this.value.itemCount,
      });
    }

    return pageTextOverride
      ? parsedPageTextOverride
      : `${start} - ${end} of ${this.value.itemCount} items`;
  }

  private _getArrowLeft(size) {
    return (
      <li>
        <c-icon-button
          aria-disabled={this.value.currentPage <= 1 ? 'true' : 'false'}
          aria-label={`${this._getText('prevPage')}`}
          disabled={this.value.currentPage <= 1}
          size={size}
          text
          onClick={this._decreasePageNumber}
        >
          <span class="visuallyhidden">{this._getText('prevPage')}</span>

          <c-icon path={mdiChevronLeft}></c-icon>
        </c-icon-button>
      </li>
    );
  }

  private _getArrowRight(size) {
    return (
      <li>
        <c-icon-button
          aria-disabled={
            this.value.currentPage >= this._getTotalPages() ? 'true' : 'false'
          }
          aria-label={`${this._getText('nextPage')}`}
          disabled={this.value.currentPage >= this._getTotalPages()}
          size={size}
          text
          onClick={this._increasePageNumber}
        >
          <span class="visuallyhidden">{this._getText('nextPage')}</span>

          <c-icon path={mdiChevronRight}></c-icon>
        </c-icon-button>
      </li>
    );
  }

  private _button(number, size) {
    const params = {
      text: this._currentPage !== number,
      onClick: () => this._setPage(number),
      size,
    };

    if (this._currentPage === number) {
      params['aria-current'] = 'page';
    }

    const pageOfTextOverride = this.value.textOverrides?.pageOfText;

    let parsedPageOfTextOverride;

    if (pageOfTextOverride) {
      parsedPageOfTextOverride = pageOfTextOverride({
        pageNumber: number,
        count: this._getTotalPages(),
      });
    }

    return (
      <li>
        <c-icon-button {...params}>
          <span
            aria-label={
              pageOfTextOverride
                ? parsedPageOfTextOverride
                : `page ${number} of ${this._getTotalPages()}`
            }
          >
            {number}
          </span>
        </c-icon-button>
      </li>
    );
  }

  private _addButton(number, size) {
    this._buttons.push(this._button(number, size));
  }

  private _addSeparator(size) {
    this._buttons.push(
      <li>
        <c-icon-button
          aria-disabled="true"
          size={size}
          tabindex="-1"
          role="separator"
          disabled
          text
        >
          <svg width="16" height="16" viewBox="0 0 24 24">
            <path d={mdiDotsHorizontal} />
          </svg>
        </c-icon-button>
      </li>,
    );
  }

  private _addButtons(buttonStart, buttonCount, size) {
    if (buttonStart > 1) {
      this._addButton(1, size);
      this._addSeparator(size);
    }

    for (let index = 1; index < buttonCount; index++) {
      this._addButton(buttonStart + index, size);
    }

    const allPagesVisible = this._getTotalPages() <= this._totalVisible;

    if (
      (this._currentPage < this._totalVisible - 1 ||
        this._currentPage < this._getTotalPages() - this._totalVisible + 4) &&
      !allPagesVisible
    ) {
      this._addSeparator(size);
    }
  }

  private _getPageButtons(size) {
    this._buttons = [];
    let buttonStart = 0;
    let buttonCount = this._getTotalPages() + 1;
    const morePagesThanVisible = this._getTotalPages() > this._totalVisible;

    if (morePagesThanVisible) {
      if (this._currentPage < this._totalVisible - 2) {
        buttonCount = this._totalVisible - 1;
      } else if (
        this._currentPage <
        this._getTotalPages() - this._totalVisible + 4
      ) {
        buttonStart = Math.ceil(this._currentPage - this._totalVisible / 2) + 1;
        buttonCount = this._totalVisible - 3;
      } else {
        buttonStart = this._getTotalPages() - this._totalVisible + 2;
        buttonCount = this._totalVisible - 2;
      }
    }

    this._addButtons(buttonStart, buttonCount, size);

    if (morePagesThanVisible) {
      this._buttons.push(this._button(this._getTotalPages(), size));
    }

    return this._buttons;
  }

  private _renderButtons() {
    if (!this.value.itemCount) return '';

    const buttonsize = this.size === 'small' ? 'x-small' : 'small';

    return (
      <ul>
        {this._getArrowLeft(buttonsize)}
        {!this.simple && this._getPageButtons(buttonsize)}
        {this._getArrowRight(buttonsize)}
      </ul>
    );
  }

  render() {
    const classes = {
      'c-pagination': true,
      'c-pagination--small': this.size === 'small',
      'c-pagination--simple': this.simple,
    };

    return (
      <nav class={classes} role="navigation" aria-label="pagination">
        {!this.hideDetails && (
          <div class="c-pagination__details">
            {this._getItemsPerPage()}

            <span class={{ range: !this.simple }}>{this._getRange()}</span>
          </div>
        )}

        {this._renderButtons()}
      </nav>
    );
  }
}
