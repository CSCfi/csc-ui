import { newSpecPage } from '@stencil/core/testing';
import { CTextField } from '../c-text-field';

describe('c-text-field', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CTextField],
      html: `<c-text-field value="Here is text"></c-text-field>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
