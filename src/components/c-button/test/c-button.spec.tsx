import { newSpecPage } from '@stencil/core/testing';
import { CButton } from '../c-button';

describe('button', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CButton],
      html: `<c-button>Default</c-button>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
