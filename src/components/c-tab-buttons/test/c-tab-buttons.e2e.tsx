import { newE2EPage } from '@stencil/core/testing';

describe('c-tab-buttons', () => {
  it('one selection is mandatory', async () => {
    const page = await newE2EPage({
      html: `
      <c-tab-buttons>
      <c-button>One</c-button>
      <c-button>Two</c-button>
      <c-button>Three</c-button>
      </c-tab-buttons>
      `,
    });

    const tab = await page.find('c-tab-button');
    tab.setProperty('value', 0);

    await page.waitForChanges();

    const buttons = await page.findAll('c-button');
    let activeButtons = await page.findAll('.c-button--active');

    expect(activeButtons.length).toBe(1);

    await buttons[0].click();

    await page.waitForChanges();

    activeButtons = await page.findAll('.c-button--active');

    expect(activeButtons.length).toBe(0);

    //expect(page).toMatchSnapshot();

    // tabButtons = await page.find('c-tab-buttons');
    // tabButtons.setProperty('mandatory', true);

    // await page.waitForChanges();

    // buttons = await page.findAll('c-button');

    // await buttons[1].click();

    // await page.waitForChanges();

    // expect(page).toMatchSnapshot();

    // await buttons[1].click();

    // await page.waitForChanges();

    // expect(page).toMatchSnapshot();
  });
});
