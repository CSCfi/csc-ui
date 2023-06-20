import { newSpecPage } from '@stencil/core/testing';
import { CSteps } from '../c-steps';
import { CStep } from '../../c-step/c-step';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

describe('c-steps', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CSteps],
      html: `<c-steps></c-steps>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders steps', async () => {
    const page = await newSpecPage({
      components: [CSteps, CStep],
      html: `
      <c-steps>
        <c-step></c-step>
        <c-step></c-step>
        <c-step></c-step>
      </c-steps>
      `,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders steps with value of current step', async () => {
    const page = await newSpecPage({
      components: [CSteps, CStep],
      html: `
      <c-steps value="2">
        <c-step></c-step>
        <c-step></c-step>
        <c-step></c-step>
      </c-steps>
      `,
    });

    expect(page.root).toMatchSnapshot();
  });
});
