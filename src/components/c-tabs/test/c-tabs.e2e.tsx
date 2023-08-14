import { newE2EPage } from '@stencil/core/testing';

describe('c-tabs', () => {
  it('reacts to value change', async () => {
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
    tabs.setProperty('value', 1);

    const tabItems = await page.findAll('c-tab');
    expect(tabItems.length).toBe(3);

    tabItems[0].setProperty('value', 1);
    tabItems[1].setProperty('value', 2);
    tabItems[2].setProperty('value', 3);

    await page.waitForChanges();

    tabItems[2].setAttribute('active', true);

    await page.waitForChanges();

    //expect(page).toMatchSnapshot();
    expect(tabItems[2]).toHaveClass('c-tab--active');
  });

  it('reacts to value change on click', async () => {
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
    tabs.setProperty('value', 1);

    const tabItems = await page.findAll('c-tab');
    expect(tabItems.length).toBe(3);

    tabItems[0].setProperty('value', 1);
    tabItems[1].setProperty('value', 2);
    tabItems[2].setProperty('value', 3);

    await page.waitForChanges();

    tabItems[2].click();

    await page.waitForChanges();

    //expect(page).toMatchSnapshot();
    expect(tabItems[2]).toHaveClass('c-tab--active');
  });

  it('renders disabled', async () => {
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
    tabs.setProperty('value', 1);

    const tabItems = await page.findAll('c-tab');
    expect(tabItems.length).toBe(3);

    tabItems[0].setProperty('value', 1);
    tabItems[1].setProperty('value', 2);
    tabItems[2].setProperty('value', 3);

    await page.waitForChanges();

    tabItems[2].click();

    await page.waitForChanges();

    //expect(page).toMatchSnapshot();
    expect(tabItems[2]).toHaveClass('c-tab--active');

    tabItems[1].setProperty('disabled', true);

    tabItems[1].click();

    await page.waitForChanges();

    expect(tabItems[1]).not.toHaveClass('c-tab--active');
  });
});
