import { newSpecPage } from '@stencil/core/testing';
import { CRadioGroup } from '../c-radio-group';
import { items } from './items';
import { h } from '@stencil/core';

describe('c-radio-group', () => {
  it('renders default html', async () => {
    const page = await newSpecPage({
      components: [CRadioGroup],
      template: () => <c-radio-group items={items}></c-radio-group>,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders custom color and items inlined', async () => {
    const page = await newSpecPage({
      components: [CRadioGroup],
      template: () => (
        <c-radio-group color='red' inline items={items}></c-radio-group>
      ),
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders hint and label', async () => {
    const page = await newSpecPage({
      components: [CRadioGroup],
      template: () => (
        <c-radio-group
          hint='This is hint message'
          label='This is label'
          items={items}
        ></c-radio-group>
      ),
    });

    expect(page.root).toMatchSnapshot();
  });
});
