import { test, type Page, type Locator } from '@playwright/test'

/**
 * Take a screenshot of full page
 * @param page
 * @param screenshotName - Name for the screenshot attachemnt
 */

/** Full page screenshot */
async function takeFullPageScreenshot(page: Page, screenshotName: any) {
    const screenshot = await page.screenshot({ fullPage: true })
    //Attach it to the report
    await test.info().attach(screenshotName, {
        body: screenshot,
        contentType: 'image/png'
    })
}

/** Element screenshot */
async function takeElementScreenshot(element: Locator, screenshotName: any) {
    //Take screenshot of the element
    const screenshot = await element.screenshot();
    //Attach it to the report
    await test.info().attach(screenshotName, {
        body: screenshot,
        contentType: 'image/png'
    })
}

export default { takeFullPageScreenshot, takeElementScreenshot }