import { newSpecPage } from '@stencil/core/testing';
import { CCardActions } from '../c-card-actions';

describe('c-card-actions', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CCardActions],
      html: `
      <c-card>
        <c-card-actions>
        </c-card-actions>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('align: end', async () => {
    const page = await newSpecPage({
      components: [CCardActions],
      html: `
      <c-card>
        <c-card-actions align="end">
        </c-card-actions>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('align: start', async () => {
    const page = await newSpecPage({
      components: [CCardActions],
      html: `
      <c-card>
        <c-card-actions align="start">
        </c-card-actions>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('custom align: stretch', async () => {
    const page = await newSpecPage({
      components: [CCardActions],
      html: `
      <c-card>
        <c-card-actions align="stretch">
        </c-card-actions>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('custom align: baseline', async () => {
    const page = await newSpecPage({
      components: [CCardActions],
      html: `
      <c-card>
        <c-card-actions align="baseline">
        </c-card-actions>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('justify: center', async () => {
    const page = await newSpecPage({
      components: [CCardActions],
      html: `
      <c-card>
        <c-card-actions justify="center">
        </c-card-actions>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('justify: end', async () => {
    const page = await newSpecPage({
      components: [CCardActions],
      html: `
      <c-card>
        <c-card-actions justify="end">
        </c-card-actions>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('justify: space-around', async () => {
    const page = await newSpecPage({
      components: [CCardActions],
      html: `
      <c-card>
        <c-card-actions justify="space-around">
        </c-card-actions>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('justify: space-between', async () => {
    const page = await newSpecPage({
      components: [CCardActions],
      html: `
      <c-card>
        <c-card-actions justify="space-between">
        </c-card-actions>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('justify: stretch', async () => {
    const page = await newSpecPage({
      components: [CCardActions],
      html: `
      <c-card>
        <c-card-actions justify="stretch">
        </c-card-actions>
      </c-card>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
