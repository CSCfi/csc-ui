import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-tag');

  await page.waitForTimeout(200);

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  await page.waitForTimeout(800);

  const tags = page.locator('app-example[name="basic"] div').nth(1);

  await expect(tags).toHaveScreenshot();
});

test('Flat', async ({ page }) => {
  const tags = page.locator('app-example[name="flat"] div').nth(1);

  await expect(tags).toHaveScreenshot();
});

test('Closeable', async ({ page }) => {
  const tags = page.locator('app-example[name="closeable"] div').nth(1);

  await expect(tags).toHaveScreenshot();
});

test('With badges', async ({ page }) => {
  const tags = page.locator('app-example[name="badges"] div').nth(1);

  await expect(tags).toHaveScreenshot();
});

test('Fit', async ({ page }) => {
  const tags = page.locator('app-example[name="fit"] div').nth(1);

  await expect(tags).toHaveScreenshot();
});
