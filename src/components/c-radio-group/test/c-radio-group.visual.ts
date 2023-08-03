import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-radio-group');

  await page.waitForTimeout(200);

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  await page.waitForTimeout(800);

  const radioGroup = page.locator('app-example[name="basic"] div').nth(1);

  await expect(radioGroup).toHaveScreenshot();

  await radioGroup.locator('#three span').nth(1).click();

  await page.waitForTimeout(350);

  await expect(radioGroup).toHaveScreenshot();
});

test('Inline', async ({ page }) => {
  await page.waitForTimeout(800);

  const radioGroup = page.locator('app-example[name="inline"] div').nth(1);

  await expect(radioGroup).toHaveScreenshot();
});

test('Slot', async ({ page }) => {
  await page.waitForTimeout(800);

  const radioGroup = page.locator('app-example[name="slot"] div').nth(1);

  await expect(radioGroup).toHaveScreenshot();
});

test('Disabled', async ({ page }) => {
  await page.waitForTimeout(800);

  const radioGroup = page.locator('app-example[name="disabled"] div').nth(1);

  await expect(radioGroup).toHaveScreenshot();
});
