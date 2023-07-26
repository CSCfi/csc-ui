import { newSpecPage } from '@stencil/core/testing';
import { CSwiper } from '../c-swiper';
import { CSwiperTab } from '../../c-swiper-tab/c-swiper-tab';

describe('c-swiper', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CSwiper, CSwiperTab],
      html: `
      <c-swiper value="1">
        <c-swiper-tab value="1" label="One" active id="one"></c-swiper-tab>
        <c-swiper-tab value="2" label="Two" id="two"></c-swiper-tab>
        <c-swiper-tab value="3" label="Three" id="three"></c-swiper-tab>
        <c-swiper-tab value="4" label="Four" disabled id="four"></c-swiper-tab>
        <c-swiper-tab value="5" label="Five" id="five"></c-swiper-tab>
      </c-swiper>
      `,
    });

    expect(page.root).toMatchSnapshot();
  });
});
