import { test, expect } from '@playwright/test'
import { log } from '../helpers/logger.js'
import Homepage from '../page-objects/nopCommerce.home.page.js'
import CustomersList from '../page-objects/nopCommerce.customers.list.page.js'
import constants from '../../data/constants.json'

test.describe('e2e Customer serach functionality : ', () => {

    test('e2e_TC001: Login to NopCommerce Web App & Serach the external customers in customer portal : ', async ({ page, request }, testInfo) => {

        //Env config
        const envConfig = testInfo.project.use as any
        /** 1. Get list of users */
        // Make a GET call
        await log('info', ` Making a GET call using :  ${envConfig.apiURL}`)
        // TODO: Goes to constants.json file
        const res = await request.get(`${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.GET_USERS_LIST}`, {
            headers: {

                // TODO: Goes to .env file
                'x-api-key': process.env.REQ_RES_API_KEY
            }
        })

        // Assert the status code
        expect(res.status()).toBe(200);
        await log('info', ` The GET call is successfull with ${res.status()}`)

        // Get list of users
        const usersData = await res.json();
        await log('info', `List of users : ${JSON.stringify(usersData)}`)


        // Create an Page object
        const homePage = new Homepage(page)
        const customersList = new CustomersList(page)

        /** 2. Login to web */
        await homePage.loginToNopCommerceApp(envConfig.nopCommerceWeb, process.env.NOP_COMMERCE_TEST_USERNAME, process.env.NOP_COMMERCE_TEST_PASSWORD)
        await log('info', 'Login successfully completed ')

        // Customer Search
        // const USER_DATA = {
        //     firstname: 'Alex',
        //     lastname: 'Thomas'
        // }
        // const USER_DATA = {
        //     firstname: 'Steve',
        //     lastname: 'Gates'
        // }


        //Write the list of users

        /** 3. Customer Search */
        const USER_DATA = usersData.data
        await customersList.navigateToCustomersLeftPanel()

        // Iterate over the list of users
        for (const user of USER_DATA) {
            let customerNotFound = await customersList.serachAndConfirmUser(user.first_name, user.last_name)

            if (customerNotFound) {
                await log('warn', `The given user : ${user.first_name} and ${user.last_name} cound not found in the customer list table`)

            }
            else {
                await log('warn', `The given user : ${user.first_name} and ${user.last_name} found in the customer list table`)

            }
        }
    })


})


