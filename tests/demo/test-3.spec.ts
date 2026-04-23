import { test, expect } from '@playwright/test'

test.only('test', async ({ page }) => {
  await page.goto('https://admin-demo.nopcommerce.com/login?')

  await page.getByPlaceholder('Email').fill('admin@yourstore.com')
  await page.getByPlaceholder('Password').fill('admin')
  await page.getByRole('button', { name: 'Log in' }).click()

  await expect(page).toHaveURL('https://admin-demo.nopcommerce.com/admin/')
  await expect(page).toHaveTitle('Dashboard / nopCommerce administration')

  await page.waitForLoadState('networkidle')
})
