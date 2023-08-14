import { newE2EPage } from '@stencil/core/testing';

describe('c-switch', () => {
  it('reacts to value change', async () => {
    const page = await newE2EPage({
      html: `<c-switch></c-switch>`,
    });

    let checkMark = await page.find('c-switch >>> input');
    expect(checkMark).not.toHaveAttribute('aria-checked');

    const slider = await page.find('c-switch');

    slider.setAttribute('value', true);

    await page.waitForChanges();

    checkMark = await page.find('c-switch >>> input');

    expect(checkMark).toHaveAttribute('aria-checked');
  });

  it('value changes on click', async () => {
    const page = await newE2EPage({
      html: `<c-switch></c-switch>`,
    });

    let checkMark = await page.find('c-switch >>> input');
    expect(checkMark).not.toHaveAttribute('aria-checked');

    const slider = await page.find('c-switch');

    slider.click();

    await page.waitForChanges();

    checkMark = await page.find('c-switch >>> input');

    expect(checkMark).toHaveAttribute('aria-checked');
  });

  it('can not be clicked when disabled', async () => {
    const page = await newE2EPage({
      html: `<c-switch></c-switch>`,
    });

    let checkMark = await page.find('c-switch >>> input');
    expect(checkMark).not.toHaveAttribute('aria-checked');

    const slider = await page.find('c-switch');

    slider.setAttribute('disabled', true);

    await page.waitForChanges();

    slider.click();

    await page.waitForChanges();

    checkMark = await page.find('c-switch >>> input');

    expect(checkMark).not.toHaveAttribute('aria-checked');
  });

  it('require selection', async () => {
    const page = await newE2EPage({
      html: `<c-switch>Required</c-switch>`,
    });

    const slider = await page.find('c-switch');
    slider.setProperty('required', true);

    await page.waitForChanges();

    expect(slider.innerText).toContain('Required');
  });
});
