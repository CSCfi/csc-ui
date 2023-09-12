import { newE2EPage } from '@stencil/core/testing';

describe('c-otp-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<c-otp-input></c-otp-input>');

    const element = await page.find('c-otp-input');
    expect(element).toHaveClass('hydrated');
  });
});
