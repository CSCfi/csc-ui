import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('c-text-field', () => {
  it('renders and responds to the size property', async () => {
    const page = await newE2EPage();

    // In order to test against any global styles you may have, don't forget to set the link to the global css. You don't have to do this if your stencil.config.ts file doesn't build a global css file with globalStyle.
    await page.setContent(
      '<c-text-field label="This is a label"></c-text-field>',
    );

    const element = await page.find('c-text-field');
    expect(element).toHaveClass('hydrated');

    // To start comparing the visual result, you first must run page.compareScreenshot; This will capture a screenshot, and save the file to "/screenshot/images". You'll be able to check that into your repo to provide those results to your team. You can only have one of these commands per test.
    const results = await page.compareScreenshot('kikkare');

    // Finally, we can test against the previous screenshots.
    // Test against hard pixels
    expect(results).toMatchScreenshot({ allowableMismatchedPixels: 5 });

    // Test against the percentage of changes. if 'allowableMismatchedRatio' is above 20% changed,
    expect(results).toMatchScreenshot({ allowableMismatchedRatio: 0.2 });
  });
});
