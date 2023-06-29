import { E2EPage } from '@stencil/core/testing';

export const takeScreenshot = async (
  page: E2EPage,
  description: string = null,
  pause = 1000,
) => {
  await new Promise((r) => setTimeout(r, pause));
  const results = !description
    ? await page.compareScreenshot()
    : await page.compareScreenshot(description);
  expect(results).toMatchScreenshot({
    allowableMismatchedPixels: 500,
    allowableMismatchedRatio: 0.2,
  });
};
