import {
  Component,
  Element,
  Host,
  Prop,
  State,
  h,
  Listen,
  Event,
  EventEmitter,
  Watch,
} from '@stencil/core';
import { mdiChevronDown } from '@mdi/js';
import { registerClickOutside } from 'stencil-click-outside';
import { CSelectItem } from '../../types';

/**
 * @group Form
 */
@Component({
  tag: 'c-select',
  styleUrl: '../c-input/c-input-menu.scss',
  shadow: true,
})
export class CSelect {
  /**
   * Auto focus the input
   */
  @Prop() autofocus = false;

  /**
   * Disable the input
   */
  @Prop() disabled = false;

  /**
   * Hide the hint and error messages
   */
  @Prop() hideDetails = false;

  /**
   * Hint text for the input
   */
  @Prop() hint = '';

  /**
   * Id of the element
   */
  @Prop({ attribute: 'id' }) hostId: string;

  /**
   * Element label
   */
  @Prop() label: string;

  /**
   * Shadow variant
   */
  @Prop() shadow = false;

  /**
   * Input field name
   */
  @Prop() name: string;

  /**
   * Set as required
   */
  @Prop() required = false;

  /**
   * Return only the item value rather than the whole item object
   */
  @Prop() returnValue: false;

  /**
   * Set the validity of the input
   */
  @Prop() valid = true;

  /**
   * Manual validation
   */
  @Prop() validate = false;

  /**
   * Validate the input on blur
   */
  @Prop() validateOnBlur = false;

  /**
   * Custom validation message
   */
  @Prop() validation = 'Required field';

  /**
   * Items per page before adding scroll
   */
  @Prop() itemsPerPage = 6;

  /**
   * Placeholder text
   */
  @Prop() placeholder = '';

  /**
   * Selected item
   */
  @Prop({ mutable: true }) value: string | number | boolean | CSelectItem =
    null;

  /**
   * selectable items
   */
  @Prop() items: CSelectItem[] = [];

  /**
   * Triggered when an item is selected
   */
  @Event({ bubbles: false }) changeValue: EventEmitter;

  @Element() host: HTMLCSelectElement;

  @State() menuVisible = false;

  @State() currentIndex: number = null;

  @State() activeListItemId: string = null;

  @State() statusText = '';

  @State() previousValue: CSelectItem = { value: '', name: '' };

  private _itemRefs: { value: string | number | boolean; ref: HTMLElement }[] =
    [];

  private _id: string;

  private _inputElement: HTMLInputElement;

  private _listElement: HTMLUListElement;

  private _outerWrapperClasses = ['outer-wrapper'];

  private static _uniqueId = 0;

  private _validationClasses = ['validation-message'];

  private _debounce = null;

