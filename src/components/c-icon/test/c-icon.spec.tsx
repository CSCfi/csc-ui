import { newSpecPage } from '@stencil/core/testing';
import { CIcon } from '../c-icon';

describe('c-icon', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CIcon],
      html: `<c-icon path="path-to-my-svg" color="blue" size="30"></c-icon>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
