/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
    interface CAutocomplete {
        "dense": boolean;
        "items": any[];
        "label": string;
        "name": string;
        "query": any;
        "required": boolean;
        "value": any;
    }
    interface CButton {
        "color": string;
        "dense": boolean;
        "disabled": boolean;
        "fit": boolean;
        "fixed": boolean;
        "fullWidthMobile": boolean;
        "icon": string;
        "loading": boolean;
        "noRadius": boolean;
        "outlined": boolean;
    }
    interface CCard {
        "shadow": boolean;
    }
    interface CCol {
    }
    interface CContainer {
    }
    interface CLoader {
    }
    interface COption {
        "dense": boolean;
        "label": string;
        "value": string;
    }
    interface CRow {
    }
    interface CSelect {
        "dense": boolean;
        "items": any[];
        "itemsPerPage": number;
        "label": string;
        "name": string;
        "required": boolean;
        "value": any;
    }
    interface CSpacer {
    }
    interface CTab {
        "active": boolean;
    }
    interface CTabButton {
        "active": boolean;
        "color": string;
        "disabled": boolean;
        "icon": string;
        "label": string;
        "noRadius": boolean;
    }
    interface CTextField {
        "dense": boolean;
        "disabled": boolean;
        "label": string;
        "max": number;
        "min": number;
        "name": string;
        "number": boolean;
        "placeholder": string;
        "readonly": boolean;
        "required": boolean;
        "rows": number;
        "step": number;
        "value": string;
    }
    interface CTitle {
    }
    interface CToggle {
        "active": boolean;
        "color": string;
        "description": string;
        "fit": boolean;
        "fixed": boolean;
        "subtitle": string;
    }
}
declare global {
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
    interface HTMLCCardElement extends Components.CCard, HTMLStencilElement {
    }
    var HTMLCCardElement: {
        prototype: HTMLCCardElement;
        new (): HTMLCCardElement;
    };
    interface HTMLCColElement extends Components.CCol, HTMLStencilElement {
    }
    var HTMLCColElement: {
        prototype: HTMLCColElement;
        new (): HTMLCColElement;
    };
    interface HTMLCContainerElement extends Components.CContainer, HTMLStencilElement {
    }
    var HTMLCContainerElement: {
        prototype: HTMLCContainerElement;
        new (): HTMLCContainerElement;
    };
    interface HTMLCLoaderElement extends Components.CLoader, HTMLStencilElement {
    }
    var HTMLCLoaderElement: {
        prototype: HTMLCLoaderElement;
        new (): HTMLCLoaderElement;
    };
    interface HTMLCOptionElement extends Components.COption, HTMLStencilElement {
    }
    var HTMLCOptionElement: {
        prototype: HTMLCOptionElement;
        new (): HTMLCOptionElement;
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
    interface HTMLCSpacerElement extends Components.CSpacer, HTMLStencilElement {
    }
    var HTMLCSpacerElement: {
        prototype: HTMLCSpacerElement;
        new (): HTMLCSpacerElement;
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
    interface HTMLCToggleElement extends Components.CToggle, HTMLStencilElement {
    }
    var HTMLCToggleElement: {
        prototype: HTMLCToggleElement;
        new (): HTMLCToggleElement;
    };
    interface HTMLElementTagNameMap {
        "c-autocomplete": HTMLCAutocompleteElement;
        "c-button": HTMLCButtonElement;
        "c-card": HTMLCCardElement;
        "c-col": HTMLCColElement;
        "c-container": HTMLCContainerElement;
        "c-loader": HTMLCLoaderElement;
        "c-option": HTMLCOptionElement;
        "c-row": HTMLCRowElement;
        "c-select": HTMLCSelectElement;
        "c-spacer": HTMLCSpacerElement;
        "c-tab": HTMLCTabElement;
        "c-tab-button": HTMLCTabButtonElement;
        "c-text-field": HTMLCTextFieldElement;
        "c-title": HTMLCTitleElement;
        "c-toggle": HTMLCToggleElement;
    }
}
declare namespace LocalJSX {
    interface CAutocomplete {
        "dense"?: boolean;
        "items"?: any[];
        "label"?: string;
        "name"?: string;
        "onChangeValue"?: (event: CustomEvent<any>) => void;
        "query"?: any;
        "required"?: boolean;
        "value"?: any;
    }
    interface CButton {
        "color"?: string;
        "dense"?: boolean;
        "disabled"?: boolean;
        "fit"?: boolean;
        "fixed"?: boolean;
        "fullWidthMobile"?: boolean;
        "icon"?: string;
        "loading"?: boolean;
        "noRadius"?: boolean;
        "outlined"?: boolean;
    }
    interface CCard {
        "shadow"?: boolean;
    }
    interface CCol {
    }
    interface CContainer {
    }
    interface CLoader {
    }
    interface COption {
        "dense"?: boolean;
        "label"?: string;
        "value"?: string;
    }
    interface CRow {
    }
    interface CSelect {
        "dense"?: boolean;
        "items"?: any[];
        "itemsPerPage"?: number;
        "label"?: string;
        "name"?: string;
        "onChangeValue"?: (event: CustomEvent<any>) => void;
        "required"?: boolean;
        "value"?: any;
    }
    interface CSpacer {
    }
    interface CTab {
        "active"?: boolean;
    }
    interface CTabButton {
        "active"?: boolean;
        "color"?: string;
        "disabled"?: boolean;
        "icon"?: string;
        "label"?: string;
        "noRadius"?: boolean;
    }
    interface CTextField {
        "dense"?: boolean;
        "disabled"?: boolean;
        "label"?: string;
        "max"?: number;
        "min"?: number;
        "name"?: string;
        "number"?: boolean;
        "placeholder"?: string;
        "readonly"?: boolean;
        "required"?: boolean;
        "rows"?: number;
        "step"?: number;
        "value"?: string;
    }
    interface CTitle {
    }
    interface CToggle {
        "active"?: boolean;
        "color"?: string;
        "description"?: string;
        "fit"?: boolean;
        "fixed"?: boolean;
        "subtitle"?: string;
    }
    interface IntrinsicElements {
        "c-autocomplete": CAutocomplete;
        "c-button": CButton;
        "c-card": CCard;
        "c-col": CCol;
        "c-container": CContainer;
        "c-loader": CLoader;
        "c-option": COption;
        "c-row": CRow;
        "c-select": CSelect;
        "c-spacer": CSpacer;
        "c-tab": CTab;
        "c-tab-button": CTabButton;
        "c-text-field": CTextField;
        "c-title": CTitle;
        "c-toggle": CToggle;
    }
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
    export namespace JSX {
        interface IntrinsicElements {
            "c-autocomplete": LocalJSX.CAutocomplete & JSXBase.HTMLAttributes<HTMLCAutocompleteElement>;
            "c-button": LocalJSX.CButton & JSXBase.HTMLAttributes<HTMLCButtonElement>;
            "c-card": LocalJSX.CCard & JSXBase.HTMLAttributes<HTMLCCardElement>;
            "c-col": LocalJSX.CCol & JSXBase.HTMLAttributes<HTMLCColElement>;
            "c-container": LocalJSX.CContainer & JSXBase.HTMLAttributes<HTMLCContainerElement>;
            "c-loader": LocalJSX.CLoader & JSXBase.HTMLAttributes<HTMLCLoaderElement>;
            "c-option": LocalJSX.COption & JSXBase.HTMLAttributes<HTMLCOptionElement>;
            "c-row": LocalJSX.CRow & JSXBase.HTMLAttributes<HTMLCRowElement>;
            "c-select": LocalJSX.CSelect & JSXBase.HTMLAttributes<HTMLCSelectElement>;
            "c-spacer": LocalJSX.CSpacer & JSXBase.HTMLAttributes<HTMLCSpacerElement>;
            "c-tab": LocalJSX.CTab & JSXBase.HTMLAttributes<HTMLCTabElement>;
            "c-tab-button": LocalJSX.CTabButton & JSXBase.HTMLAttributes<HTMLCTabButtonElement>;
            "c-text-field": LocalJSX.CTextField & JSXBase.HTMLAttributes<HTMLCTextFieldElement>;
            "c-title": LocalJSX.CTitle & JSXBase.HTMLAttributes<HTMLCTitleElement>;
            "c-toggle": LocalJSX.CToggle & JSXBase.HTMLAttributes<HTMLCToggleElement>;
        }
    }
}
