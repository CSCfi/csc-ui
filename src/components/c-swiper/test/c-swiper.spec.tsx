import { newSpecPage } from '@stencil/core/testing';
import { CSwiper } from '../c-swiper';
import { CSwiperTab } from '../c-swiper-tab';

describe('c-swiper', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CSwiper],
      html: `<c-swiper></c-swiper>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders swiper-tabs', async () => {
    const page = await newSpecPage({
      components: [CSwiper, CSwiperTab],
      html: `
      <c-swiper>
        <c-swiper-tab></c-swiper-tab>
      </c-swiper>
      `,
    });

    expect(page.root).toMatchSnapshot();
  });
});
