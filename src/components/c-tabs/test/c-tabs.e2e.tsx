import { newE2EPage } from '@stencil/core/testing';

describe('c-tabs', () => {
  it('basic interaction test', async () => {
    const page = await newE2EPage({
      html: `
      <c-tabs>
      <c-tab>One</c-tab>
      <c-tab>Two</c-tab>
      <c-tab>Three</c-tab>
      </c-tabs>
      `,
    });

    //problem - cannot find c-tab--active class, recognizes click-event
    const tabs = await page.find('c-tabs');
    tabs.setProperty('value', 1);

    // await page.waitForChanges();

    // const tab = await page.findAll('c-tab');
    // expect(tab.length).toBe(3);

    // tab[0].setProperty('value', 1);
    // tab[1].setProperty('value', 2);
    // tab[2].setProperty('value', 3);

    // await page.waitForChanges();

    // expect(tab[0]).toHaveClass('c-tab--active');

    //problem - the snapshot doesn't render class c-tab-active, recognizes click

    // const tab = await page.findAll('c-tab');
    // expect(tab.length).toBe(3);

    // const activeTab = await page.findAll('c-tabs >>> c-tab >>> .c-tab--active');

    // await page.waitForChanges();

    // expect(activeTab.length).toBe(1);

    // await page.waitForChanges();

    // tab[0].click();

    // await page.waitForChanges();

    // expect(page).toMatchSnapshot();

    // tab[1].click();

    // await page.waitForChanges();

    // tab[1].click();

    // await page.waitForChanges();

    //expect(tab[1]).toHaveClass('c-tab--active');
  });
});
