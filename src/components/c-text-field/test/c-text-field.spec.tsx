import { newSpecPage } from '@stencil/core/testing';
import { CTextField } from '../c-text-field';

describe('c-text-field', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CTextField],
      html: `<c-text-field value="Here is text" label="Label"></c-text-field>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders shadow variant', async () => {
    const page = await newSpecPage({
      components: [CTextField],
      html: `<c-text-field value="Here is text" shadow placeholder="Title"></c-text-field>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders required asterisk', async () => {
    const page = await newSpecPage({
      components: [CTextField],
      html: `<c-text-field value="Here is text" label="Label" required></c-text-field>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders number input', async () => {
    const page = await newSpecPage({
      components: [CTextField],
      html: `<c-text-field label="Label" required type="number" min="1" max="10" hint="Insert number between 1-10" step="1" value="5" ></c-text-field>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
