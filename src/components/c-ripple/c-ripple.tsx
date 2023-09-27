import { Component, Element, Host, Method, h } from '@stencil/core';

/**
 * @parent None
 */
@Component({
  tag: 'c-ripple',
  styleUrl: 'c-ripple.scss',
  shadow: true,
})
export class CRipple {
  @Element() el: HTMLCRippleElement;

  private _rippleElement: HTMLDivElement;

  /**
   * Creates a ripple
   */
  @Method()
  async createRipple(event: MouseEvent, parent: HTMLElement, center = false) {
    // clear animation on repeat clicks
    this._rippleElement.classList.remove('animate');

    const width = parent.offsetWidth;
    const height = parent.offsetHeight;
    const rect = (event.target as HTMLElement).getBoundingClientRect();

    const maxDimension = this._calculateHeight(
      Math.max(parent.offsetWidth, parent.offsetHeight),
    );

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const top = y - maxDimension / 2 + 'px';
    const left = x - maxDimension / 2 + 'px';

    const centerPosition = {
      top:
        maxDimension === height
          ? '0px'
          : ((maxDimension - height) / 2) * -1 + 'px',
      left:
        maxDimension === width
          ? '0px'
          : ((maxDimension - width) / 2) * -1 + 'px',
    };

    this.el.style.width = width + 'px';
    this.el.style.height = height + 'px';

    this._rippleElement.style.width = maxDimension + 'px';
    this._rippleElement.style.height = maxDimension + 'px';

    this._rippleElement.style.top = center ? centerPosition.top : top;
    this._rippleElement.style.left = center ? centerPosition.left : left;

    this._rippleElement.classList.add('animate');

    setTimeout(() => {
      this._rippleElement.classList.remove('animate');
    }, 500);
  }

  private _calculateHeight(height: number) {
    const radius = (height / 2) * Math.sqrt(2);

    return radius * 2;
  }

  render() {
    return (
      <Host aria-hidden="true">
        <div ref={(el) => (this._rippleElement = el)} class="c-ripple" />
      </Host>
    );
  }
}
