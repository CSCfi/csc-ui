import { newSpecPage } from '@stencil/core/testing';
import { CProgressBar } from '../c-progress-bar';

describe('c-progress-bar', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CProgressBar],
      html: `<c-progress-bar></c-progress-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders custom color', async () => {
    const page = await newSpecPage({
      components: [CProgressBar],
      html: `<c-progress-bar color="var(--csc-error)"></c-progress-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('hides percentage display', async () => {
    const page = await newSpecPage({
      components: [CProgressBar],
      html: `<c-progress-bar hide-details=${true}></c-progress-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('make progress indeterminate', async () => {
    const page = await newSpecPage({
      components: [CProgressBar],
      html: `<c-progress-bar indeterminate=${true}></c-progress-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders label-text', async () => {
    const page = await newSpecPage({
      components: [CProgressBar],
      html: `<c-progress-bar label="This is label"></c-progress-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render details next to progress bar', async () => {
    const page = await newSpecPage({
      components: [CProgressBar],
      html: `<c-progress-bar single-line=${true}></c-progress-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders custom value', async () => {
    const page = await newSpecPage({
      components: [CProgressBar],
      html: `<c-progress-bar value="46"></c-progress-bar>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
