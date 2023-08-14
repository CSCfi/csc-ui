import { newE2EPage } from '@stencil/core/testing';
import { takeScreenshot } from '../../../utils/test/takeScreenshot';

describe('c-card', () => {
  it('matches screenshot', async () => {
    const page = await newE2EPage();

    await page.setContent(`
    <c-card>
      <c-card-title>Title</c-card-title>
      <c-card-content>Content</c-card-content>
      <c-card-action>Action</c-card-action>
    </c-card>`);

    const element = await page.find('c-card');
    expect(element).toHaveClass('hydrated');

    await takeScreenshot(page);
  });
});
