import { newE2EPage } from '@stencil/core/testing';

describe('c-tab-buttons', () => {
  it('basic  interaction test: clicking buttons active and non-active', async () => {
    const page = await newE2EPage({
      html: `
      <c-tab-buttons>
      <c-button>One</c-button>
      <c-button>Two</c-button>
      <c-button>Three</c-button>
      </c-tab-buttons>
      `,
    });
    const tab = await page.find('c-tab-buttons');
    tab.setProperty('value', 0);

    const buttons = await page.findAll('c-button');
    expect(buttons[0]).toHaveClass('c-button--active');

    buttons[0].click();

    await page.waitForChanges();

    expect(buttons[0]).not.toHaveClass('c-button--active');
  });

  it('one selection is mandatory', async () => {
    const page = await newE2EPage({
      html: `
      <c-tab-buttons>
      <c-button>One</c-button>
      <c-button>Two</c-button>
      <c-button>Three</c-button>
      </c-tab-buttons>
      `,
    });

    // FIRST - check that if user presses active button again, it will turn not-active

    let tab = await page.find('c-tab-buttons');
    tab.setProperty('value', 0);

    await page.waitForChanges();

    let activeButtons = await page.findAll('.c-button--active');
    expect(activeButtons.length).toBe(1);

    let buttons = await page.findAll('c-button');
    expect(buttons.length).toBe(3);

    // click active button, expecting it to turn it non-active
    await buttons[0].click();
    await page.waitForChanges();

    activeButtons = await page.findAll('.c-button--active');
    expect(activeButtons.length).toBe(0);

    // click again, expect to turn active again
    await buttons[0].click();

    activeButtons = await page.findAll('.c-button--active');
    expect(activeButtons.length).toBe(1);

    // SECOND - add attribute to parent element that forces one selection to be active at all times

    tab = await page.find('c-tab-buttons');
    tab.setProperty('mandatory', true);

    await page.waitForChanges();

    activeButtons = await page.findAll('.c-button--active');
    expect(activeButtons.length).toBe(1);

    // click active button, expect 'nothing to happen'
    buttons = await page.findAll('c-button');
    await buttons[0].click();

    await page.waitForChanges();

    activeButtons = await page.findAll('.c-button--active');
    expect(activeButtons.length).toBe(1);

    // click another button, expect the active button to change
    await buttons[2].click();

    activeButtons = await page.findAll('.c-button--active');
    expect(activeButtons.length).toBe(1);

    expect(buttons[2]).toHaveClass('c-button--active');

    // click again, expect 'nothing to happen'
    await buttons[2].click();

    await page.waitForChanges();

    activeButtons = await page.findAll('.c-button--active');

    expect(activeButtons.length).toBe(1);
  });

  it('interaction disabled', async () => {
    const page = await newE2EPage({
      html: `
      <c-tab-buttons>
      <c-button>One</c-button>
      <c-button>Two</c-button>
      <c-button>Three</c-button>
      </c-tab-buttons>
      `,
    });

    // set the disabled-class to parent
    const tab = await page.find('c-tab-buttons');
    tab.setAttribute('disabled', true);
    tab.setProperty('value', 0);

    await page.waitForChanges();

    // make first button active, but when user tries to interact, it stays active
    const buttons = await page.findAll('c-button');
    expect(buttons[0]).toHaveClass('c-button--active');

    buttons[0].click();

    await page.waitForChanges();

    expect(buttons[0]).toHaveClass('c-button--active');

    // make two others not-active, and they don't turn active when user tries to interact

    buttons[1].click();

    await page.waitForChanges();

    expect(buttons[1]).not.toHaveClass('c-button--active');

    buttons[2].click();

    await page.waitForChanges();

    expect(buttons[2]).not.toHaveClass('c-button--active');
  });
});
