import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-checkbox');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const checkbox = page.locator('app-example[name="basic"] div').nth(1);

  await expect(checkbox).toHaveScreenshot();

  await checkbox.locator('label').getByRole('img').click();

  await expect(checkbox).toHaveScreenshot();

  await checkbox.locator('label').getByRole('img').click();

  await expect(checkbox).toHaveScreenshot();
});

test('Slot', async ({ page }) => {
  const checkbox = page.locator('app-example[name="slot"] div').nth(1);

  await expect(checkbox).toHaveScreenshot();
});

test('Disabled', async ({ page }) => {
  const checkbox = page.locator('app-example[name="disabled"] div').nth(1);

  await expect(checkbox).toHaveScreenshot();
});
