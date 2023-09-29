import {
  Component,
  Host,
  h,
  Element,
  State,
  Prop,
  Listen,
} from '@stencil/core';
import { mdiChevronDown } from '@mdi/js';
import { CMenuCustomTrigger, CMenuOption } from '../../types';

/**
 * @group Navigation
 * @slot Default slot - Menu title / activator element (simple variant)
 */
@Component({
  tag: 'c-menu',
  styleUrl: 'c-menu.scss',
  shadow: true,
})
export class CMenu {
  @Element() host: HTMLCMenuElement;

  /**
   * Menu items
   */
  @Prop() items: CMenuOption[] = [];

  /**
   * Menu content css class
   */
  @Prop() contentClass = '';

  /**
   * Simple variant without chevron and background, E.g. when a button is the activator
   */
  @Prop() simple = false;

  /**
   * Small variant
   */
  @Prop() small = false;

  /**
   * No hover background
   */
  @Prop() nohover = false;

  /**
   * Items per page before adding scroll
   */
  @Prop() itemsPerPage = 6;

  /**
   * Programmatic trigger component
   */
  @Prop() customTrigger: CMenuCustomTrigger;

  @State() menuItemsComponent: HTMLCMenuItemsElement | null = null;

  @State() menuWrapperComponent: HTMLDivElement | null = null;

  @State() currentIndex: number = null;

  @State() active = false;

  @Listen('keydown', { capture: true })
  handleKeyDown(ev: KeyboardEvent) {
    const openKeys = ['ArrowDown', 'ArrowUp', 'Enter', ' '];

    if (!this.active && openKeys.includes(ev.key)) {
      ev.preventDefault();

      this.currentIndex = null;

      if (ev.key === 'ArrowDown') {
        this.currentIndex = 0;
      }

      if (ev.key === 'ArrowUp') {
        this.currentIndex = this.items.length - 1;
      }

      this._onClick();
    }

    if (ev.key === 'Escape') {
      this._hideMenu();
    }
  }

  private static _uniqueId = 0;

  private _createWrapperElement() {
    const existingOverlay = document.querySelector('.c-menu-overlay__content');

    if (existingOverlay) return existingOverlay;

    const overlay = document.createElement('div');

    overlay.classList.add('c-menu-overlay');

    const overlayContent = document.createElement('div');

    overlayContent.classList.add('c-menu-overlay__content');

    overlay.appendChild(overlayContent);

    document.body.appendChild(overlay);

    return overlayContent;
  }

  private _getNativeChild(parent = this.host as Element) {
    let element = parent.shadowRoot.children[0];

    if (!!element.shadowRoot) {
      element = this._getNativeChild(element);
    }

    return element as HTMLElement;
  }

  private _addMenuItemsComponentListeners(height: number, width: number) {
    this.menuItemsComponent.onclose = () => {
      this._hideMenu();

      const element = this._getNativeChild();

      element.focus();
    };

    this.menuItemsComponent.addEventListener(
      'open',
      (event: CustomEvent) => this._onOpen(event, height, width),
      {
        once: true,
      },
    );
  }

  private _getHostPosition() {
    return this.host.getBoundingClientRect();
  }

  private _hideMenu() {
    this.menuItemsComponent?.remove();
    this.menuItemsComponent = null;
    this.active = false;
  }

  private _onOpen(event: CustomEvent, height: number, width: number) {
    window.requestAnimationFrame(() => {
      const { isInView, height: menuHeight, width: menuWidth } = event.detail;

      if (!isInView.y) {
        const posY =
          parseFloat(this.menuItemsComponent.style.top) - menuHeight - height;

        this.menuItemsComponent.style.top = `${posY}px`;
        this.menuItemsComponent.top = posY;
      }

      if (!isInView.x) {
        this.menuItemsComponent.style.left = `${
          parseFloat(this.menuItemsComponent.style.left) - menuWidth + width
        }px`;
      }

      this.active = true;
      this.menuItemsComponent.active = true;

      this.menuItemsComponent?.shadowRoot?.querySelector('ul')?.focus();
    });
  }

  private _onClick() {
    if (this.menuItemsComponent) return;

    const { bottom, left, width, height } = this._getHostPosition();

    this.menuItemsComponent = document.createElement('c-menu-items');

    this.menuItemsComponent.style.top = `${bottom}px`;
    this.menuItemsComponent.style.left = `${left}px`;
    this.menuItemsComponent.style.minWidth = `${width}px`;
    this.menuItemsComponent.parent = this.host;
    this.menuItemsComponent.items = this.items;
    this.menuItemsComponent.small = this.small;
    this.menuItemsComponent.itemsPerPage = this.itemsPerPage;
    this.menuItemsComponent.top = bottom;
    this.menuItemsComponent.id = `c-menu-items-${CMenu._uniqueId}`;
    this.menuItemsComponent.index = this.currentIndex;
    this.menuItemsComponent.setAttribute('tabindex', '-1');
    this.menuItemsComponent.setAttribute('role', 'listbox');

    if (this.contentClass) {
      this.menuItemsComponent.classList.add(this.contentClass);
    }

    this._addMenuItemsComponentListeners(height, width);

    this._createWrapperElement().appendChild(this.menuItemsComponent);

    window.setTimeout(() => {
      (
        (this.menuItemsComponent?.shadowRoot?.children[0] as HTMLUListElement)
          ?.children[0] as HTMLLIElement
      )?.focus();
    }, 200);
  }

  componentWillLoad() {
    CMenu._uniqueId += 1;
  }

  disconnectedCallback() {
    this._hideMenu();
  }

  private _renderCustomTrigger() {
    const props = this.customTrigger;

    const Tag = props.component.tag;
    const params = props.component.params;

    return (
      <Tag
        {...params}
        class="custom-menu-trigger"
        aria-expanded={this.active.toString()}
        aria-haspopup="listbox"
        aria-controls={`c-menu-items-${CMenu._uniqueId}`}
        onClick={() => this._onClick()}
      >
        {props.value}
      </Tag>
    );
  }

  render() {
    const hostClasses = {
      'c-menu': true,
      'c-menu--simple': this.simple,
      'c-menu--active': this.active,
      'c-menu--no-hover': this.nohover,
      'c-menu--small': this.small,
    };

    return (
      <Host class={hostClasses}>
        {this.customTrigger ? (
          this._renderCustomTrigger()
        ) : (
          <button
            aria-expanded={this.active.toString()}
            aria-haspopup="listbox"
            aria-controls={`c-menu-items-${CMenu._uniqueId}`}
            class={{
              'c-menu-wrapper': !this.simple,
              simple: this.simple,
            }}
            tabindex="0"
            type="button"
            onClick={() => this._onClick()}
          >
            {this.simple ? (
              <slot></slot>
            ) : (
              <div class="c-menu__header">
                <slot></slot>

                <c-icon
                  path={mdiChevronDown}
                  class={
                    this.active
                      ? 'c-menu__icon c-menu__icon--rotated'
                      : 'c-menu__icon'
                  }
                />
              </div>
            )}
          </button>
        )}
      </Host>
    );
  }
}
