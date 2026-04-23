import { test, expect, TestInfo } from '@playwright/test'
import TestData from '../../data/data-test'

const testData = TestData.makeAppointTestData() // --> Return 3 sets of test data combinations for making appointment
// Accessing test data in a loop
for (const appointmentdata of testData) {
  test.describe('Make Appointment Functionality', () => {
    test.beforeEach(
      'Login with valid credentials in CURA healthcare service ',
      async ({ page }, testInfo) => {
        // 1.  launch the application and verify the title
        // Get the URL from environment variable set in the config file
        const envConfig = testInfo.project.use as any

        await page.goto(envConfig.appUrl)
        // await page.goto('https://katalon-demo-cura.herokuapp.com/')
        await expect(page).toHaveTitle('CURA Healthcare Service')

        // 2. click on make appointment link
        await page.getByRole('link', { name: 'Make Appointment' }).click()
        console.log(
          `Assertion: ${await page.getByText('Please login to make appointment.').textContent()}`,
        )
        await expect(
          page.getByText('Please login to make appointment.'),
        ).toBeVisible()
        // 3. fill in the login form and submit
        // await page.locator("#txt-username").click();
        await page.locator('#txt-username').fill(process.env.TEST_USERNAME)
        // await page
        //   .getByPlaceholder("Username")
        //   .pressSequentially("John Doe", { delay: 100 });
        // await page.locator("#txt-password").click();
        await page.locator('#txt-password').fill(process.env.TEST_PASSWORD)
        await page.getByRole('button', { name: 'Login' }).click()

        //Get login cookie
        const loginCookie = await page.context().cookies()
        process.env.LOGIN_COOKIE = JSON.stringify(loginCookie)

        // 4. verify successful login by checking the presence of the Make Appointment heading
        console.log(
          `Assertion: ${await page.getByRole('heading', { name: 'Make Appointment' }).textContent()}`,
        )
        await expect(
          page.getByRole('heading', { name: 'Make Appointment' }),
        ).toBeVisible()

        page.waitForLoadState('networkidle')
      },
    )
    test(`${appointmentdata.testId} Should book an appointment successfully`, async ({
      page,
    }, testInfo: TestInfo) => {
      // console.log(
      //   `>> current configuration for this test: ${JSON.stringify(testInfo.config)}`,
      // )
      console.log(
        `Login cookie set in global variable: ${process.env.LOGIN_COOKIE}`,
      )
      console.log(
        `>> Test data for ${appointmentdata.testId}: ${JSON.stringify(appointmentdata)}`,
      )
      await page.getByLabel('Facility').selectOption(appointmentdata.Facility)
      await page
        .getByRole('checkbox', { name: 'Apply for hospital readmission' })
        .check()
      await page
        .getByRole('radio', { name: appointmentdata.healthcareProgram })
        .check()
      // await page.locator('.glyphicon.glyphicon-calendar').click()
      // const year = '2050'
      // const month = 'Dec'
      // const day = '31'
      // const currentDaysLocator = page.locator(
      //   "div[class='datepicker-days'] th[class='datepicker-switch']",
      // )
      // const currentDays = await currentDaysLocator.textContent()
      // console.log(`Current month and year in datepicker: ${currentDays}`)
      // await currentDaysLocator.click() // click on the month and year to open the month and year selection
      // const currentMonthsLocator = page.locator(
      //   "div[class='datepicker-months'] th[class='datepicker-switch']",
      // )
      // let currentMonths = await currentMonthsLocator.textContent()
      // console.log(`Current year in datepicker: ${currentMonths}`)
      // await currentMonthsLocator.click() // click on the months to open the year selection

      // while (true) {
      //   const elementHandles = await page.$$(
      //     "//table//tbody//tr//td//span[contains(@class,'year')]",
      //   ) // locator for the years available for selection in the datepicker
      //   let found = false
      //   for (const element of elementHandles) {
      //     const text = await element.textContent()
      //     if (text === year) {
      //       console.log(
      //         `Year ${text} is available for selection in the datepicker`,
      //       )
      //       found = true
      //       break
      //     }
      //   }
      //   if (found) {
      //     break
      //   }
      //   await page
      //     .locator("div[class='datepicker-years'] th[class='next']")
      //     .click() // click on the next button to navigate to the next set of years
      // }
      // await page
      //   .locator(`div[class='datepicker-years'] span:has-text("${year}")`)
      //   .click() // click on the year to select it
      // await page
      //   .locator(`div[class='datepicker-months'] span:has-text("${month}")`)
      //   .click() // click on the month to select it
      // await page
      //   .locator(
      //     `div[class='datepicker-days'] td[class='day']:has-text("${day}")`,
      //   )
      //   .click() // click on the day to select it

      await page.locator('#txt_visit_date').click()
      await page.locator('#txt_visit_date').fill(appointmentdata.Vistdate)
      await page.locator('#txt_visit_date').press('Enter')
      await page
        .locator('#txt_comment')
        .fill('This is multiline comments \ncaptured by playwright')
      await page.getByRole('button', { name: 'Book Appointment' }).click()
      await expect(page.locator('h2')).toContainText('Appointment Confirmation')
      await expect(
        page.getByRole('link', { name: 'Go to Homepage' }),
      ).toBeVisible()

      await page.waitForLoadState('networkidle')
    })
  })
}
