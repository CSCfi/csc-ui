import { newE2EPage } from '@stencil/core/testing';
import { CPaginationOptions } from '../../../types';

describe('c-pagination', () => {
  it('renders correctly', async () => {
    const page = await newE2EPage({
      html: `<c-pagination></c-pagination>`,
    });

    const options: CPaginationOptions = {
      itemCount: 100,
      currentPage: 1,
      itemsPerPage: 25,
    };

    const pagination = await page.find('c-pagination');
    pagination.setProperty('value', options);

    await page.waitForChanges();

    let paginationButtons = await page.findAll('c-pagination >>> ul li');
    expect(paginationButtons.length).toBe(6);

    options.itemCount = 200;

    pagination.setProperty('value', options);
    await page.waitForChanges();

    paginationButtons = await page.findAll('c-pagination >>> ul li');
    expect(paginationButtons.length).toBe(9);

    options.itemsPerPage = 100;
    pagination.setProperty('value', options);
    await page.waitForChanges();

    paginationButtons = await page.findAll('c-pagination >>> ul li');
    expect(paginationButtons.length).toBe(4);
  });

  it('reacts to page change', async () => {
    const page = await newE2EPage({
      html: `<c-pagination></c-pagination>`,
    });

    const options: CPaginationOptions = {
      itemCount: 100,
      currentPage: 1,
      itemsPerPage: 25,
    };

    const pagination = await page.find('c-pagination');
    pagination.setProperty('value', options);

    await page.waitForChanges();

    const paginationButtons = await page.findAll('c-pagination >>> ul li');
    await paginationButtons[4].click();

    await page.waitForChanges();

    const range = await page.find(
      'c-pagination >>> div.c-pagination__details > span',
    );

    expect(range.innerText).toContain('76 - 100 of 100 items');
  });
});
