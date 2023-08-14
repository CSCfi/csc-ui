import { newSpecPage } from '@stencil/core/testing';
import { CContainer } from '../c-container';

describe('c-container', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CContainer],
      html: `<c-container>
      </c-container>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders custom width', async () => {
    const page = await newSpecPage({
      components: [CContainer],
      html: `<c-container width="500">
      </c-container>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
