import { E2EPage, newE2EPage } from '@stencil/core/testing';
import { takeScreenshot } from '../../../utils/test/takeScreenshot';

describe('c-steps', () => {
  let page: E2EPage;

  beforeEach(async () => {
    page = await newE2EPage({
      html: `
    <c-steps>
        <c-step>Step 1</c-step>
        <c-step>Step 2</c-step>
        <c-step>Step 3</c-step>
    </c-steps>`,
    });
  });

  it('renders correctly', async () => {
    const steps = await page.find('c-steps');

    expect(steps).toHaveClass('hydrated');
  });

  it('renders completed steps', async () => {
    let completedSteps = await page.findAll('c-step >>> .c-step--complete');
    expect(completedSteps.length).toBe(0);

    await takeScreenshot(page);

    const steps = await page.find('c-steps');

    steps.setProperty('value', 3);

    await page.waitForChanges();

    completedSteps = await page.findAll('c-step >>> .c-step--complete');
    expect(completedSteps.length).toBe(2);

    await takeScreenshot(page, 'Completed steps');

    steps.setProperty('value', 2);

    await page.waitForChanges();

    completedSteps = await page.findAll('c-step >>> .c-step--complete');
    expect(completedSteps.length).toBe(1);
  });
});
