import { newSpecPage } from '@stencil/core/testing';
import { CIconButton } from '../c-icon-button';

describe('c-icon-button', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CIconButton],
      html: `<c-icon-button></c-icon-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders badge', async () => {
    const page = await newSpecPage({
      components: [CIconButton],
      html: `<c-icon-button badge="10"></c-icon-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders disabled icon', async () => {
    const page = await newSpecPage({
      components: [CIconButton],
      html: `<c-icon-button disabled=${true}></c-icon-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders ghosted icon', async () => {
    const page = await newSpecPage({
      components: [CIconButton],
      html: `<c-icon-button ghost=${true}></c-icon-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders inverted icon', async () => {
    const page = await newSpecPage({
      components: [CIconButton],
      html: `<c-icon-button inverted=${true}></c-icon-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders outlined icon', async () => {
    const page = await newSpecPage({
      components: [CIconButton],
      html: `<c-icon-button outlined=${true}></c-icon-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders path to svg-icon', async () => {
    const page = await newSpecPage({
      components: [CIconButton],
      html: `<c-icon-button path="path-to-svg"></c-icon-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders size:small', async () => {
    const page = await newSpecPage({
      components: [CIconButton],
      html: `<c-icon-button path="path-to-svg" size="small"></c-icon-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders size:x-small', async () => {
    const page = await newSpecPage({
      components: [CIconButton],
      html: `<c-icon-button path="path-to-svg" size="x-small"></c-icon-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders size:default', async () => {
    const page = await newSpecPage({
      components: [CIconButton],
      html: `<c-icon-button path="path-to-svg" size="default"></c-icon-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders text variant for the button', async () => {
    const page = await newSpecPage({
      components: [CIconButton],
      html: `<c-icon-button text=${true}></c-icon-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
