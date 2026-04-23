import { expect, type Locator, type Page } from '@playwright/test'
import { log } from '../helpers/logger.js'

// Initialize any common properties or methods for all pages here
export default class BasePage {
  readonly page: Page

  constructor(page: Page) {
    this.page = page
  }
  /* All reusable methods across pages can be defined here, such as navigation, common interactions, etc. */
  async navigateTo(path: any) {
    await log('info', `Navigating to path: ${path}`)
    await this.page.goto(path)
  }
  /* Clicking an element by selector */
  async click(ele: Locator) {
    try {
      await expect(ele).toBeVisible({ timeout: 50_000 }) //Custom timeout: Default is 30 seconds
      await ele.click()
    } catch (error) {
      log(
        'error',
        `Failed to click on element: ${ele.toString()}, original Error: ${error}`,
      )
      throw error // Re-throw the error after logging
    }
  }
  /* Typing into an element by selector */
  async typeInto(ele: Locator, text: any) {
    try {
      await expect(ele).toBeVisible({ timeout: 50_000 }) //Custom timeout: Default is 30 seconds
      await ele.fill(text)
    } catch (error) {
      log(
        'error',
        `Failed to type into element: ${ele.toString()}, original Error: ${error}`,
      )
      throw error // Re-throw the error after logging
    }
  }


}
