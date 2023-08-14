import { newSpecPage } from '@stencil/core/testing';
import { CModal } from '../c-modal';

describe('c-modal', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CModal],
      html: `<c-modal></c-modal>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders custom width', async () => {
    const page = await newSpecPage({
      components: [CModal],
      html: `<c-modal width="800"></c-modal>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders hidden slot content', async () => {
    const page = await newSpecPage({
      components: [CModal],
      html: `<c-modal><p>Test</p></c-modal>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders visible slot content', async () => {
    const page = await newSpecPage({
      components: [CModal],
      html: `
        <c-modal value={true}>
          <p>Test</p>
        </c-modal>
      `,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders with custom z-index', async () => {
    const page = await newSpecPage({
      components: [CModal],
      html: `
        <c-modal z-index="30"></c-modal>
      `,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('does not close when clicked outside the area if not dismissable', async () => {
    const page = await newSpecPage({
      components: [CModal],
      html: `<c-modal value={true}>
          <p>Test</p>
        </c-modal>
      `,
    });
    expect(page.root).toMatchSnapshot();
    const overlay = page.root.shadowRoot.querySelector(
      '.c-overlay',
    ) as HTMLElement;
    overlay.click();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });

  it('closes when clicked outside the area', async () => {
    const page = await newSpecPage({
      components: [CModal],
      html: `
        <c-modal value={true} dismissable={true}>
          <p>Test</p>
        </c-modal>
      `,
    });

    expect(page.root).toMatchSnapshot();

    const overlay = page.root.shadowRoot.querySelector(
      '.c-overlay',
    ) as HTMLElement;

    overlay.click();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });
});
