import { newE2EPage } from '@stencil/core/testing';
import { sleep } from '../../../utils/test/sleep';

describe('c-checkbox', () => {
  it('reacts to value change', async () => {
    const page = await newE2EPage({
      html: `<c-checkbox></c-checkbox>`,
    });

    let checkMark = await page.find('c-checkbox >>> svg path');
    expect(checkMark).toBe(null);

    const checkbox = await page.find('c-checkbox');

    checkbox.setProperty('value', true);

    await page.waitForChanges();

    checkMark = await page.find('c-checkbox >>> svg path');

    expect(checkMark).not.toBe(null);
  });

  it('changes value on click', async () => {
    const page = await newE2EPage({
      html: `<c-checkbox></c-checkbox>`,
    });

    let checkMark = await page.find('c-checkbox >>> svg path');
    expect(checkMark).toBe(null);

    const checkbox = await page.find('c-checkbox');

    await checkbox.click();

    await page.waitForChanges();

    checkMark = await page.find('c-checkbox >>> svg path');

    expect(checkMark).not.toBe(null);

    await checkbox.click();

    await page.waitForChanges();

    checkMark = await page.find('c-checkbox >>> svg path');

    expect(checkMark).toBe(null);
  });

  it('can not be checked when disabled', async () => {
    const page = await newE2EPage({
      html: `<c-checkbox></c-checkbox>`,
    });

    let checkMark = await page.find('c-checkbox >>> svg path');
    expect(checkMark).toBe(null);

    const checkbox = await page.find('c-checkbox');

    checkbox.setProperty('disabled', true);

    await page.waitForChanges();

    await checkbox.click();

    await page.waitForChanges();

    checkMark = await page.find('c-checkbox >>> svg path');

    expect(checkMark).toBe(null);
  });

  it('renders required message', async () => {
    const page = await newE2EPage({
      html: `<c-checkbox validation="Required field"></c-checkbox>`,
    });

    let errorMessage = await page.find(
      'c-checkbox >>> .c-checkbox__message--error',
    );
    expect(errorMessage).toBe(null);

    const checkbox = await page.find('c-checkbox');

    checkbox.setProperty('valid', false);

    await page.waitForChanges();

    await sleep(200);

    errorMessage = await page.find(
      'c-checkbox >>> .c-checkbox__message--error',
    );

    expect(errorMessage.innerText).toContain('Required field');
  });
});
