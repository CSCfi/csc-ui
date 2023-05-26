import { newSpecPage } from '@stencil/core/testing';
import { CLink } from '../c-link';

describe('c-link', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CLink],
      html: `<c-link></c-link>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders color: primary', async () => {
    const page = await newSpecPage({
      components: [CLink],
      html: `<c-link color="primary"></c-link>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders custom color', async () => {
    const page = await newSpecPage({
      components: [CLink],
      html: `<c-link color="#fc03e8"></c-link>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders href-value', async () => {
    const page = await newSpecPage({
      components: [CLink],
      html: `<c-link href="www.csc.fi"></c-link>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders icon position', async () => {
    const page = await newSpecPage({
      components: [CLink],
      html: `<c-link icon-after=${true}"></c-link>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders svg icons color', async () => {
    const page = await newSpecPage({
      components: [CLink],
      html: `<c-link icon-fill="warning"></c-link>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders path to svg icon', async () => {
    const page = await newSpecPage({
      components: [CLink],
      html: `<c-link path="path-to-my-svg"></c-link>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('add target-attribute', async () => {
    const page = await newSpecPage({
      components: [CLink],
      html: `<c-link target="_blank"></c-link>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('add underline under the link', async () => {
    const page = await newSpecPage({
      components: [CLink],
      html: `<c-link underline=${true}></c-link>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('custom weight', async () => {
    const page = await newSpecPage({
      components: [CLink],
      html: `<c-link weight="300"></c-link>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
