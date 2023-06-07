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

  it('make tag active on click', async () => {
    const page = await newSpecPage({
      components: [CTag],
      html: `
      <c-tag active=${false}></c-tag>`,
    });
    expect(page.root).toMatchSnapshot();

    const tagToggle = page.root.shadowRoot.querySelector(
      '.c-tag',
    ) as HTMLElement;

    tagToggle.click();

    await page.waitForChanges();

    expect(page.root).toMatchSnapshot();
  });
});
