import { newE2EPage } from '@stencil/core/testing';
import { items } from './items';

describe('c-select', () => {
  it('renders correctly', async () => {
    const page = await newE2EPage({
      html: `
      <c-select
      label="Your favorite fruit"
      placeholder="Select a fruit"
      return-value>
      </c-select>`,
    });

    const select = await page.find('c-select');
    select.setProperty('items', items);
    select.setProperty('hint', 'This is a hint!');

    await page.waitForChanges();

    const itemList = await page.find('c-select >>> ul');
    let expansionCheck = itemList.getAttribute('aria-expanded');
    expect(expansionCheck).toBe('false');

    select.click();

    await page.waitForChanges();

    expansionCheck = itemList.getAttribute('aria-expanded');
    expect(expansionCheck).toBe('true');

    //expect(page).toMatchSnapshot();
  });
});
