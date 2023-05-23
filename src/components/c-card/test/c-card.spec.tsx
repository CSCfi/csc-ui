import { newSpecPage } from '@stencil/core/testing';
import { CCard } from '../c-card';

describe('c-card', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card></c-card`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render custom background-color', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card background-color="red"></c-card`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render chosen background-photo, called allas', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card background="allas"></c-card`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render another chosen background-photo, called mahti', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card background="mahti"></c-card`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render custom background-photo', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card background="dog"></c-card`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('with fullscreen button', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card fullscreen={true}></c-card`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('opens fullscreen when button pressed', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card fullscreen={true}></c-card`,
    });

    expect(page.root).toMatchSnapshot();

    const iconbutton = page.root.shadowRoot.querySelector(
      '.c-card__fullscreen-toggle',
    ) as HTMLElement;

    iconbutton.click();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  it('shrinks back to normal when button pressed in fullscreen-mode', async () => {
    const page = await newSpecPage({
      components: [CCard],
      html: `<c-card fullscreen={true}></c-card`,
    });

    expect(page.root).toMatchSnapshot();

    const iconbutton = page.root.shadowRoot.querySelector(
      '.c-card__fullscreen-toggle',
    ) as HTMLElement;

    iconbutton.click();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();

    iconbutton.click();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });
});
