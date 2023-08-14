import { newSpecPage } from '@stencil/core/testing';
import { CSwitch } from '../c-switch';

describe('c-switch', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CSwitch],
      html: `<c-switch></c-switch>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders disabled switch', async () => {
    const page = await newSpecPage({
      components: [CSwitch],
      html: `<c-switch disabled=${true}></c-switch>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders id-attribute', async () => {
    const page = await newSpecPage({
      components: [CSwitch],
      html: `<c-switch id="switching"></c-switch>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('set as required', async () => {
    const page = await newSpecPage({
      components: [CSwitch],
      html: `<c-switch required=${true}></c-switch>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('set value', async () => {
    const page = await newSpecPage({
      components: [CSwitch],
      html: `<c-switch value=${true}></c-switch>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
