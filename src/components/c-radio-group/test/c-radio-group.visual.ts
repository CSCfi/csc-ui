import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-radio-group');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const radioGroup = page.locator('app-example[name="basic"] div').nth(1);

  await expect(radioGroup).toHaveScreenshot();

  await radioGroup.locator('#three span').nth(1).click();

  await expect(radioGroup).toHaveScreenshot();
});

test('Inline', async ({ page }) => {
  const radioGroup = page.locator('app-example[name="inline"] div').nth(1);

  await expect(radioGroup).toHaveScreenshot();
});

test('Slot', async ({ page }) => {
  const radioGroup = page.locator('app-example[name="slot"] div').nth(1);

  await expect(radioGroup).toHaveScreenshot();
});

test('Disabled', async ({ page }) => {
  const radioGroup = page.locator('app-example[name="disabled"] div').nth(1);

  await expect(radioGroup).toHaveScreenshot();
});
