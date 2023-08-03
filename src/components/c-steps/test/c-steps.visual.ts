import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-steps');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const steps = page.locator('app-example[name="basic"] c-steps');

  await expect(steps).toHaveScreenshot();
});

test('Step changes', async ({ page }) => {
  const stepsWrapper = page.locator('app-example[name="angular"]');

  const steps = stepsWrapper.locator('c-steps');

  await expect(steps).toHaveScreenshot();

  await stepsWrapper.locator('c-icon-button').nth(1).click();

  await expect(steps).toHaveScreenshot();

  await stepsWrapper.locator('c-icon-button').nth(1).click({ clickCount: 2 });

  await expect(steps).toHaveScreenshot();
});
