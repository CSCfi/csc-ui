import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';
import { basicData, basicHeaders } from './data';
import { Viewport } from 'puppeteer';
import { takeScreenshot } from '../../../utils/test/takeScreenshot';

describe('c-data-table', () => {
  let page: E2EPage;

  let table: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({ html: `<c-data-table></c-data-table>` });
    table = await page.find('c-data-table');
  });

  it('renders correctly', async () => {
    expect(table).toHaveClass('hydrated');

    await takeScreenshot(page);
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

    await takeScreenshot(page);

    expect(await additionalDataRow.isVisible()).toBe(false);

    await parentRow.click();

    await page.waitForChanges();

    expect(await additionalDataRow.isVisible()).toBe(true);

    expect(additionalDataRow).toMatchSnapshot();

    await takeScreenshot(page, 'Expanded');
  });

  it('displays single row at a time', async () => {
    const headers = JSON.parse(JSON.stringify(basicHeaders));
    headers[2].hidden = true;

    table.setProperty('headers', headers);
    table.setProperty('data', basicData);
    table.setProperty('singleExpansion', true);

    await page.waitForChanges();

    const parentRows = await page.findAll('c-data-table >>> tr.parent');
    const additionalDataRows = await page.findAll(
      'c-data-table >>> tr.additional-data',
    );

    await takeScreenshot(page);

    await parentRows[0].click();

    await page.waitForChanges();

    await parentRows[1].click();

    await page.waitForChanges();

    await takeScreenshot(page, 'Expanded');

    expect(await additionalDataRows[0].isVisible()).toBe(false);
    expect(await additionalDataRows[1].isVisible()).toBe(true);

    expect(additionalDataRows).toMatchSnapshot();
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

    const checkBoxes = await page.findAll('c-data-table >>> tbody c-checkbox');
    const headerCheckBox = await page.find('c-data-table >>> thead c-checkbox');

    await headerCheckBox.click();

    await page.waitForChanges();

    await takeScreenshot(page);

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

    await takeScreenshot(page, 'Deselected');

    expect(countOfSelectedRows).toEqual(0);

    await checkBoxes[0].click();
    await checkBoxes[1].click();

    await page.waitForChanges();

    countOfSelectedRows = await page.$$eval(
      'c-data-table >>> tr.selected',
      (rows: HTMLTableRowElement[]) => {
        return rows.length;
      },
    );
    expect(countOfSelectedRows).toEqual(2);

    await takeScreenshot(page, 'Two selected');

    await table.callMethod('clearSelections');

    await page.waitForChanges();

    countOfSelectedRows = await page.$$eval(
      'c-data-table >>> tr.selected',
      (rows: HTMLTableRowElement[]) => {
        return rows.length;
      },
    );

    await takeScreenshot(page, 'Cleared');

    expect(countOfSelectedRows).toEqual(0);
  });

  it('forces single selection', async () => {
    table.setProperty('selectable', true);
    table.setProperty('singleSelection', true);
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

    const checkBoxes = await page.findAll('c-data-table >>> tbody c-checkbox');
    const headerCheckBox = await page.find('c-data-table >>> thead c-checkbox');

    expect(headerCheckBox).toBeNull();

    await checkBoxes[0].click();
    await checkBoxes[1].click();

    await page.waitForChanges();

    await takeScreenshot(page, 'Single selection');

    countOfSelectedRows = await page.$$eval(
      'c-data-table >>> tr.selected',
      (rows: HTMLTableRowElement[]) => {
        return rows.length;
      },
    );
    expect(countOfSelectedRows).toEqual(1);
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

    await takeScreenshot(page);
  });
});
