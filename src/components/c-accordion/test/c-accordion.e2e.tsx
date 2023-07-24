import { newE2EPage } from '@stencil/core/testing';

describe('c-accordion', () => {
  it('reacts to expansion change', async () => {
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

    const accordion = await page.find('c-accordion');
    expect(accordion).toHaveClass('hydrated');

    const accordionItems = await page.findAll('c-accordion-item');
    accordionItems[0].setProperty('value', 1);
    accordionItems[1].setProperty('value', 2);
    accordionItems[2].setProperty('value', 3);

    await page.waitForChanges();

    accordionItems[1].setProperty('expanded', true);

    await page.waitForChanges();

    const expansionCheck = await page.find('c-accordion-item >>> div');
    expect(expansionCheck).toHaveClass('c-accordion-item--expanded');

    //expect(page).toMatchSnapshot();
  });

  it('reacts to click', async () => {
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

    const accordion = await page.find('c-accordion');
    accordion.setProperty('value', 1);

    await page.waitForChanges();

    const accordionItems = await page.findAll('c-accordion-item');
    accordionItems[0].setProperty('value', 1);
    accordionItems[1].setProperty('value', 2);
    accordionItems[2].setProperty('value', 3);

    await page.waitForChanges();

    accordionItems[1].click();

    await page.waitForChanges();

    expect(page).toMatchSnapshot();
  });

  it('allows multiple expansions', async () => {
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

    let accordion = await page.find('c-accordion');
    accordion.setProperty('value', 1);

    await page.waitForChanges();

    const accordionItems = await page.findAll('c-accordion-item');
    accordionItems[0].setProperty('value', 1);
    accordionItems[1].setProperty('value', 2);
    accordionItems[2].setProperty('value', 3);

    await page.waitForChanges();

    accordion = await page.find('c-accordion');
    accordion.setProperty('multiple', true);
    await page.waitForChanges();

    //problem - expansion doesn't stay when clicking, but stays if property is set
    accordionItems[0].click();
    //accordionItems[0].setProperty('expanded', true);

    await page.waitForChanges();

    accordionItems[1].click();
    //accordionItems[1].setProperty('expanded', true);

    await page.waitForChanges();

    expect(page).toMatchSnapshot();
  });

  it('mandatory one selection required', async () => {
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

    const accordion = await page.find('c-accordion');
    accordion.setProperty('value', 1);
    accordion.setProperty('mandatory', true);

    await page.waitForChanges();

    const accordionItems = await page.findAll('c-accordion-item');
    accordionItems[0].setProperty('value', 1);
    accordionItems[1].setProperty('value', 2);
    accordionItems[2].setProperty('value', 3);

    await page.waitForChanges();

    accordionItems[0].click();
    await page.waitForChanges();

    accordionItems[0].click();
    await page.waitForChanges();

    accordionItems[1].click();
    await page.waitForChanges();

    accordionItems[1].click();
    await page.waitForChanges();

    expect(page).toMatchSnapshot();
  });
});
