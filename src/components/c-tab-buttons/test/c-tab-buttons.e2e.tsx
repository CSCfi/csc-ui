import { newE2EPage } from '@stencil/core/testing';

describe('c-tab-buttons', () => {
  it('can not be checked when disabled', async () => {
    const page = await newE2EPage({
      html: `
      <c-tab-buttons>
      <c-button></c-button>
      <c-button></c-button>
      <c-button></c-button>
      </c-tab-buttons>
      `,
    });

    const tabButtons = await page.find('c-tab-buttons');

    tabButtons.setProperty('disabled', true);

    await page.waitForChanges();

    const buttons = await page.findAll('c-button >>> .c-button-active');
    expect(buttons.length).toBe(null);

    // await tabButtons.click();

    // await page.waitForChanges();

    // expect(checkMark).toBe(null);
  });
});
