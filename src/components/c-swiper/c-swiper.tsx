import {
  Component,
  Event,
  EventEmitter,
  h,
  Listen,
  Prop,
  State,
} from '@stencil/core';
import { Swiper, Navigation, SwiperOptions } from 'swiper';
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js';

/**
 * @group Content Selectors
 * @slot Default slot - Default slot for the c-swiper-tab elements
 */
@Component({
  tag: 'c-swiper',
  styleUrl: 'c-swiper.scss',
  shadow: false,
})
export class CSwiper {
  /**
   * Value of the swiper
   */
  @Prop({ reflect: true, mutable: true }) value: number | string;

  @State() isBeginning = true;

  @State() isEnd = false;

  /**
   * Emit value change to the parent
   */
  @Event({ bubbles: false }) changeValue: EventEmitter<number | string>;

  private _container?: HTMLDivElement;

  private _wrapper?: HTMLDivElement;

  private _swiper: Swiper;

  private _options: SwiperOptions;

  @Listen('changeValue')
  onTabClick(event: MouseEvent) {
    this.value = event.detail;

    this.slotItems.forEach((child) => {
      child.active = child.value === event.detail;
    });
  }

  @Listen('focusTab', { passive: true })
  onTabFocus(event: CustomEvent<number | string>) {
    const index = (event.target as HTMLCSwiperTabElement).dataset.index;

    this._slideToTab(index);
  }

  @Listen('keyup', { capture: true })
  handleKeyUp(ev: KeyboardEvent) {
    const isArrowLeft = ev.key === 'ArrowLeft';
    const isArrowRight = ev.key === 'ArrowRight';
    const isBeginning = +this.value === 1;
    const isEnd = +this.value === this.slotItems.length;

    if (!isArrowRight && !isArrowLeft) return;

    if (isArrowLeft) {
      this.value = (
        isBeginning ? this.slotItems.length : +this.value - 1
      ).toString();
    }

    if (isArrowRight) {
      this.value = (isEnd ? 1 : +this.value + 1).toString();
    }

    this._slideToTab(+this.value - 1);

    this.slotItems.forEach((child) => {
      const isActive = child.value === this.value;

      child.active = isActive;

      if (isActive) {
        child.focus();
      }
    });

    this.changeValue.emit(this.value);
  }

  get slotItems() {
    return Array.from(this._wrapper.children) as HTMLCSwiperTabElement[];
  }

  private _slideToTab(index) {
    this._swiper.slideTo(index);
    this._swiper.update();
  }

  componentDidLoad() {
    this._options = {
      modules: [Navigation],
      breakpointsBase: 'container',
      loop: false,
      speed: 300,
      slideToClickedSlide: true,
      slidesPerView: 1,
      spaceBetween: 8,
      threshold: 4,
      breakpoints: {
        480: {
          slidesPerView: 2,
        },
        720: {
          slidesPerView: 3,
        },
        960: {
          slidesPerView: 4,
        },
      },
      navigation: {
        nextEl: '.c-icon-button--next',
        prevEl: '.c-icon-button--prev',
      },
      keyboard: true,
    };

    this._initSwiper();
  }

  private _initSwiper() {
    for (const [index, slide] of this.slotItems.entries()) {
      slide.classList.add('swiper-slide');
      slide.setAttribute('data-index', index.toString());
      slide.value = slide.value ?? index;
      slide.active = this.value === slide.value;
      slide.position = index + 1;
      slide.setsize = this.slotItems.length;
    }

    this._swiper = new Swiper(this._container, {
      ...this._options,
    });

    this._swiper.on('activeIndexChange', ({ isBeginning, isEnd }) => {
      this.isBeginning = isBeginning;
      this.isEnd = isEnd;
    });

    this._slideToTab(
      this.slotItems?.findIndex((item) => item.value === this.value) || 0,
    );
  }

  render() {
    return (
      <div class='c-swiper swiper'>
        <div
          class='swiper-container'
          ref={(el) => (this._container = el as HTMLDivElement)}
        >
          <div
            role='tablist'
            class='swiper-wrapper'
            ref={(el) => (this._wrapper = el as HTMLDivElement)}
          >
            <slot></slot>
          </div>

          <div class='c-swiper__navigation'>
            <c-icon-button
              aria-disabled={this.isBeginning ? 'true' : 'false'}
              aria-label='previous page'
              class='c-icon-button--prev'
              disabled={this.isBeginning}
              size='small'
              ghost
            >
              <span class='visuallyhidden'>
                Previous
                <span>page</span>
              </span>
              <svg width='24' height='24' viewBox='0 0 24 24'>
                <path d={mdiChevronLeft} />
              </svg>
            </c-icon-button>

            <c-icon-button
              aria-disabled={this.isEnd ? 'true' : 'false'}
              aria-label='next page'
              class='c-icon-button--next'
              disabled={this.isEnd}
              size='small'
              ghost
            >
              <span class='visuallyhidden'>
                Next
                <span>page</span>
              </span>
              <svg width='24' height='24' viewBox='0 0 24 24'>
                <path d={mdiChevronRight} />
              </svg>
            </c-icon-button>
          </div>
        </div>
      </div>
    );
  }
}
