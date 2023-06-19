import { newSpecPage } from '@stencil/core/testing';
import { CCheckbox } from '../c-checkbox';

describe('c-checkbox', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CCheckbox],
      html: `<c-checkbox></c-checkbox>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
