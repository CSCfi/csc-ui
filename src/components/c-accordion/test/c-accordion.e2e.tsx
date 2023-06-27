import { newE2EPage } from '@stencil/core/testing';

describe('c-accordion', () => {
  it('disallows collapsing all items', async () => {
    const page = await newE2EPage();

    await page.setContent(`
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
  </c-accordion>`);

    // const expandedItem = await page.find(
    //   'c-accordion >>> c-accordion-item--expanded',
    // );
    // expect(expandedItem).toBe(null);

    // const accordion = await page.find('c-accordion');
    // accordion.setProperty('mandatory', true);
    // accordion.setProperty('value', 'one');

    // await page.waitForChanges();

    const accordionItems = await page.findAll(
      'c-accordion >>> c-accordion-item',
    );

    await page.waitForChanges();

    expect(accordionItems.length).toBe(2);
  });
});