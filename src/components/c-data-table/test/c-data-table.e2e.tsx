import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { basicData, basicHeaders } from './data';

describe('c-data-table', () => {
  let page: E2EPage;

  let table: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({ html: `<c-data-table></c-data-table>` });
    table = await page.find('c-data-table');
  });

  it('renders correctly', async () => {
    expect(table).toHaveClass('hydrated');
  });

  it('displays hidden data on row click', async () => {
    const headers = JSON.parse(JSON.stringify(basicHeaders));
    headers[2].hidden = true;

    table.setProperty('headers', headers);
    table.setProperty('data', basicData);

    await page.waitForChanges();

    const parentRow = await page.find('c-data-table >>> tr.parent');
    const additionalDataRow = await page.find(
      'c-data-table >>> tr.additional-data',
    );

    expect(await additionalDataRow.isVisible()).toBe(false);

    await parentRow.click();

    await page.waitForChanges();

    expect(await additionalDataRow.isVisible()).toBe(true);
  });
});
