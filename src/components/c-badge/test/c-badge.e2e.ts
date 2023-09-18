import { newE2EPage } from '@stencil/core/testing';

describe('c-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<c-badge></c-badge>');

    const element = await page.find('c-badge');
    expect(element).toHaveClass('hydrated');
  });
});
