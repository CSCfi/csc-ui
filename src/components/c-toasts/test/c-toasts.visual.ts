import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-toasts');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const toastsWrapper = page.locator('app-example[name="basic"] div').nth(1);

  await toastsWrapper.getByRole('button', { name: 'Add toast' }).click();

  const toasts = toastsWrapper.locator('c-toasts');

  await expect(toasts).toHaveScreenshot();

  await toasts.locator('c-icon-button').click();

  await toastsWrapper.locator('.c-input-menu__input').first().click();

  await toastsWrapper.getByRole('option', { name: 'Success' }).click();

  await toastsWrapper.getByRole('button', { name: 'Add toast' }).click();

  await expect(toasts).toHaveScreenshot();

  await toasts.locator('c-icon-button').click();

  await toastsWrapper.locator('.c-input-menu__input').first().click();

  await toastsWrapper.getByRole('option', { name: 'Warning' }).click();

  await toastsWrapper.getByRole('button', { name: 'Add toast' }).click();

  await expect(toasts).toHaveScreenshot();

  await toasts.locator('c-icon-button').click();

  await toastsWrapper.locator('.c-input-menu__input').first().click();

  await toastsWrapper.getByRole('option', { name: 'Error' }).click();

  await toastsWrapper.getByRole('button', { name: 'Add toast' }).click();

  await expect(toasts).toHaveScreenshot();
});
