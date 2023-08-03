import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  testInfo.snapshotSuffix = '';

  await page.goto('http://localhost:4200/c-autocomplete');

  await page.waitForTimeout(500);
});

test('Default', async ({ page }) => {
  const example = page.locator('app-example[name="angular"]').first();

  const autocomplete = example.locator('c-autocomplete').first();

  await expect(example).toHaveScreenshot();

  await autocomplete.locator('.c-input-menu__input').first().click();
  await autocomplete.getByRole('combobox', { name: 'Countries' }).fill('fin');

  await page.waitForTimeout(350);

  await expect(example).toHaveScreenshot();

  await autocomplete.getByRole('option', { name: 'Finland' }).click();

  await page.waitForTimeout(350);

  await expect(example).toHaveScreenshot();
});

test('Custom menu items', async ({ page }) => {
  const example = page.locator('app-example[name="customMenu"]').first();

  const autocomplete = example.locator('c-autocomplete').first();

  await expect(example).toHaveScreenshot();

  await autocomplete.locator('.c-input-menu__input').first().click();
  await autocomplete.getByRole('combobox', { name: 'Countries' }).fill('fin');

  await page.waitForTimeout(350);

  await expect(example).toHaveScreenshot();

  await page.getByText('Country 1Finland').click();

  await page.waitForTimeout(350);

  await expect(example).toHaveScreenshot();
});
