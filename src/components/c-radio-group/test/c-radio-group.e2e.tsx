import { newE2EPage } from '@stencil/core/testing';
import { items } from './items';

describe('c-radio-group', () => {
  it('renders correctly', async () => {
    const page = await newE2EPage({
      html: `<c-radio-group></c-radio-group>`,
    });

    const radioGroup = await page.find('c-radio-group');
    radioGroup.setProperty('items', items);

    await page.waitForChanges();

    expect(page).toMatchSnapshot();
  });

  it('renders disabled', async () => {
    const page = await newE2EPage({
      html: `<c-radio-group></c-radio-group>`,
    });

    const radioGroup = await page.find('c-radio-group');
    radioGroup.setProperty('items', items);
    radioGroup.setProperty('disabled', true);

    await page.waitForChanges();

    const div = await page.find('c-radio-group >>> div');
    expect(div).toHaveClass('c-radio-group--disabled');
  });
});
