import { expect, type Locator, type Page } from '@playwright/test'
import BasePage from './base.page.js'
import { log } from '../helpers/logger.js'

export default class Homepage extends BasePage {
    //Constants for locators on the nopCommerce home page
    constructor(page: Page) {
        super(page)
    }
    /**
     * Elements on the nopCommerce home page can be defined as getter methods here
     */
    get userNameInputBox() {
        return this.page.locator('#Email')
    }
    get passwordInputBox() {
        return this.page.locator('#Password')
    }
    get loginBtn() {
        return this.page.getByRole('button', { name: 'Log in' })
    }

    /**
  * Page Actions
  */
    // Define methods to interact with the nopCommerce home page
    async loginToNopCommerceApp(
        applicationUrl: any,
        username: any,
        password: any,
    ) {
        await log('info', `Attempting to login with username: ${username}`)
        // Login
        await this.navigateTo(applicationUrl)
        await this.typeInto(this.userNameInputBox, username)
        await this.typeInto(this.passwordInputBox, password)
        await this.click(this.loginBtn)

        await expect(this.page).toHaveURL(`${applicationUrl}/admin/`)
        await log(
            'info',
            `Login successful, navigated to URL: ${applicationUrl}/admin`,
        )
        await this.page.waitForLoadState('networkidle')
    }


}

