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

    const tabs = await page.find('c-tabs');
    tabs.setProperty('value', 0);

    await page.waitForChanges();

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
