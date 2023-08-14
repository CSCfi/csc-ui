import { newSpecPage } from '@stencil/core/testing';
import { CFlex } from '../c-flex';

describe('c-flex', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CFlex],
      html: `<c-flex><div><p>Hello world!</p></div></c-flex>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
