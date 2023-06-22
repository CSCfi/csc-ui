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

  it('renders hint message', async () => {
    const page = await newSpecPage({
      components: [CCheckbox],
      html: `<c-checkbox hint="Check this out"></c-checkbox>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('hides hint message', async () => {
    const page = await newSpecPage({
      components: [CCheckbox],
      html: `<c-checkbox hide-details hint="Check this out"></c-checkbox>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('render indeterminate', async () => {
    const page = await newSpecPage({
      components: [CCheckbox],
      html: `<c-checkbox indeterminate=${true}></c-checkbox>`,
    });

    expect(page.root).toMatchSnapshot();
  });

  it('renders label', async () => {
    const page = await newSpecPage({
      components: [CCheckbox],
      html: `<c-checkbox label="This is a label"></c-checkbox>`,
    });

    expect(page.root).toMatchSnapshot();
  });
});
