import { expect, type Locator, type Page } from '@playwright/test'
import BasePage from './base.page.js'
import { log } from '../helpers/logger.js'

export default class CustomersList extends BasePage {
    //Constants for locators on the nopCommerce home page
    constructor(page: Page) {
        super(page)
    }
    /**
     * Elements on the nopCommerce home page can be defined as getter methods here
     */
    get customersLeftPanelTab() {
        return this.page.locator("//a[@href='#']//p[contains(text(),'Customers')]")
    }
    get customersListLink() {
        return this.page.locator("//a[@href='/Admin/Customer/List']//p[contains(text(),'Customers')]")
    }
    get firstNameInputBox() {
        return this.page.locator('#SearchFirstName')
    }
    get lastNameInputBox() {
        return this.page.locator('#SearchLastName')
    }
    get searchBtn() {
        return this.page.getByRole('button', { name: 'Search' })
    }
    get noDataAvailableCell() {
        return this.page.locator('.dt-empty')
    }



    /**
  * Page Actions
  */
    async navigateToCustomersLeftPanel() {
        await log('info', ' Navigate to Cutomers left panel tab and click on Customers list')
        await this.click(this.customersLeftPanelTab)

        await this.click(this.customersListLink)
        await log('info', 'Customers list page are open successfully')

    }
    async goToCustomersListPage(customerListPageURL: any) {
        this.navigateTo(customerListPageURL)
    }

    // Search actions
    async serachAndConfirmUser(firstName: string, lastName: string): Promise<boolean> {
        await log('info', `Seraching the user with firstname : ${firstName} and lastnmae : ${lastName}...`)
        await this.typeInto(this.firstNameInputBox, firstName)
        await this.typeInto(this.lastNameInputBox, lastName)
        await this.click(this.searchBtn)

        // Check wheather the customer project
        //await this.page.waitForTimeout(90_000)
        await this.page.waitForLoadState('networkidle')
        let customerNotFound = await this.noDataAvailableCell.isVisible()
        return customerNotFound

    }


}

