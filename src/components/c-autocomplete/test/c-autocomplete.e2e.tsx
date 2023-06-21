import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { takeScreenshot } from '../../../utils/test/takeScreenshot';

describe('c-autocomplete', () => {
  let page: E2EPage;

  let autocomplete: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({
      html: `<c-autocomplete label="Autocomplete"></c-autocomplete>`,
    });
    autocomplete = await page.find('c-autocomplete');
  });

  it('renders correctly', async () => {
    expect(autocomplete).toHaveClass('hydrated');

    await takeScreenshot(page);
  });

  it('displays given items correctly', async () => {
    const items = [
      { name: 'Koskinen', value: 'koskinen' },
      { name: 'Kairinen', value: 'kairinen' },
    ];
    autocomplete.setProperty('items', items);

    const queryChange = await autocomplete.spyOnEvent('changeQuery');

    await page.waitForChanges();

    const input = await page.find('c-autocomplete >>> input');

    await input.click();

    await page.keyboard.type('nen');

    await page.waitForChanges();

    const renderedItems = (await page.find('c-autocomplete >>> ul'))
      .textContent;

    expect(renderedItems).toMatchSnapshot();
    expect(queryChange.events.length).toBe(3);

    await takeScreenshot(page);
  });
});
