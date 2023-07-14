import { newE2EPage } from '@stencil/core/testing';

describe('c-accordion', () => {
  it('one selection mandatory', async () => {
    const page = await newE2EPage({
      html: `
    <c-accordion>
        <c-accordion-item>
            <i class="mdi mdi-access-point" slot="icon"></i>
            Lorem ipsum dolor sit amet.
        </c-accordion-item>
        <c-accordion-item>
            <i class="mdi mdi-nas" slot="icon"></i>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Harum, perspiciatis?
        </c-accordion-item>
        <c-accordion-item>
            <i class="mdi mdi-camera" slot="icon"></i>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia voluptatum perspiciatis
            itaque!
        </c-accordion-item>
  </c-accordion>`,
    });

    const accordionItems = await page.findAll('c-accordion > c-accordion-item');

    expect(accordionItems.length).toBe(3);
  });
});
