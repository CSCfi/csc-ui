import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('http://localhost:4200/c-button');

  testInfo.snapshotSuffix = '';
});

test('Default', async ({ page }) => {
  let button = page
    .getByTitle('Default button')
    .getByRole('button', { name: 'Default' })
    .first();

  await expect(button).toHaveScreenshot();

  button = page
    .getByTitle('Default button')
    .getByRole('button', { name: 'Default' })
    .nth(2);

  await expect(button).toHaveScreenshot();
});

test('Outlined', async ({ page }) => {
  let button = page.getByRole('button', { name: 'Outlined' }).first();

  await expect(button).toHaveScreenshot();

  button = page.getByRole('button', { name: 'Outlined' }).nth(2);

  await expect(button).toHaveScreenshot();
});

test('Ghost', async ({ page }) => {
  await page.goto('http://localhost:4200/c-button');

  let button = page.getByRole('button', { name: 'Ghost' }).first();

  await expect(button).toHaveScreenshot();

  button = page.getByRole('button', { name: 'Ghost' }).nth(2);

  await expect(button).toHaveScreenshot();
});

test('Text', async ({ page }) => {
  let button = page.getByRole('button', { name: 'Text' }).first();

  await expect(button).toHaveScreenshot();

  button = page.getByRole('button', { name: 'Text' }).nth(2);

  await expect(button).toHaveScreenshot();
});

test('Inverted variant', async ({ page }) => {
  const invertedVariant = page.getByTitle('Inverted variant');

  let button = invertedVariant.getByRole('button', { name: 'Default' }).first();

  await expect(button).toHaveScreenshot();

  button = invertedVariant.getByRole('button', { name: 'Default' }).nth(2);

  await expect(button).toHaveScreenshot();

  button = invertedVariant.getByRole('button', { name: 'Outlined' });

  await expect(button).toHaveScreenshot();

  button = invertedVariant.getByRole('button', { name: 'Ghost' });

  await expect(button).toHaveScreenshot();

  button = invertedVariant.getByRole('button', { name: 'Text' });

  await expect(button).toHaveScreenshot();
});

test('No radius', async ({ page }) => {
  let button = page.getByRole('button', { name: 'No radius' }).first();

  await expect(button).toHaveScreenshot();

  button = page.getByRole('button', { name: 'No radius' }).nth(2);

  await expect(button).toHaveScreenshot();
});

test('Fitted', async ({ page }) => {
  const button = page.getByRole('button', { name: 'Fitted' }).first();

  await expect(button).toHaveScreenshot();
});

test('With icon', async ({ page }) => {
  let button = page.getByRole('button', { name: 'Login' }).first();

  await expect(button).toHaveScreenshot();

  button = page.getByRole('button', { name: 'Login' }).nth(2);

  await expect(button).toHaveScreenshot();

  button = page.getByRole('button', { name: 'Next' });

  await expect(button).toHaveScreenshot();
});

test('Button sizes', async ({ page }) => {
  let button = page.getByRole('button', { name: 'Small', exact: true }).first();

  await expect(button).toHaveScreenshot();

  button = page
    .getByTitle('Button sizes')
    .getByRole('button', { name: 'Default' });

  await expect(button).toHaveScreenshot();

  button = page.getByRole('button', { name: 'Large' }).first();

  await expect(button).toHaveScreenshot();
});

test('With description', async ({ page }) => {
  const buttonWrapper = page.getByText(
    'With description standard.tiny 80 GB storage1 GB RAM | 1 CPU standard.small 80 G',
  );

  await expect(buttonWrapper).toHaveScreenshot();
});

test('Sizes and descriptions', async ({ page }) => {
  let button = page.getByRole('button', { name: 'Small', exact: true }).first();

  await expect(button).toHaveScreenshot();

  button = page
    .getByRole('button', {
      name: 'standard.tiny 80 GB storage 1 GB RAM | 1 CPU',
    })
    .nth(2);

  await expect(button).toHaveScreenshot();

  button = page
    .getByRole('button', {
      name: 'standard.medium 80 GB storage 4 GB RAM | 3 CPU',
    })
    .nth(2);

  await expect(button).toHaveScreenshot();
});
