import { expect, type Page, type Locator } from '@playwright/test'
import BasePage from '../page-objects/base.page.js'
import { log } from '../helpers/logger.js'


export default class HomePage extends BasePage {
  //constructor to initialize the page object
  constructor(page: Page) {
    super(page)
  }

  /**
   * Element locators and methods specific to the home page can be defined here.
   */
  get usernameInput() {
    return this.page.getByPlaceholder('Username')
  }
  get passwordInput() {
    return this.page.getByPlaceholder('Password')
  }
  get loginButton() {
    return this.page.getByRole('button', { name: 'Login' })
  }

  /**
   * Page Actions
   */
  async loginToSauceDemoApplication(
    applicationurl: string,
    username: string,
    password: string,
  ) {
    await log('info', `Attempting to login with username: ${username}`)
    await this.navigateTo(applicationurl)
    await this.typeInto(this.usernameInput, username)
    await this.typeInto(this.passwordInput, password)
    await this.click(this.loginButton)

    await expect(this.page).toHaveURL(`${applicationurl}/inventory.html`)
    await log(
      'info',
      `Login successful, navigated to URL: ${applicationurl}/inventory.html`,
    )
  }

  async verifySuccessfulLogin(expectedUrl: string) {
    try {
      await expect(this.page).toHaveURL(expectedUrl, { timeout: 50_000 }) //Custom timeout: Default is 30 seconds
      await log('info', `Login successful, navigated to URL: ${expectedUrl}`)
    } catch (error) {
      await log(
        'error',
        `Login failed, expected URL: ${expectedUrl}, original Error: ${error}`,
      )
      throw error // Re-throw the error after logging
    }
  }

  /**
 *  //Launch the application and perform login
  await page.goto('https://www.saucedemo.com/')
  await page.getByPlaceholder('Username').fill('standard_user')
  await page.getByPlaceholder('Password').fill('secret_sauce')
  await page.getByRole('button', { name: 'Login' }).click()

  // Verify that the URL is correct after login
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
 */
}
