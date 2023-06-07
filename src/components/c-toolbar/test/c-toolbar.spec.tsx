import { newSpecPage } from '@stencil/core/testing';
import { CToolbar } from '../c-toolbar';

describe('c-toolbar', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CToolbar],
      html: `<c-toolbar></c-toolbar>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
