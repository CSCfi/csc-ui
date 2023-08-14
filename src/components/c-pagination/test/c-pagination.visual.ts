import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-pagination');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  const paginationWrapper = page
    .locator('app-example[name="basic"] div')
    .nth(1);

  await expect(paginationWrapper).toHaveScreenshot();

  await paginationWrapper.getByRole('button', { name: 'page 2 of 10' }).click();

  await expect(paginationWrapper).toHaveScreenshot();

  await paginationWrapper.getByRole('button', { name: 'Next page' }).click();

  await expect(paginationWrapper).toHaveScreenshot();

  await paginationWrapper
    .getByRole('button', { name: 'page 10 of 10' })
    .click();

  await expect(paginationWrapper).toHaveScreenshot();

  await paginationWrapper
    .getByRole('button', { name: 'Previous page' })
    .click();

  await expect(paginationWrapper).toHaveScreenshot();
});

test('Simple', async ({ page }) => {
  const paginationWrapper = page
    .locator('app-example[name="simple"] div')
    .nth(1);

  await expect(paginationWrapper).toHaveScreenshot();

  await paginationWrapper.getByRole('button', { name: 'Next page' }).click();

  await expect(paginationWrapper).toHaveScreenshot();
});

test('Programmatical', async ({ page }) => {
  const paginationWrapper = page
    .locator('app-example[name="programmatical"] div')
    .nth(1);

  await expect(paginationWrapper).toHaveScreenshot();

  await page.getByRole('button', { name: 'Page 2', exact: true }).click();

  await expect(paginationWrapper).toHaveScreenshot();

  await page.getByRole('button', { name: '50 items per page' }).click();

  await expect(paginationWrapper).toHaveScreenshot();
});
