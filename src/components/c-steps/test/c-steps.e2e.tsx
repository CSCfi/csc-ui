import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('c-steps', () => {
  let page: E2EPage;

  let steps: E2EElement;

  beforeEach(async () => {
    page = await newE2EPage({
      html: `
    <c-steps>
        <c-step>Step 1</c-step>
        <c-step>Step 2</c-step>
        <c-step>Step 3</c-step>
    </c-steps>`,
    });
    steps = await page.find('c-steps');
  });

  it('renders correctly', async () => {
    expect(steps).toHaveClass('hydrated');
  });

  it('renders completed steps', async () => {
    let completedSteps = await page.findAll('c-steps >>> c-step--complete');
    expect(completedSteps.length).toBe(0);

    // steps.setProperty('value', 3);
    await page.waitForChanges();

    completedSteps = await page.findAll('c-step');
    expect(completedSteps).toMatchSnapshot();
    expect(completedSteps.length).toBe(2);
  });
});
