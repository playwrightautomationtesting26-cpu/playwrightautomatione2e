import { test, expect } from '@playwright/test'

test.describe('Login Functionality', () => {
  test.beforeEach('Go to Login Page', async ({ page }) => {
    // 1.  launch the application and verify the title
    await page.goto('https://katalon-demo-cura.herokuapp.com/')
    await expect(page).toHaveTitle('CURA Healthcare Service')

    // 2. click on make appointment link
    await page.getByRole('link', { name: 'Make Appointment' }).click()
    // console.log(
    //   `Assertion: ${await page.getByText("Please login to make appointment.").textContent()}`,
    // );
    await expect(
      page.getByText('Please login to make appointment.'),
    ).toBeVisible()

    await page.waitForLoadState('networkidle')
  })

  test('should login successfully', async ({ page }) => {
    // 3. fill in the login form and submit
    await page.getByLabel('Username').click()
    await page.getByLabel('Username').fill('John Doe')
    await page.getByLabel('Password').click()
    await page.getByLabel('Password').fill('ThisIsNotAPassword')
    await page.getByRole('button', { name: 'Login' }).click()

    // 4. verify successful login by checking the presence of the Make Appointment heading
    await expect(page.locator('h2')).toHaveText('Make Appointment')

    await page.waitForLoadState('networkidle')
  })
  test('[DUPLICATE TEST] should login successfully', async ({ page }) => {
    // 3. fill in the login form and submit
    await page.getByLabel('Username').click()
    await page.getByLabel('Username').fill('John Doe')
    await page.getByLabel('Password').click()
    await page.getByLabel('Password').fill('ThisIsNotAPassword')
    await page.getByRole('button', { name: 'Login' }).click()

    // 4. verify successful login by checking the presence of the Make Appointment heading
    await expect(page.locator('h2')).toHaveText('Make Appointment')

    await page.waitForLoadState('networkidle')
  })

  test('should prevent login with invalid credentials', async ({ page }) => {
    // 1. fill in the login form with invalid credentials and submit
    await page.getByLabel('Username').click()
    await page.getByLabel('Username').fill('John Doeeee')
    await page.getByLabel('Password').click()
    await page.getByLabel('Password').fill('ThisIsNotAPassword')
    await page.getByRole('button', { name: 'Login' }).click()

    // 2. verify that an error message is displayed
    console.log(
      `Assertion: ${await page.locator('.lead.text-danger').textContent()}`,
    )
    await expect(page.locator('.lead.text-danger')).toContainText(
      'Login failed! Please ensure the username and password are valid.',
    )

    await page.waitForLoadState('networkidle')
  })
})