  private _observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          entry.target.scrollIntoView({
            block: 'nearest',
            inline: 'nearest',
          });
          observer.unobserve(entry.target);
        } else {
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 1 },
  );

  @Watch('validate')
  validateChange(newValue: boolean) {
    if (newValue) {
      this._runValidate();
    }
  }

  @Watch('currentIndex')
  onCurrentIndexChange(index: number) {
    const items = Array.from(this._listElement?.children || []);

    this.activeListItemId = items[index]?.id ?? null;
    this._updateStatusText();
  }

  private _valueChangedHandler(item: CSelectItem) {
    function isItem(element) {
      return element.value === item?.value;
    }

    this.currentIndex = this.items.findIndex(isItem);

    const value = this.returnValue
      ? item?.value
      : {
          name: item?.name,
          value: item?.value,
        };

    if (this.previousValue.value === item?.value) return;

    this.previousValue = item;

    this.changeValue.emit(value);
  }

  private _getLabel() {
    if (
      this.returnValue &&
      ['number', 'string', 'boolean'].includes(typeof this.value)
    ) {
      return this.items?.find((item) => item.value === this.value)?.name;
    }

    return (this.value as CSelectItem)?.name;
  }

  private _scrollToElement() {
    if (this.items.length > this.itemsPerPage) {
      const itemRef = this._itemRefs.find(
        (item) => item.value === this.items[this.currentIndex].value,
      )?.ref;

      if (!!itemRef) {
        this._observer.observe(itemRef);
      }
    }
  }

  @Listen('keydown', { capture: true })
  handleKeyDown(ev: KeyboardEvent) {
    if (this.disabled) return;

    const letterNumber = /^[0-9a-zA-Z]+$/;

    if (ev.key.match(letterNumber) && ev.key.length === 1) {
      if (
        Date.now() - this._lastKeyPressTime > 3000 ||
        this._searchString.length > 2
      ) {
        this._searchString = ev.key;
      } else {
        this._searchString = `${this._searchString}${ev.key}`;
      }

      this._lastKeyPressTime = Date.now();
      const selectedItem = this.items.find((i) =>
        i.name.toLowerCase().startsWith(this._searchString),
      );
      function isItem(element) {
        return element === selectedItem;
      }

      if (selectedItem) {
        if (this.menuVisible) {
          this.currentIndex = this.items.findIndex(isItem);
          this._scrollToElement();
        } else {
          this.value = selectedItem;
          this._valueChangedHandler(selectedItem);
        }
      }
    }

    if (ev.key === 'Home' && this.menuVisible) {
      ev.preventDefault();
      this.currentIndex = 0;
    }

    if (ev.key === 'End' && this.menuVisible) {
      ev.preventDefault();
      this.currentIndex = this.items.length - 1;
    }

    if (ev.key === 'Tab') {
      this.menuVisible = false;
    }

    if (ev.key === 'ArrowDown') {
      ev.preventDefault();

      this.menuVisible = true;

      if (this.currentIndex === null) {
        this.currentIndex = 0;
      } else if (this.currentIndex + 1 < this.items.length) {
        this.currentIndex += 1;
      }
    }

    if (ev.key === 'ArrowUp') {
      ev.preventDefault();

      this.menuVisible = true;

      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      } else if (this.currentIndex === null) {
        this.currentIndex = this.items.length - 1;
      }
    }

    if (ev.key === ' ') {
      if (!this.menuVisible) {
        this.menuVisible = true;
      }
    }

    if (ev.key === 'Escape') {
      const input = this.host.shadowRoot.querySelector('input');

      if (this.menuVisible) {
        this.menuVisible = false;
        input.focus();
      }
    }

    if (ev.key === 'Enter') {
      this.menuVisible = !this.menuVisible;

      if (this.currentIndex !== null) {
        this._selectItem();
      }
    }
  }

  componentWillLoad() {
    CSelect._uniqueId += 1;

    this._id =
      this.hostId?.replace(/[^a-zA-Z0-9-_]/g, '') ??
      CSelect._uniqueId.toString();

    this._inputId =
      'input_' +
      (this.hostId || this.label || this.placeholder).replace(
        /[^a-zA-Z0-9-_]/g,
        '',
      );
  }

  componentDidLoad() {
    if (
      (this.value || typeof this.value === 'boolean') &&
      !this.currentIndex &&
      this.currentIndex !== 0
    ) {
      this.currentIndex = this.items.findIndex(
        (item) => item.value === this.value,
      );
    }
  }

  disconnectedCallback() {
    this._observer.disconnect();
  }

  private _inputId: string;

  private _lastKeyPressTime = null;

  private _searchString = '';

  private _blurred = false;

  private _selectItem() {
    const selectedItem = this.items[this.currentIndex];
    this.value = selectedItem;
    this._valueChangedHandler(selectedItem);
    this._scrollToElement();
  }

  private _showMenu() {
    if (this.disabled) return;

    this._inputElement.focus();

    // Hack needed to open the menu within a Vue web component
    setTimeout(() => {
      this.menuVisible = true;
    }, 0);
  }

  private _hideMenu() {
    this.menuVisible = false;
    this._blurred = true;
  }

  private _select(event, item) {
    event.preventDefault();
    event.stopPropagation();

    this.value = item;
    this._valueChangedHandler(item);
    this.menuVisible = false;
  }

  private _getListItem = (item: CSelectItem, index: number) => {
    const isActive = this.items[this.currentIndex] === item;

    const classes = {
      none: item.value === null,
    };

    let itemId = 'none';

    if (typeof item?.value === 'string') {
      itemId = item.value.replace(/[^a-zA-Z0-9-_]/g, '');
    }

    itemId = `item_${this._id}--${itemId}`;

    const a11y = {
      role: 'option',
      'aria-posinset': (index + 1).toString(),
      'aria-setsize': this.items.length.toString(),
    };

    if (isActive) {
      a11y['aria-selected'] = 'true';
    }

    return (
      <li
        {...a11y}
        id={itemId}
        ref={(el) =>
          this._itemRefs.push({ value: item.value, ref: el as HTMLElement })
        }
        class={classes}
        onClick={(event) => this._select(event, item)}
      >
        {item.name}
      </li>
    );
  };

  private _runValidate() {
    if (
      this.required &&
      !this.value &&
      (this._blurred || !this.validateOnBlur)
    ) {
      this._outerWrapperClasses.push('required');
      this._validationClasses.push('show');
    } else {
      this._outerWrapperClasses = this._outerWrapperClasses.filter(
        (c) => c !== 'required',
      );
      this._validationClasses = this._validationClasses.filter(
        (c) => c !== 'show',
      );
    }
  }

  private _renderChevron() {
    const classes = {
      'c-input-menu__chevron': true,
      'c-input-menu__chevron--active': this.menuVisible,
    };

    return (
      <svg class={classes} viewBox="0 0 24 24">
        <path d={mdiChevronDown} />
      </svg>
    );
  }

  private _renderInputElement() {
    return (
      <div class="c-input-menu__input" onClick={() => this._showMenu()}>
        <input
          aria-controls={'results_' + this._id}
          aria-readonly="true"
          aria-haspopup="listbox"
          id={this._inputId}
          ref={(el) => (this._inputElement = el as HTMLInputElement)}
          autocomplete="off"
          class="c-input__input"
          type="text"
          value={this._getLabel() ?? null}
          name={this.name ?? null}
          readonly="true"
        />
      </div>
    );
  }

  private _renderMenu(style) {
    return (
      <div
        class={{
          'c-input-menu__item-wrapper': true,
          'c-input-menu__item-wrapper--shadow': this.shadow,
        }}
      >
        <ul
          id={'results_' + this._id}
          aria-activedescendant={this.activeListItemId}
          aria-expanded={this.menuVisible.toString()}
          style={style}
          title={this.label || this.placeholder}
          class={
            this.menuVisible
              ? 'c-input-menu__items'
              : 'c-input-menu__items c-input-menu__items--hidden'
          }
          role="listbox"
          ref={(el) => (this._listElement = el as HTMLUListElement)}
        >
          {this.items.map((item, index) => this._getListItem(item, index))}
        </ul>
      </div>
    );
  }

  private _updateStatusText() {
    // this.statusText = '';

    if (this._debounce !== null) {
      clearTimeout(this._debounce);
      this._debounce = null;
    }

    this._debounce = window.setTimeout(() => {
      const ending = !!this.items.length
        ? ', to navigate use up and down arrows'
        : '';

      const selection = this.host.shadowRoot.querySelector(
        'li[aria-selected="true"]',
      );

      const selectionText = !!selection
        ? `${selection.innerHTML} ${selection.ariaPosInSet} of ${selection.ariaSetSize} is highlighted`
        : null;

      this.statusText = `${selectionText || ending}`;

      this._debounce = null;
    }, 1400);
  }

  render() {
    let itemsPerPageStyle = {};

    if (
      this.itemsPerPage &&
      this.itemsPerPage > 0 &&
      this.items.length > this.itemsPerPage
    ) {
      itemsPerPageStyle = {
        'max-height': 48 * this.itemsPerPage + 'px',
        'overflow-y': 'scroll',
      };
    }

    return (
      <Host
        ref={(el) => registerClickOutside(this, el, () => this._hideMenu())}
      >
        <div
          id={'announce-' + this._id}
          class="visuallyhidden"
          aria-live="polite"
          aria-atomic="true"
        >
          {this.statusText}
        </div>

        <c-input
          autofocus={this.autofocus}
          disabled={this.disabled}
          hide-details={this.hideDetails}
          hint={this.hint}
          id={this.hostId}
          input-id={this._inputId}
          label={this.label}
          name={this.name}
          placeholder={this.placeholder}
          required={this.required}
          shadow={this.shadow}
          valid={this.valid}
          validate={this.validate}
          validate-on-blur={this.validateOnBlur}
          validation={this.validation}
          value={this.value}
          variant="select"
        >
          <slot name="pre" slot="pre"></slot>

          <div class="c-input__content">
            {this._renderInputElement()}
            {this._renderMenu(itemsPerPageStyle)}
            {this._renderChevron()}
          </div>

          <slot name="post" slot="post"></slot>
        </c-input>

        <slot></slot>
      </Host>
    );
  }
}
