import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('c-autocomplete', () => {
  let page: E2EPage;

  let autocomplete: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({ html: `<c-autocomplete></c-autocomplete>` });
    autocomplete = await page.find('c-autocomplete');
  });

  it('renders correctly', async () => {
    expect(autocomplete).toHaveClass('hydrated');
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
  });

  it('displays custom menu', async () => {
    page = await newE2EPage({
      html: `
      <c-autocomplete>
        <div slot="customMenu">
          <span>
            <b>Koskinen</b>
          </span>
          <p>Laitila</p>
        </div>
        <div slot="customMenu">
          <span>
            <b>Kairinen</b>
          </span>
          <p>Turku</p>
        </div>
      </c-autocomplete>`,
    });
    autocomplete = await page.find('c-autocomplete');
    autocomplete.setProperty('customMenu', true);

    await page.waitForChanges();

    const input = await page.find('c-autocomplete >>> input');

    await input.click();

    await page.keyboard.press(' ');

    await page.waitForChanges();

    const items = await page.evaluate(() => {
      const element = document.querySelector('c-autocomplete');

      return (
        element.shadowRoot.querySelector(
          '.c-input-menu__items slot',
        ) as HTMLSlotElement
      ).assignedNodes();
    });

    console.log(items);

    //expect(await items.isVisible()).toBe(true);

    expect(items.length).toBe(2);
  });
});
