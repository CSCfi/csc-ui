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
   * display the option as selection (works only when c-option elements are used)
   */
  @Prop() optionAsSelection: false;

  /**
   * Triggered when an item is selected
   */
  @Event({ bubbles: false }) changeValue: EventEmitter;

  @Element() host: HTMLCSelectElement;

  @State() menuVisible = false;

  @State() currentIndex: number = null;

  @State() activeListItemId: string = null;

  @State() statusText = '';

  @State() hasOptionItems = false;

  @State() previousValue: CSelectItem = { value: '', name: '' };

  private _itemRefs: { value: string | number | boolean; ref: HTMLElement }[] =
    [];

  private _id: string;

  private _inputElement: HTMLInputElement;

  private _cOptionElements: Map<string, HTMLCOptionElement> = new Map();

  private _selectionElement: HTMLDivElement;

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
    this.activeListItemId = this._itemRefs[index]?.ref?.id ?? null;

    this._updateStatusText();
  }

  private get _firstSelectableIndex() {
    return this._items.findIndex((item) => !item.disabled);
  }

  private get _lastSelectableIndex() {
    return [...this._items].reverse().findIndex((item) => !item.disabled);
  }

  private get _items() {
    return this.hasOptionItems ? this._optionItems : this.items;
  }

  private _setValue(item: CSelectItem) {
    return this.returnValue
      ? item?.value
      : {
          name: item?.name,
          value: item?.value,
        };
  }

  private _valueChangedHandler(item: CSelectItem) {
    if (this.hasOptionItems && this.optionAsSelection) {
      const selection = this._cOptionElements.get(item.value.toString());

      if (!selection) return;

      const clone = selection.cloneNode(true);

      this._selectionElement.classList.add('c-input-menu__selection--show');
      this._selectionElement.replaceChildren(clone);
    }

    function isItem(element) {
      return element.value === item?.value;
    }

    this.currentIndex = this._items.findIndex(isItem);

    const value = this._setValue(item);

    if (this.previousValue.value === item?.value) return;

    this.previousValue = item;

    this.changeValue.emit(value);
  }

  private _getLabel() {
    if (
      this.returnValue &&
      ['number', 'string', 'boolean'].includes(typeof this.value)
    ) {
      return this._items?.find((item) => item.value === this.value)?.name;
    }
  }

  private _scrollToElement() {
    if (this._items.length > this.itemsPerPage) {
      const itemRef = this._itemRefs.find(
        (item) => item.value === this._items[this.currentIndex].value,
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

      const selectedItem = this._items.find((i) =>
        i.name.toLowerCase().startsWith(this._searchString),
      );

      function isItem(element) {
        return element === selectedItem;
      }

      if (selectedItem) {
        if (this.menuVisible) {
          this.currentIndex = this._items.findIndex(isItem);
          this._scrollToElement();
        } else {
          this.value = selectedItem;
          this._valueChangedHandler(selectedItem);
        }
      }
    }

    if (ev.key === 'Home' && this.menuVisible) {
      ev.preventDefault();

      this.currentIndex = this._firstSelectableIndex;
    }

    if (ev.key === 'End' && this.menuVisible) {
      ev.preventDefault();

      this.currentIndex = this._lastSelectableIndex;
    }

    if (ev.key === 'Tab') {
      this.menuVisible = false;
    }

    if (ev.key === 'ArrowDown') {
      ev.preventDefault();

      this.menuVisible = true;

      if (this.currentIndex === null) {
        this.currentIndex = 0;
      } else if (this.currentIndex + 1 < this._items.length) {
        this.currentIndex += 1;
      }
    }

    if (ev.key === 'ArrowUp') {
      ev.preventDefault();

      this.menuVisible = true;

      if (this.currentIndex > 0) {
        this.currentIndex -= 1;
      } else if (this.currentIndex === null) {
        this.currentIndex = this._items.length - 1;
      }
    }

    if (ev.key === ' ') {
      ev.preventDefault();

      if (!this.menuVisible) {
        this.menuVisible = true;
      }
    }

    if (ev.key === 'Escape') {
      if (this.menuVisible) {
        this.menuVisible = false;

        this._inputElement.focus();
      }
    }

    if (ev.key === 'Enter') {
      this.menuVisible = !this.menuVisible;

      if (this.currentIndex !== null) {
        this._selectItem();
      }

      if (!this.menuVisible) {
        this._inputElement.focus();
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
    this._getOptionItems();

    if (
      (this.value || typeof this.value === 'boolean') &&
      !this.currentIndex &&
      this.currentIndex !== 0
    ) {
      this.currentIndex = this._items.findIndex(
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

  private _optionItems: CSelectItem[] = [];

  private _selectItem() {
    const selectedItem = this._items[this.currentIndex];
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

  private _select(event, item: CSelectItem) {
    if (!!item.disabled) return;

    event.preventDefault();
    event.stopPropagation();

    this.value = this._setValue(item);

    this._valueChangedHandler(item);

    this.menuVisible = false;
  }

  private _getOptionItems() {
    requestAnimationFrame(() => {
      this._cOptionElements = new Map();

      let selection: CSelectItem | null = null;

      this._optionItems = (
        this.host ? Array.from(this.host.querySelectorAll('c-option')) : []
      ).map((item, index) => {
        const cSelectItem = {
          value: item.value,
          name: item.name || item.innerText,
          disabled: !!item.disabled,
        } as CSelectItem;

        if (item.selected) {
          selection = cSelectItem;
        }

        item.slot = `option-${index}`;

        this._cOptionElements.set(item.value.toString(), item);

        return cSelectItem;
      });

      this.hasOptionItems = !!this._optionItems.length;

      if (selection) {
        this._valueChangedHandler(selection);
      }
    });
  }

  private _getListItem = (item: CSelectItem, index: number) => {
    const isActive = this._items[this.currentIndex]?.value === item.value;

    const classes = {
      none: item.value === null,
      disabled: !!item.disabled,
    };

    let itemId = 'none';

    if (typeof item?.value === 'string') {
      itemId = item.value.replace(/[^a-zA-Z0-9-_]/g, '');
    }

    itemId = `item_${this._id}--${itemId}`;

    const a11y = {
      role: 'option',
      'aria-posinset': (index + 1).toString(),
      'aria-setsize': this._items.length.toString(),
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
        data-value={item.name}
        onClick={(event) => this._select(event, item)}
      >
        {this.hasOptionItems ? (
          <slot name={`option-${index}`}></slot>
        ) : (
          item.name
        )}
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
          ref={(el) => (this._inputElement = el)}
          autocomplete="off"
          class="c-input__input"
          type="text"
          value={this._getLabel() ?? null}
          name={this.name ?? null}
          readonly="true"
        />

        <div
          ref={(el) => (this._selectionElement = el)}
          class="c-input-menu__selection"
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
        >
          {this._items.map((item, index) => this._getListItem(item, index))}
        </ul>
      </div>
    );
  }

  private _handleSlotChange = () => {
    this._getOptionItems();
  };

  private _updateStatusText() {
    if (this._debounce !== null) {
      clearTimeout(this._debounce);
      this._debounce = null;
    }

    this._debounce = window.setTimeout(() => {
      const selection = this.host.shadowRoot.querySelector(
        'li[aria-selected="true"]',
      ) as HTMLLIElement;

      const ending = !!this._items.length
        ? ', to navigate use up and down arrows'
        : '';

      const isDisabled = selection.classList.contains('disabled');

      const beginning = isDisabled ? 'Disabled option - ' : '';

      const selectionText = !!selection
        ? `${beginning}${selection.dataset.value} -  ${selection.ariaPosInSet} of ${selection.ariaSetSize} is highlighted`
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
      this._items.length > this.itemsPerPage
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

            <slot onSlotchange={this._handleSlotChange}></slot>
          </div>

          <slot name="post" slot="post"></slot>
        </c-input>
      </Host>
    );
  }
}
