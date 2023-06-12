import { newSpecPage } from '@stencil/core/testing';
import { CTag } from '../c-tag';

describe('c-tag', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CTag],
      html: `<c-tag></c-tag>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders active tag', async () => {
    const page = await newSpecPage({
      components: [CTag],
      html: `
      <c-tag active=${true}></c-tag>

      <c-tag active=${true}></c-tag>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders badge', async () => {
    const page = await newSpecPage({
      components: [CTag],
      html: `<c-tag badge="2"></c-tag>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders closeable tag', async () => {
    const page = await newSpecPage({
      components: [CTag],
      html: `<c-tag closeable=${true}></c-tag>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders fit tag', async () => {
    const page = await newSpecPage({
      components: [CTag],
      html: `<c-tag fit=${true}></c-tag>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders flat tag', async () => {
    const page = await newSpecPage({
      components: [CTag],
      html: `<c-tag flat=${true}></c-tag>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
