import { newE2EPage } from '@stencil/core/testing';
import { takeScreenshot } from '../../../utils/test/takeScreenshot';

describe('c-text-field', () => {
  it('renders and responds to the size property', async () => {
    const page = await newE2EPage();

    await page.setContent(
      '<c-text-field label="This is a label"></c-text-field>',
    );

    const element = await page.find('c-text-field');
    expect(element).toHaveClass('hydrated');

    await takeScreenshot(page);
  });
});
