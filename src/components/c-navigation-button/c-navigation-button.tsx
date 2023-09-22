import { Component, Host, h } from '@stencil/core';
/**
 * @parent c-toolbar
 */
@Component({
  tag: 'c-navigation-button',
  styleUrl: 'c-navigation-button.scss',
  shadow: true,
})
export class CNavigationButton {
  private _svg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="15.33"
      viewBox="0 0 20 15.33"
    >
      <line
        id="Line_300"
        data-name="Line 300"
        x2="18"
        transform="translate(1 1)"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
      <line
        id="Line_301"
        data-name="Line 301"
        x2="18"
        transform="translate(1 7.67)"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
      <line
        id="Line_302"
        data-name="Line 302"
        x2="18"
        transform="translate(1 14.33)"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
      />
    </svg>
  );

  render() {
    return <Host tabindex={0}>{this._svg}</Host>;
  }
}
