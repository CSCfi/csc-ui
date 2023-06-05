import { newE2EPage } from '@stencil/core/testing';
import { CSteps } from '../c-steps';

describe('c-steps', () => {
  it('renders default html', async () => {
    const page = await newE2EPage();
    await page.setContent(`<c-steps></c-steps>`);

    expect(page).toMatchSnapshot();
  });
});
