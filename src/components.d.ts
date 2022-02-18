/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
import { CardBackground } from "./components/card/card";
export namespace Components {
    interface CAccordion {
        /**
          * Allow expanding multiple items
         */
        "multiple": boolean;
        /**
          * Show an outline around expanded items
         */
        "outlined": boolean;
        /**
          * Value of the content switcher
         */
        "value": number | string | (number | string)[];
    }
    interface CAccordionItem {
        /**
          * Expansion status of the item
         */
        "expanded": boolean;
        /**
          * Heading of the accordion item
         */
        "heading": string;
        /**
          * Icon
          * @deprecated Please use the icon slot instead
         */
        "icon": 'enabled' | 'disabled' | 'bell' | 'pending';
        /**
          * Value of the accordion item
         */
        "value": number | string;
    }
    interface CAutocomplete {
        /**
          * Dense variant
         */
        "dense": boolean;
        /**
          * Items to be selected
         */
        "items": {
    name: string;
    value: string;
  }[];
        /**
          * Items per page before adding scroll
         */
        "itemsPerPage": number;
        /**
          * Element label
         */
        "label": string;
        /**
          * Search string
         */
        "query": string;
        /**
          * Show required validation
         */
        "required": boolean;
        /**
          * Selected item
         */
        "value": { name: string; value: string };
    }
    interface CButton {
        /**
          * Disable the button
         */
        "disabled": boolean;
        /**
          * Fit width to containing element
         */
        "fit": boolean;
        /**
          * Light button background
         */
        "ghost": boolean;
        /**
          * Id of the button
         */
        "hostId": string;
        /**
          * Name of the icon to be displayed in the button
          * @deprecated Please use the icon slot instead
         */
        "icon": 'plus' | 'minus' | 'account' | 'edit';
        /**
          * Display loader on the button
         */
        "loading": boolean;
        /**
          * Remove the default border radius
         */
        "noRadius": boolean;
        /**
          * Outlined button style
         */
        "outlined": boolean;
        /**
          * Size of the button
         */
        "size": 'default' | 'small' | 'large';
        /**
          * Transparent button background
         */
        "text": boolean;
        /**
          * Value for the button - for use in the c-content-switcher
         */
        "value"?: number | string;
    }
    interface CButtonGroup {
        /**
          * Disable the content switcher
         */
        "hostDisabled": boolean;
        /**
          * Always require a selection
         */
        "mandatory": boolean;
        /**
          * Size of the buttons
         */
        "size": 'default' | 'small';
        /**
          * Value of the content switcher
         */
        "value": number | string;
    }
    interface CCard {
        /**
          * Card background image for login pages of specific services
         */
        "background": CardBackground;
    }
    interface CCardActions {
        /**
          * Align actions to the right
         */
        "right": boolean;
    }
    interface CCardContent {
    }
    interface CCardTitle {
    }
    interface CCheckbox {
        /**
          * Element label
         */
        "label": string;
        /**
          * Is the element checked
         */
        "value": boolean;
    }
    interface CConsent {
    }
    interface CContainer {
        "width": number;
    }
    interface CCscLogo {
    }
    interface CFlex {
    }
    interface CIconButton {
        /**
          * Show a badge on top of the icon
         */
        "badge": string;
        /**
          * Disable the button
         */
        "disabled": boolean;
        /**
          * Ghost variant of the button
         */
        "ghost": boolean;
        /**
          * Outlined variant of the button
         */
        "outlined": boolean;
        /**
          * Size of the button
         */
        "size": 'default' | 'small';
        /**
          * Text variant of the button
         */
        "text": boolean;
    }
    interface CLink {
        "href": string;
        "target": string;
        "underline": boolean;
    }
    interface CLoader {
        "contentdelay": number;
    }
    interface CMain {
    }
    interface CMenu {
        /**
          * Menu items
         */
        "items": { name: string; action: Function }[];
        /**
          * No hover background
         */
        "nohover": boolean;
        /**
          * Simple variant without chevron and background, E.g. when a button is the activator
         */
        "simple": boolean;
        /**
          * Small variant
         */
        "small": boolean;
    }
    interface CMenuItem {
        "active": boolean;
        "small": boolean;
    }
    interface CModal {
        "value": boolean;
    }
    interface CNavigationbutton {
    }
    interface CNotification {
        "notification": any;
        "position": string;
    }
    interface CPagination {
        /**
          * Hide range indicator
         */
        "hideRange": boolean;
        /**
          * Items per page options
         */
        "itemsPerPageOptions": number[];
        /**
          * Object containing values that are needed for pagination.  Note! startFrom and endTo are assigned automatically to the object based on other values
         */
        "value": {
    itemCount: number;
    currentPage?: number;
    totalVisible?: number;
    itemsPerPage?: number;
    startFrom?: number;
    endTo?: number;
  };
    }
    interface CProgressBar {
        /**
          * Color of the bar (valid css color)
          * @default var(--csc-primary)
         */
        "color": string;
        /**
          * Indeterminate state of the progress bar
         */
        "indeterminate": boolean;
        /**
          * Progress bar value in percentage (0 to 100)
         */
        "value": number;
    }
    interface CRadio {
        /**
          * Color of the radio group
         */
        "color": string;
        /**
          * Radio group items
         */
        "items": { label: string; value: number | string }[];
        /**
          * Label of the radio group
         */
        "label": string;
        /**
          * Value of the radio group
         */
        "value": { label: string; value: number | string };
    }
    interface CRow {
        /**
          * Align items vertically
         */
        "align": 'start' | 'center' | 'end';
        /**
          * Gap between items in px
         */
        "gap": number;
        /**
          * Justify content horizontally
         */
        "justify": 'start' | 'center' | 'end' | 'space-between';
        /**
          * Flex wrap
         */
        "wrap": boolean;
    }
    interface CSelect {
        "dense": boolean;
        "hostId": string;
        "items": any[];
        "itemsPerPage": number;
        "label": string;
        "labelRight": boolean;
        "name": string;
        "placeholder": string;
        "required": boolean;
        "shadow": boolean;
        "showNone": boolean;
        "validate": boolean;
        "validateOnBlur": boolean;
        "value": any;
    }
    interface CSidenavigation {
        "menuVisible": boolean;
        "mobile": boolean;
    }
    interface CSidenavigationitem {
        /**
          * Indicate active state
         */
        "active": boolean;
        /**
          * Hyperlink url
         */
        "href": string;
    }
    interface CSpacer {
    }
    interface CSubnavigationitem {
        "active": boolean;
        "href": string;
    }
    interface CSwitch {
        /**
          * Disable the switch
         */
        "hostDisabled": boolean;
        /**
          * Id for the element
         */
        "hostId": string;
        /**
          * Value of the element
         */
        "value": boolean;
    }
    interface CTab {
        /**
          * Mark tab as active
         */
        "active": boolean;
        /**
          * Mark tab as disabled
         */
        "disabled": boolean;
        /**
          * Id of the tab
         */
        "hostId": string;
        /**
          * Value for the tab - for use in c-tabs
         */
        "value"?: number | string;
    }
    interface CTabButton {
        /**
          * Mark as active
         */
        "active": boolean;
        /**
          * Disable button
         */
        "disabled": boolean;
        /**
          * Id of the button
         */
        "hostId": string;
        /**
          * Label of the button
         */
        "label": string;
        /**
          * Value of the button
         */
        "value": number | string;
    }
    interface CTabButtons {
        /**
          * Value of the tab buttons
         */
        "value": number | string;
    }
    interface CTabs {
        /**
          * Currently active tab
         */
        "value": number | string;
    }
    interface CTag {
        /**
          * Mark tag as active
         */
        "active": boolean;
        /**
          * Mark tag as closeable
         */
        "closeable": boolean;
        /**
          * Stretch to fill the container
         */
        "fit": boolean;
    }
    interface CTextField {
        "autofocus": boolean;
        "disabled": boolean;
        "form": boolean;
        "hostId": string;
        "label": string;
        "max": number;
        "min": number;
        "name": string;
        "number": boolean;
        "placeholder": string;
        "readonly": boolean;
        "required": boolean;
        "rows": number;
        "shadow": boolean;
        "step": number;
        "type": string;
        "valid": boolean;
        "validate": boolean;
        "validateOnBlur": boolean;
        "validation": string;
        "value": string;
    }
    interface CTitle {
    }
    interface CToolbar {
    }
}
declare global {
    interface HTMLCAccordionElement extends Components.CAccordion, HTMLStencilElement {
    }
    var HTMLCAccordionElement: {
        prototype: HTMLCAccordionElement;
        new (): HTMLCAccordionElement;
    };
    interface HTMLCAccordionItemElement extends Components.CAccordionItem, HTMLStencilElement {
    }
    var HTMLCAccordionItemElement: {
        prototype: HTMLCAccordionItemElement;
        new (): HTMLCAccordionItemElement;
    };
    interface HTMLCAutocompleteElement extends Components.CAutocomplete, HTMLStencilElement {
    }
    var HTMLCAutocompleteElement: {
        prototype: HTMLCAutocompleteElement;
        new (): HTMLCAutocompleteElement;
    };
    interface HTMLCButtonElement extends Components.CButton, HTMLStencilElement {
    }
    var HTMLCButtonElement: {
        prototype: HTMLCButtonElement;
        new (): HTMLCButtonElement;
    };
    interface HTMLCButtonGroupElement extends Components.CButtonGroup, HTMLStencilElement {
    }
    var HTMLCButtonGroupElement: {
        prototype: HTMLCButtonGroupElement;
        new (): HTMLCButtonGroupElement;
    };
    interface HTMLCCardElement extends Components.CCard, HTMLStencilElement {
    }
    var HTMLCCardElement: {
        prototype: HTMLCCardElement;
        new (): HTMLCCardElement;
    };
    interface HTMLCCardActionsElement extends Components.CCardActions, HTMLStencilElement {
    }
    var HTMLCCardActionsElement: {
        prototype: HTMLCCardActionsElement;
        new (): HTMLCCardActionsElement;
    };
    interface HTMLCCardContentElement extends Components.CCardContent, HTMLStencilElement {
    }
    var HTMLCCardContentElement: {
        prototype: HTMLCCardContentElement;
        new (): HTMLCCardContentElement;
    };
    interface HTMLCCardTitleElement extends Components.CCardTitle, HTMLStencilElement {
    }
    var HTMLCCardTitleElement: {
        prototype: HTMLCCardTitleElement;
        new (): HTMLCCardTitleElement;
    };
    interface HTMLCCheckboxElement extends Components.CCheckbox, HTMLStencilElement {
    }
    var HTMLCCheckboxElement: {
        prototype: HTMLCCheckboxElement;
        new (): HTMLCCheckboxElement;
    };
    interface HTMLCConsentElement extends Components.CConsent, HTMLStencilElement {
    }
    var HTMLCConsentElement: {
        prototype: HTMLCConsentElement;
        new (): HTMLCConsentElement;
    };
    interface HTMLCContainerElement extends Components.CContainer, HTMLStencilElement {
    }
    var HTMLCContainerElement: {
        prototype: HTMLCContainerElement;
        new (): HTMLCContainerElement;
    };
    interface HTMLCCscLogoElement extends Components.CCscLogo, HTMLStencilElement {
    }
    var HTMLCCscLogoElement: {
        prototype: HTMLCCscLogoElement;
        new (): HTMLCCscLogoElement;
    };
    interface HTMLCFlexElement extends Components.CFlex, HTMLStencilElement {
    }
    var HTMLCFlexElement: {
        prototype: HTMLCFlexElement;
        new (): HTMLCFlexElement;
    };
    interface HTMLCIconButtonElement extends Components.CIconButton, HTMLStencilElement {
    }
    var HTMLCIconButtonElement: {
        prototype: HTMLCIconButtonElement;
        new (): HTMLCIconButtonElement;
    };
    interface HTMLCLinkElement extends Components.CLink, HTMLStencilElement {
    }
    var HTMLCLinkElement: {
        prototype: HTMLCLinkElement;
        new (): HTMLCLinkElement;
    };
    interface HTMLCLoaderElement extends Components.CLoader, HTMLStencilElement {
    }
    var HTMLCLoaderElement: {
        prototype: HTMLCLoaderElement;
        new (): HTMLCLoaderElement;
    };
    interface HTMLCMainElement extends Components.CMain, HTMLStencilElement {
    }
    var HTMLCMainElement: {
        prototype: HTMLCMainElement;
        new (): HTMLCMainElement;
    };
    interface HTMLCMenuElement extends Components.CMenu, HTMLStencilElement {
    }
    var HTMLCMenuElement: {
        prototype: HTMLCMenuElement;
        new (): HTMLCMenuElement;
    };
    interface HTMLCMenuItemElement extends Components.CMenuItem, HTMLStencilElement {
    }
    var HTMLCMenuItemElement: {
        prototype: HTMLCMenuItemElement;
        new (): HTMLCMenuItemElement;
    };
    interface HTMLCModalElement extends Components.CModal, HTMLStencilElement {
    }
    var HTMLCModalElement: {
        prototype: HTMLCModalElement;
        new (): HTMLCModalElement;
    };
    interface HTMLCNavigationbuttonElement extends Components.CNavigationbutton, HTMLStencilElement {
    }
    var HTMLCNavigationbuttonElement: {
        prototype: HTMLCNavigationbuttonElement;
        new (): HTMLCNavigationbuttonElement;
    };
    interface HTMLCNotificationElement extends Components.CNotification, HTMLStencilElement {
    }
    var HTMLCNotificationElement: {
        prototype: HTMLCNotificationElement;
        new (): HTMLCNotificationElement;
    };
    interface HTMLCPaginationElement extends Components.CPagination, HTMLStencilElement {
    }
    var HTMLCPaginationElement: {
        prototype: HTMLCPaginationElement;
        new (): HTMLCPaginationElement;
    };
    interface HTMLCProgressBarElement extends Components.CProgressBar, HTMLStencilElement {
    }
    var HTMLCProgressBarElement: {
        prototype: HTMLCProgressBarElement;
        new (): HTMLCProgressBarElement;
    };
    interface HTMLCRadioElement extends Components.CRadio, HTMLStencilElement {
    }
    var HTMLCRadioElement: {
        prototype: HTMLCRadioElement;
        new (): HTMLCRadioElement;
    };
    interface HTMLCRowElement extends Components.CRow, HTMLStencilElement {
    }
    var HTMLCRowElement: {
        prototype: HTMLCRowElement;
        new (): HTMLCRowElement;
    };
    interface HTMLCSelectElement extends Components.CSelect, HTMLStencilElement {
    }
    var HTMLCSelectElement: {
        prototype: HTMLCSelectElement;
        new (): HTMLCSelectElement;
    };
    interface HTMLCSidenavigationElement extends Components.CSidenavigation, HTMLStencilElement {
    }
    var HTMLCSidenavigationElement: {
        prototype: HTMLCSidenavigationElement;
        new (): HTMLCSidenavigationElement;
    };
    interface HTMLCSidenavigationitemElement extends Components.CSidenavigationitem, HTMLStencilElement {
    }
    var HTMLCSidenavigationitemElement: {
        prototype: HTMLCSidenavigationitemElement;
        new (): HTMLCSidenavigationitemElement;
    };
    interface HTMLCSpacerElement extends Components.CSpacer, HTMLStencilElement {
    }
    var HTMLCSpacerElement: {
        prototype: HTMLCSpacerElement;
        new (): HTMLCSpacerElement;
    };
    interface HTMLCSubnavigationitemElement extends Components.CSubnavigationitem, HTMLStencilElement {
    }
    var HTMLCSubnavigationitemElement: {
        prototype: HTMLCSubnavigationitemElement;
        new (): HTMLCSubnavigationitemElement;
    };
    interface HTMLCSwitchElement extends Components.CSwitch, HTMLStencilElement {
    }
    var HTMLCSwitchElement: {
        prototype: HTMLCSwitchElement;
        new (): HTMLCSwitchElement;
    };
    interface HTMLCTabElement extends Components.CTab, HTMLStencilElement {
    }
    var HTMLCTabElement: {
        prototype: HTMLCTabElement;
        new (): HTMLCTabElement;
    };
    interface HTMLCTabButtonElement extends Components.CTabButton, HTMLStencilElement {
    }
    var HTMLCTabButtonElement: {
        prototype: HTMLCTabButtonElement;
        new (): HTMLCTabButtonElement;
    };
    interface HTMLCTabButtonsElement extends Components.CTabButtons, HTMLStencilElement {
    }
    var HTMLCTabButtonsElement: {
        prototype: HTMLCTabButtonsElement;
        new (): HTMLCTabButtonsElement;
    };
    interface HTMLCTabsElement extends Components.CTabs, HTMLStencilElement {
    }
    var HTMLCTabsElement: {
        prototype: HTMLCTabsElement;
        new (): HTMLCTabsElement;
    };
    interface HTMLCTagElement extends Components.CTag, HTMLStencilElement {
    }
    var HTMLCTagElement: {
        prototype: HTMLCTagElement;
        new (): HTMLCTagElement;
    };
    interface HTMLCTextFieldElement extends Components.CTextField, HTMLStencilElement {
    }
    var HTMLCTextFieldElement: {
        prototype: HTMLCTextFieldElement;
        new (): HTMLCTextFieldElement;
    };
    interface HTMLCTitleElement extends Components.CTitle, HTMLStencilElement {
    }
    var HTMLCTitleElement: {
        prototype: HTMLCTitleElement;
        new (): HTMLCTitleElement;
    };
    interface HTMLCToolbarElement extends Components.CToolbar, HTMLStencilElement {
    }
    var HTMLCToolbarElement: {
        prototype: HTMLCToolbarElement;
        new (): HTMLCToolbarElement;
    };
    interface HTMLElementTagNameMap {
        "c-accordion": HTMLCAccordionElement;
        "c-accordion-item": HTMLCAccordionItemElement;
        "c-autocomplete": HTMLCAutocompleteElement;
        "c-button": HTMLCButtonElement;
        "c-button-group": HTMLCButtonGroupElement;
        "c-card": HTMLCCardElement;
        "c-card-actions": HTMLCCardActionsElement;
        "c-card-content": HTMLCCardContentElement;
        "c-card-title": HTMLCCardTitleElement;
        "c-checkbox": HTMLCCheckboxElement;
        "c-consent": HTMLCConsentElement;
        "c-container": HTMLCContainerElement;
        "c-csc-logo": HTMLCCscLogoElement;
        "c-flex": HTMLCFlexElement;
        "c-icon-button": HTMLCIconButtonElement;
        "c-link": HTMLCLinkElement;
        "c-loader": HTMLCLoaderElement;
        "c-main": HTMLCMainElement;
        "c-menu": HTMLCMenuElement;
        "c-menu-item": HTMLCMenuItemElement;
        "c-modal": HTMLCModalElement;
        "c-navigationbutton": HTMLCNavigationbuttonElement;
        "c-notification": HTMLCNotificationElement;
        "c-pagination": HTMLCPaginationElement;
        "c-progress-bar": HTMLCProgressBarElement;
        "c-radio": HTMLCRadioElement;
        "c-row": HTMLCRowElement;
        "c-select": HTMLCSelectElement;
        "c-sidenavigation": HTMLCSidenavigationElement;
        "c-sidenavigationitem": HTMLCSidenavigationitemElement;
        "c-spacer": HTMLCSpacerElement;
        "c-subnavigationitem": HTMLCSubnavigationitemElement;
        "c-switch": HTMLCSwitchElement;
        "c-tab": HTMLCTabElement;
        "c-tab-button": HTMLCTabButtonElement;
        "c-tab-buttons": HTMLCTabButtonsElement;
        "c-tabs": HTMLCTabsElement;
        "c-tag": HTMLCTagElement;
        "c-text-field": HTMLCTextFieldElement;
        "c-title": HTMLCTitleElement;
        "c-toolbar": HTMLCToolbarElement;
    }
}
declare namespace LocalJSX {
    interface CAccordion {
        /**
          * Allow expanding multiple items
         */
        "multiple"?: boolean;
        /**
          * Emit changes to the parent
         */
        "onChangeValue"?: (event: CustomEvent<number | string>) => void;
        /**
          * Show an outline around expanded items
         */
        "outlined"?: boolean;
        /**
          * Value of the content switcher
         */
        "value": number | string | (number | string)[];
    }
    interface CAccordionItem {
        /**
          * Expansion status of the item
         */
        "expanded"?: boolean;
        /**
          * Heading of the accordion item
         */
        "heading"?: string;
        /**
          * Icon
          * @deprecated Please use the icon slot instead
         */
        "icon"?: 'enabled' | 'disabled' | 'bell' | 'pending';
        /**
          * Emit changes to the c-accordion
          * @private
         */
        "onItemChange"?: (event: CustomEvent<any>) => void;
        /**
          * Value of the accordion item
         */
        "value"?: number | string;
    }
    interface CAutocomplete {
        /**
          * Dense variant
         */
        "dense"?: boolean;
        /**
          * Items to be selected
         */
        "items"?: {
    name: string;
    value: string;
  }[];
        /**
          * Items per page before adding scroll
         */
        "itemsPerPage"?: number;
        /**
          * Element label
         */
        "label"?: string;
        /**
          * Triggered when text is typed
         */
        "onChangeQuery"?: (event: CustomEvent<any>) => void;
        /**
          * Triggered when an item is selected
         */
        "onChangeValue"?: (event: CustomEvent<any>) => void;
        /**
          * Search string
         */
        "query"?: string;
        /**
          * Show required validation
         */
        "required"?: boolean;
        /**
          * Selected item
         */
        "value"?: { name: string; value: string };
    }
    interface CButton {
        /**
          * Disable the button
         */
        "disabled"?: boolean;
        /**
          * Fit width to containing element
         */
        "fit"?: boolean;
        /**
          * Light button background
         */
        "ghost"?: boolean;
        /**
          * Id of the button
         */
        "hostId"?: string;
        /**
          * Name of the icon to be displayed in the button
          * @deprecated Please use the icon slot instead
         */
        "icon"?: 'plus' | 'minus' | 'account' | 'edit';
        /**
          * Display loader on the button
         */
        "loading"?: boolean;
        /**
          * Remove the default border radius
         */
        "noRadius"?: boolean;
        /**
          * Outlined button style
         */
        "outlined"?: boolean;
        /**
          * Size of the button
         */
        "size"?: 'default' | 'small' | 'large';
        /**
          * Transparent button background
         */
        "text"?: boolean;
        /**
          * Value for the button - for use in the c-content-switcher
         */
        "value"?: number | string;
    }
    interface CButtonGroup {
        /**
          * Disable the content switcher
         */
        "hostDisabled"?: boolean;
        /**
          * Always require a selection
         */
        "mandatory"?: boolean;
        /**
          * Emit changes to the parent
         */
        "onChangeValue"?: (event: CustomEvent<number | string>) => void;
        /**
          * Size of the buttons
         */
        "size"?: 'default' | 'small';
        /**
          * Value of the content switcher
         */
        "value": number | string;
    }
    interface CCard {
        /**
          * Card background image for login pages of specific services
         */
        "background"?: CardBackground;
    }
    interface CCardActions {
        /**
          * Align actions to the right
         */
        "right"?: boolean;
    }
    interface CCardContent {
    }
    interface CCardTitle {
    }
    interface CCheckbox {
        /**
          * Element label
         */
        "label"?: string;
        /**
          * Triggered when element is checked or unchecked
         */
        "onChangeValue"?: (event: CustomEvent<any>) => void;
        /**
          * Is the element checked
         */
        "value"?: boolean;
    }
    interface CConsent {
    }
    interface CContainer {
        "width"?: number;
    }
    interface CCscLogo {
    }
    interface CFlex {
    }
    interface CIconButton {
        /**
          * Show a badge on top of the icon
         */
        "badge"?: string;
        /**
          * Disable the button
         */
        "disabled"?: boolean;
        /**
          * Ghost variant of the button
         */
        "ghost"?: boolean;
        /**
          * Outlined variant of the button
         */
        "outlined"?: boolean;
        /**
          * Size of the button
         */
        "size"?: 'default' | 'small';
        /**
          * Text variant of the button
         */
        "text"?: boolean;
    }
    interface CLink {
        "href"?: string;
        "target"?: string;
        "underline"?: boolean;
    }
    interface CLoader {
        "contentdelay"?: number;
    }
    interface CMain {
    }
    interface CMenu {
        /**
          * Menu items
         */
        "items"?: { name: string; action: Function }[];
        /**
          * No hover background
         */
        "nohover"?: boolean;
        /**
          * Simple variant without chevron and background, E.g. when a button is the activator
         */
        "simple"?: boolean;
        /**
          * Small variant
         */
        "small"?: boolean;
    }
    interface CMenuItem {
        "active"?: boolean;
        "small"?: boolean;
    }
    interface CModal {
        "value"?: boolean;
    }
    interface CNavigationbutton {
    }
    interface CNotification {
        "notification"?: any;
        "position"?: string;
    }
    interface CPagination {
        /**
          * Hide range indicator
         */
        "hideRange"?: boolean;
        /**
          * Items per page options
         */
        "itemsPerPageOptions"?: number[];
        /**
          * Triggered when values are changed
         */
        "onChangeValue"?: (event: CustomEvent<{
    itemCount: number;
    currentPage?: number;
    totalVisible?: number;
    itemsPerPage?: number;
    startFrom?: number;
    endTo?: number;
  }>) => void;
        /**
          * Object containing values that are needed for pagination.  Note! startFrom and endTo are assigned automatically to the object based on other values
         */
        "value"?: {
    itemCount: number;
    currentPage?: number;
    totalVisible?: number;
    itemsPerPage?: number;
    startFrom?: number;
    endTo?: number;
  };
    }
    interface CProgressBar {
        /**
          * Color of the bar (valid css color)
          * @default var(--csc-primary)
         */
        "color"?: string;
        /**
          * Indeterminate state of the progress bar
         */
        "indeterminate"?: boolean;
        /**
          * Progress bar value in percentage (0 to 100)
         */
        "value"?: number;
    }
    interface CRadio {
        /**
          * Color of the radio group
         */
        "color"?: string;
        /**
          * Radio group items
         */
        "items"?: { label: string; value: number | string }[];
        /**
          * Label of the radio group
         */
        "label"?: string;
        /**
          * Emit value change to the parent
         */
        "onChangeValue"?: (event: CustomEvent<any>) => void;
        /**
          * Value of the radio group
         */
        "value"?: { label: string; value: number | string };
    }
    interface CRow {
        /**
          * Align items vertically
         */
        "align"?: 'start' | 'center' | 'end';
        /**
          * Gap between items in px
         */
        "gap"?: number;
        /**
          * Justify content horizontally
         */
        "justify"?: 'start' | 'center' | 'end' | 'space-between';
        /**
          * Flex wrap
         */
        "wrap"?: boolean;
    }
    interface CSelect {
        "dense"?: boolean;
        "hostId"?: string;
        "items"?: any[];
        "itemsPerPage"?: number;
        "label"?: string;
        "labelRight"?: boolean;
        "name"?: string;
        "onChangeValue"?: (event: CustomEvent<any>) => void;
        "placeholder"?: string;
        "required"?: boolean;
        "shadow"?: boolean;
        "showNone"?: boolean;
        "validate"?: boolean;
        "validateOnBlur"?: boolean;
        "value"?: any;
    }
    interface CSidenavigation {
        "menuVisible"?: boolean;
        "mobile"?: boolean;
    }
    interface CSidenavigationitem {
        /**
          * Indicate active state
         */
        "active"?: boolean;
        /**
          * Hyperlink url
         */
        "href"?: string;
    }
    interface CSpacer {
    }
    interface CSubnavigationitem {
        "active"?: boolean;
        "href"?: string;
    }
    interface CSwitch {
        /**
          * Disable the switch
         */
        "hostDisabled"?: boolean;
        /**
          * Id for the element
         */
        "hostId"?: string;
        /**
          * Emit inner value change to parent
         */
        "onChangeValue"?: (event: CustomEvent<boolean>) => void;
        /**
          * Value of the element
         */
        "value"?: boolean;
    }
    interface CTab {
        /**
          * Mark tab as active
         */
        "active"?: boolean;
        /**
          * Mark tab as disabled
         */
        "disabled"?: boolean;
        /**
          * Id of the tab
         */
        "hostId"?: string;
        /**
          * Emit changes to the parent
          * @private
         */
        "onTabChange"?: (event: CustomEvent<any>) => void;
        /**
          * Value for the tab - for use in c-tabs
         */
        "value"?: number | string;
    }
    interface CTabButton {
        /**
          * Mark as active
         */
        "active"?: boolean;
        /**
          * Disable button
         */
        "disabled"?: boolean;
        /**
          * Id of the button
         */
        "hostId"?: string;
        /**
          * Label of the button
         */
        "label"?: string;
        /**
          * Emit value change to the parent
         */
        "onChangeValue"?: (event: CustomEvent<number | string>) => void;
        /**
          * Emit tab focus to the parent
          * @private
         */
        "onFocusTab"?: (event: CustomEvent<any>) => void;
        /**
          * Emit tab change to parent
          * @private
         */
        "onTabChange"?: (event: CustomEvent<any>) => void;
        /**
          * Value of the button
         */
        "value"?: number | string;
    }
    interface CTabButtons {
        /**
          * Value of the tab buttons
         */
        "value"?: number | string;
    }
    interface CTabs {
        /**
          * Emit changes to the parent
         */
        "onChangeValue"?: (event: CustomEvent<any>) => void;
        /**
          * Currently active tab
         */
        "value": number | string;
    }
    interface CTag {
        /**
          * Mark tag as active
         */
        "active"?: boolean;
        /**
          * Mark tag as closeable
         */
        "closeable"?: boolean;
        /**
          * Stretch to fill the container
         */
        "fit"?: boolean;
    }
    interface CTextField {
        "autofocus"?: boolean;
        "disabled"?: boolean;
        "form"?: boolean;
        "hostId"?: string;
        "label"?: string;
        "max"?: number;
        "min"?: number;
        "name"?: string;
        "number"?: boolean;
        "onChangeValue"?: (event: CustomEvent<any>) => void;
        "placeholder"?: string;
        "readonly"?: boolean;
        "required"?: boolean;
        "rows"?: number;
        "shadow"?: boolean;
        "step"?: number;
        "type"?: string;
        "valid"?: boolean;
        "validate"?: boolean;
        "validateOnBlur"?: boolean;
        "validation"?: string;
        "value"?: string;
    }
    interface CTitle {
    }
    interface CToolbar {
    }
    interface IntrinsicElements {
        "c-accordion": CAccordion;
        "c-accordion-item": CAccordionItem;
        "c-autocomplete": CAutocomplete;
        "c-button": CButton;
        "c-button-group": CButtonGroup;
        "c-card": CCard;
        "c-card-actions": CCardActions;
        "c-card-content": CCardContent;
        "c-card-title": CCardTitle;
        "c-checkbox": CCheckbox;
        "c-consent": CConsent;
        "c-container": CContainer;
        "c-csc-logo": CCscLogo;
        "c-flex": CFlex;
        "c-icon-button": CIconButton;
        "c-link": CLink;
        "c-loader": CLoader;
        "c-main": CMain;
        "c-menu": CMenu;
        "c-menu-item": CMenuItem;
        "c-modal": CModal;
        "c-navigationbutton": CNavigationbutton;
        "c-notification": CNotification;
        "c-pagination": CPagination;
        "c-progress-bar": CProgressBar;
        "c-radio": CRadio;
        "c-row": CRow;
        "c-select": CSelect;
        "c-sidenavigation": CSidenavigation;
        "c-sidenavigationitem": CSidenavigationitem;
        "c-spacer": CSpacer;
        "c-subnavigationitem": CSubnavigationitem;
        "c-switch": CSwitch;
        "c-tab": CTab;
        "c-tab-button": CTabButton;
        "c-tab-buttons": CTabButtons;
        "c-tabs": CTabs;
        "c-tag": CTag;
        "c-text-field": CTextField;
        "c-title": CTitle;
        "c-toolbar": CToolbar;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "c-accordion": LocalJSX.CAccordion & JSXBase.HTMLAttributes<HTMLCAccordionElement>;
            "c-accordion-item": LocalJSX.CAccordionItem & JSXBase.HTMLAttributes<HTMLCAccordionItemElement>;
            "c-autocomplete": LocalJSX.CAutocomplete & JSXBase.HTMLAttributes<HTMLCAutocompleteElement>;
            "c-button": LocalJSX.CButton & JSXBase.HTMLAttributes<HTMLCButtonElement>;
            "c-button-group": LocalJSX.CButtonGroup & JSXBase.HTMLAttributes<HTMLCButtonGroupElement>;
            "c-card": LocalJSX.CCard & JSXBase.HTMLAttributes<HTMLCCardElement>;
            "c-card-actions": LocalJSX.CCardActions & JSXBase.HTMLAttributes<HTMLCCardActionsElement>;
            "c-card-content": LocalJSX.CCardContent & JSXBase.HTMLAttributes<HTMLCCardContentElement>;
            "c-card-title": LocalJSX.CCardTitle & JSXBase.HTMLAttributes<HTMLCCardTitleElement>;
            "c-checkbox": LocalJSX.CCheckbox & JSXBase.HTMLAttributes<HTMLCCheckboxElement>;
            "c-consent": LocalJSX.CConsent & JSXBase.HTMLAttributes<HTMLCConsentElement>;
            "c-container": LocalJSX.CContainer & JSXBase.HTMLAttributes<HTMLCContainerElement>;
            "c-csc-logo": LocalJSX.CCscLogo & JSXBase.HTMLAttributes<HTMLCCscLogoElement>;
            "c-flex": LocalJSX.CFlex & JSXBase.HTMLAttributes<HTMLCFlexElement>;
            "c-icon-button": LocalJSX.CIconButton & JSXBase.HTMLAttributes<HTMLCIconButtonElement>;
            "c-link": LocalJSX.CLink & JSXBase.HTMLAttributes<HTMLCLinkElement>;
            "c-loader": LocalJSX.CLoader & JSXBase.HTMLAttributes<HTMLCLoaderElement>;
            "c-main": LocalJSX.CMain & JSXBase.HTMLAttributes<HTMLCMainElement>;
            "c-menu": LocalJSX.CMenu & JSXBase.HTMLAttributes<HTMLCMenuElement>;
            "c-menu-item": LocalJSX.CMenuItem & JSXBase.HTMLAttributes<HTMLCMenuItemElement>;
            "c-modal": LocalJSX.CModal & JSXBase.HTMLAttributes<HTMLCModalElement>;
            "c-navigationbutton": LocalJSX.CNavigationbutton & JSXBase.HTMLAttributes<HTMLCNavigationbuttonElement>;
            "c-notification": LocalJSX.CNotification & JSXBase.HTMLAttributes<HTMLCNotificationElement>;
            "c-pagination": LocalJSX.CPagination & JSXBase.HTMLAttributes<HTMLCPaginationElement>;
            "c-progress-bar": LocalJSX.CProgressBar & JSXBase.HTMLAttributes<HTMLCProgressBarElement>;
            "c-radio": LocalJSX.CRadio & JSXBase.HTMLAttributes<HTMLCRadioElement>;
            "c-row": LocalJSX.CRow & JSXBase.HTMLAttributes<HTMLCRowElement>;
            "c-select": LocalJSX.CSelect & JSXBase.HTMLAttributes<HTMLCSelectElement>;
            "c-sidenavigation": LocalJSX.CSidenavigation & JSXBase.HTMLAttributes<HTMLCSidenavigationElement>;
            "c-sidenavigationitem": LocalJSX.CSidenavigationitem & JSXBase.HTMLAttributes<HTMLCSidenavigationitemElement>;
            "c-spacer": LocalJSX.CSpacer & JSXBase.HTMLAttributes<HTMLCSpacerElement>;
            "c-subnavigationitem": LocalJSX.CSubnavigationitem & JSXBase.HTMLAttributes<HTMLCSubnavigationitemElement>;
            "c-switch": LocalJSX.CSwitch & JSXBase.HTMLAttributes<HTMLCSwitchElement>;
            "c-tab": LocalJSX.CTab & JSXBase.HTMLAttributes<HTMLCTabElement>;
            "c-tab-button": LocalJSX.CTabButton & JSXBase.HTMLAttributes<HTMLCTabButtonElement>;
            "c-tab-buttons": LocalJSX.CTabButtons & JSXBase.HTMLAttributes<HTMLCTabButtonsElement>;
            "c-tabs": LocalJSX.CTabs & JSXBase.HTMLAttributes<HTMLCTabsElement>;
            "c-tag": LocalJSX.CTag & JSXBase.HTMLAttributes<HTMLCTagElement>;
            "c-text-field": LocalJSX.CTextField & JSXBase.HTMLAttributes<HTMLCTextFieldElement>;
            "c-title": LocalJSX.CTitle & JSXBase.HTMLAttributes<HTMLCTitleElement>;
            "c-toolbar": LocalJSX.CToolbar & JSXBase.HTMLAttributes<HTMLCToolbarElement>;
        }
    }
}
