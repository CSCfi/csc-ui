import { test, expect } from '@playwright/test';

test.beforeEach(async ({}, testInfo) => {
  testInfo.snapshotSuffix = '';
});

test('Variants', async ({ page }) => {
  await page.goto('http://localhost:4200/c-alert');

  const alert = page.locator('app-example[name="basic"] c-alert').first();

  await page
    .locator('label')
    .filter({ hasText: 'Default' })
    .locator('span')
    .first()
    .click();

  await expect(alert).toHaveScreenshot();

  // Info variant
  await page.locator('#info span').first().click();

  await expect(alert).toHaveScreenshot();

  // Success variant
  await page.locator('#success span').first().click();

  await expect(alert).toHaveScreenshot();

  // Warning variant
  await page.locator('#warning span').first().click();

  await expect(alert).toHaveScreenshot();

  // Error variant
  await page.locator('#error span').first().click();

  await expect(alert).toHaveScreenshot();
});
