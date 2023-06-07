import { newSpecPage } from '@stencil/core/testing';
import { CToast } from '../c-toast';

describe('c-toast', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CToast],
      html: `<c-toast></c-toast>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
