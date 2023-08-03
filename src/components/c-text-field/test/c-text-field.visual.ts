import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-text-field');

  await page.waitForTimeout(500);

  testInfo.snapshotSuffix = '';
});

test('Date', async ({ page }) => {
  const textField = page.locator('app-example[name="date"] div').nth(1);

  await expect(textField).toHaveScreenshot();

  await textField.getByLabel('Date', { exact: true }).fill('2023-09-05');

  await page.waitForTimeout(350);

  await expect(textField).toHaveScreenshot();
});

test('Password', async ({ page }) => {
  const textField = page.locator('app-example[name="password"] div').nth(1);

  await expect(textField).toHaveScreenshot();

  await textField.getByLabel('Password', { exact: true }).fill('salasana');

  await page.waitForTimeout(350);

  await expect(textField).toHaveScreenshot();
});

test('Disabled', async ({ page }) => {
  const textField = page.locator('app-example[name="disabled"] div').nth(1);

  await expect(textField).toHaveScreenshot();
});

test('Shadow', async ({ page }) => {
  const textField = page.locator('app-example[name="shadow"] div').nth(1);

  await expect(textField).toHaveScreenshot();

  await textField
    .getByRole('textbox', { name: 'Text field with a shadow' })
    .fill('Testi');

  await page.waitForTimeout(350);

  await expect(textField).toHaveScreenshot();
});

test('Textarea', async ({ page }) => {
  const textField = page.locator('app-example[name="textarea"] div').nth(1);

  await expect(textField).toHaveScreenshot();

  await textField.getByLabel('I am a textarea', { exact: true }).fill('Testi');

  await page.waitForTimeout(350);

  await expect(textField).toHaveScreenshot();
});
