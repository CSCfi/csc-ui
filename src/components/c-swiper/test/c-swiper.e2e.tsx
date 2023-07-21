import { newE2EPage } from '@stencil/core/testing';

describe('c-swiper', () => {
  it('reacts to value change', async () => {
    const page = await newE2EPage({
      html: `<c-swiper>
      <c-swiper-tab>One</c-swiper-tab>
      <c-swiper-tab>Two</c-swiper-tab>
      <c-swiper-tab>Three</c-swiper-tab>
      <c-swiper-tab>Four</c-swiper-tab>
      <c-swiper-tab>Five</c-swiper-tab>
      </c-swiper>`,
    });

    const swiper = await page.find('c-swiper');
    swiper.setProperty('value', 1);
  });
});
