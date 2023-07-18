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

    await page.waitForChanges();

    const radioItems = await page.findAll('c-radio-group >>> label');
    expect(radioItems.length).toBe(3);

    await page.waitForChanges();

    //const selection = radioItems[1].getAttribute('aria-checked');
    //expect(selection).toBe(false);

    //radioGroup.setProperty('disabled', true);
  });
});
