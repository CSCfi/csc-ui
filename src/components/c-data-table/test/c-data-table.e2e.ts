import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { basicData, basicHeaders } from './data';
import { Viewport } from 'puppeteer';

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

    expect(additionalDataRow).toMatchSnapshot();
  });

  it('allows row selection', async () => {
    table.setProperty('selectable', true);
    table.setProperty('headers', basicHeaders);
    table.setProperty('data', basicData);

    await page.waitForChanges();

    let countOfSelectedRows = await page.$$eval(
      'c-data-table >>> tr.selected',
      (rows: HTMLTableRowElement[]) => {
        return rows.length;
      },
    );

    expect(countOfSelectedRows).toEqual(0);

    const checkBox = await page.find('c-data-table >>> tbody c-checkbox');
    const headerCheckBox = await page.find('c-data-table >>> thead c-checkbox');

    await headerCheckBox.click();

    await page.waitForChanges();

    countOfSelectedRows = await page.$$eval(
      'c-data-table >>> tr.selected',
      (rows: HTMLTableRowElement[]) => {
        return rows.length;
      },
    );

    expect(countOfSelectedRows).toEqual(basicData.length);

    await headerCheckBox.click();

    await page.waitForChanges();

    countOfSelectedRows = await page.$$eval(
      'c-data-table >>> tr.selected',
      (rows: HTMLTableRowElement[]) => {
        return rows.length;
      },
    );

    expect(countOfSelectedRows).toEqual(0);

    await checkBox.click();

    await page.waitForChanges();

    countOfSelectedRows = await page.$$eval(
      'c-data-table >>> tr.selected',
      (rows: HTMLTableRowElement[]) => {
        return rows.length;
      },
    );
    expect(countOfSelectedRows).toEqual(1);

    await table.callMethod('clearSelections');

    await page.waitForChanges();

    countOfSelectedRows = await page.$$eval(
      'c-data-table >>> tr.selected',
      (rows: HTMLTableRowElement[]) => {
        return rows.length;
      },
    );

    expect(countOfSelectedRows).toEqual(0);
  });

  it('allows pinning columns', async () => {
    const headers = JSON.parse(JSON.stringify(basicHeaders));
    headers[2].pinned = true;

    table.setProperty('headers', headers);
    table.setProperty('data', basicData);

    const viewport: Viewport = { width: 400, height: 600 };
    page.setViewport(viewport);

    await page.waitForChanges();

    expect(table).toMatchSnapshot();
  });
});
