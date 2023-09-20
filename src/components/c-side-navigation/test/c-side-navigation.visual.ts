import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-side-navigation');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const sideNavigation = page.locator(
    'app-example[name="basic"] c-side-navigation',
  );

  await expect(sideNavigation).toHaveScreenshot();

  await sideNavigation.locator('c-side-navigation-item').nth(1).click();

  await expect(sideNavigation).toHaveScreenshot();

  await sideNavigation.locator('c-side-navigation-item').nth(1).click();

  await expect(sideNavigation).toHaveScreenshot();

  await sideNavigation.locator('c-side-navigation-item').first().click();

  await expect(sideNavigation).toHaveScreenshot();
});
