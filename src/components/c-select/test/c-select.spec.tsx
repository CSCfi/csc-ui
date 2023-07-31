import { newSpecPage } from '@stencil/core/testing';
import { CSelect } from '../c-select';
import { h } from '@stencil/core';
import { items } from './items';

describe('c-select', () => {
  it('renders shadow variant', async () => {
    const page = await newSpecPage({
      components: [CSelect],
      template: () => (
        <c-select
          items={items}
          shadow
          placeholder="Select a fruit"
          label="Your favorite fruit"
        ></c-select>
      ),
    });

    expect(page.root).toMatchSnapshot();
  });
});
