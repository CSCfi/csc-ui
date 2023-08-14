import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-swiper');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const swiper = page.locator('app-example[name="basic"] div').nth(1);

  await expect(swiper).toHaveScreenshot();

  await page
    .getByRole('tab', {
      name: 'Two Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    })
    .locator('div')
    .nth(1)
    .click();

  await expect(swiper).toHaveScreenshot();

  await page.getByRole('button', { name: 'Next page' }).click();

  await expect(swiper).toHaveScreenshot();
});
