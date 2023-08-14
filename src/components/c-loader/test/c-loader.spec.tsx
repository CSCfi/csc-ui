import { newSpecPage } from '@stencil/core/testing';
import { CLoader } from '../c-loader';

describe('c-loader', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CLoader],
      html: `<c-loader></c-loader>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders hidden loader', async () => {
    const page = await newSpecPage({
      components: [CLoader],
      html: `<c-loader hide=${true}>
      </c-loader>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders custom size', async () => {
    const page = await newSpecPage({
      components: [CLoader],
      html: `<c-loader size="30">
      </c-loader>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
