import { newE2EPage } from '@stencil/core/testing';
import { items } from './items';
import { sleep } from '../../../utils/test/sleep';

declare global {
  interface Window {
    IntersectionObserver: unknown;
  }
}

describe('c-select', () => {
  beforeAll(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.IntersectionObserver = class IntersectionObserver {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      constructor() {}

      disconnect() {
        return null;
      }

      observe() {
        return null;
      }

      takeRecords() {
        return null;
      }

      unobserve() {
        return null;
      }
    };
  });

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

  it('renders disabled', async () => {
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

    select.setProperty('disabled', true);

    await page.waitForChanges();

    select.click();

    await page.waitForChanges();

    expansionCheck = itemList.getAttribute('aria-expanded');
    expect(expansionCheck).toBe('false');

    //expect(page).toMatchSnapshot();
  });

  it('renders required message', async () => {
    const page = await newE2EPage({
      html: `
      <c-select
      label="Your favorite fruit"
      placeholder="Select a fruit"
      validation="Required field"
      return-value>
      </c-select>`,
    });

    const select = await page.find('c-select');
    select.setProperty('items', items);
    select.setProperty('valid', false);

    await page.waitForChanges();

    await sleep(200);

    const errorMessage = await page.find(
      'c-select >>> .c-input__message--error',
    );

    expect(errorMessage.innerText).toContain('Required field');
  });
});
