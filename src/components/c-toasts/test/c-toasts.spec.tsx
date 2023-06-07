import { newSpecPage } from '@stencil/core/testing';
import { CToasts } from '../c-toasts';

describe('c-toasts', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CToasts],
      html: `<c-toasts></c-toasts>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders absolute positioning', async () => {
    const page = await newSpecPage({
      components: [CToasts],
      html: `<c-toasts absolute=${true}></c-toasts>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders horizontal positioning: left', async () => {
    const page = await newSpecPage({
      components: [CToasts],
      html: `<c-toasts horizontal="left"></c-toasts>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders horizontal positioning: center', async () => {
    const page = await newSpecPage({
      components: [CToasts],
      html: `<c-toasts horizontal="center"></c-toasts>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders horizontal positioning: right', async () => {
    const page = await newSpecPage({
      components: [CToasts],
      html: `<c-toasts horizontal="right"></c-toasts>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders vertical positioning: bottom', async () => {
    const page = await newSpecPage({
      components: [CToasts],
      html: `<c-toasts vertical="bottom" horizontal="right"></c-toasts>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders horizontal positioning: right', async () => {
    const page = await newSpecPage({
      components: [CToasts],
      html: `<c-toasts horizontal="left" vertical="top"></c-toasts>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
