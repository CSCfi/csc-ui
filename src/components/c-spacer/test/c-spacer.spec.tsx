import { newSpecPage } from '@stencil/core/testing';
import { CSpacer } from '../c-spacer';

describe('c-spacer', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CSpacer],
      html: `<c-spacer></c-spacer>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
