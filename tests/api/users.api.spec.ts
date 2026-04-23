
import { test, expect, request } from '@playwright/test'
import { log } from '../helpers/logger.js'
import constants from '../../data/constants.json'
import TestData from '../../data/data-test.js'
import fileHelper from '../helpers/file-helper.js'

test.describe('REST API Demo', () => {
  let envConfig = undefined;

  // TODO: Goes to env config file
  test.beforeEach('Get the env config', async ({ request }, testInfo) => {
    envConfig = testInfo.project.use as any;

  })

  // GET Method
  test('Should get list of users', async ({ request }) => {

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

    //Write the list of users
    fileHelper.writeFile(`${process.cwd()}/data/api-response/list-of-users.json`, `${JSON.stringify(usersData, undefined, 4)}`)


  })


  test('Should create a user', async ({ request }) => {

    // Make a POST call
    await log('info', ` Making a POST call using :  ${envConfig.apiURL}`)

    // TODO: Goes to test-data.ts file
    const payload = TestData.apiUserCreation()[0]

    const res = await request.post(`${envConfig.apiURL}${constants.REQ_RES_ENDPOINTS.POST_USER}`, {
      headers: {
        'x-api-key': process.env.REQ_RES_API_KEY,
        'Content-Type': process.env.REQ_RES_CONTENT_TYPE_KEY
      },
      data: payload
    })

    // Assert the status code
    expect(res.status()).toBe(201)
    await log('info', ` The POST call is successfull with ${res.status()}`)

    // user info
    const resData = await res.json();
    await log('info', `Response data from POST call : ${JSON.stringify(resData)}`)




  })
})


/**
 * var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://reqres.in/api/users',
  'headers': {
    'Accept': 'application/json',
    'x-api-key': 'reqres_bf02327393f74c91896c74f71fae3cfc',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "name": "Amitava",
    "job": "EY-SDET"
  })

};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

 */

/**
 * var request = require('request');
var options = {
  'method': 'GET',
  'url': 'https://reqres.in/api/users?page=2',
  'headers': {
    'x-api-key': 'reqres_bf02327393f74c91896c74f71fae3cfc'
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

 */