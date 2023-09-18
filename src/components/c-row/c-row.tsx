import { Component, h, Prop } from '@stencil/core';

/**
 * Generic flex row component
 *
 * @group Layout
 * @slot Default slot - Should contain items to be displayed in the row
 */
@Component({
  tag: 'c-row',
  styleUrl: 'c-row.scss',
  shadow: true,
})
export class CRow {
  /**
   * Gap between items in px
   */
  @Prop() gap = 0;

  /**
   * Disable flex wrap
   */
  @Prop() nowrap = false;

  /**
   * Align items vertically
   */
  @Prop() align: 'start' | 'center' | 'end' = 'start';

  /**
   * Justify content horizontally
   */
  @Prop() justify:
    | 'start'
    | 'center'
    | 'end'
    | 'space-between'
    | 'space-around' = 'start';

  render() {
    const classes = {
      'c-row': true,
      'c-row--nowrap': this.nowrap,
      [`c-row--align-${this.align}`]: true,
      [`c-row--justify-${this.justify}`]: true,
    };

    return (
      <div class={classes} style={{ '--row-gap': `${this.gap}px` }}>
        <slot></slot>
      </div>
    );
  }
}
