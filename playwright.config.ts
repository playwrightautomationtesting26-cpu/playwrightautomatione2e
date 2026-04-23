/// <reference types="node" />
import { defineConfig, devices } from '@playwright/test'
import { env } from 'node:process'

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.resolve(__dirname, '.env') })

/**
 * See https://playwright.dev/docs/test-configuration.
 */

console.log(`Hello from Playwright config!`)

export const baseConfig = defineConfig({
  //testDir: "./**/*.spec.ts",
  //testMatch:/.*\.ts$/,
  testMatch: '**/*.spec.ts',
  //testDir: "tests",
  /* Run tests in files in parallel */
  fullyParallel: true,
  //fullyParallel: false,

  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  // Use 1 worker on CI to avoid resource contention; undefined locally for default parallelism.
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  //reporter: "html",
  reporter: [
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          name: 'Test Environment',
          owner: 'Amitava Chakraborty',
          appname: 'CURA Healthcare Service',
          platform: 'Windows 10',
          browser: 'Chromium',
          release: '1.0.0',
          node_version: process.version,
        },
      },
    ],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  timeout: 120 * 1000,
  expect: {
    timeout: 120 * 1000,
  },
  //globalTimeout: 3 * 60 * 60 * 1000, // -3 hours
  globalSetup: require.resolve('./tests/helpers/global-setup.ts'),
  globalTeardown: require.resolve('./tests/helpers/global-teardown.ts'),
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    ignoreHTTPSErrors: true,
    //navigationTimeout: 90 * 1000,
    //headless: false,
    userAgent:
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36',
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        //viewport: null,
        launchOptions: {
          //   args: ['--start-maximized'],
          args: [
            '--start-maximized',
            '--disable-notifications',
            '--disable-blink-features=AutomationControlled',
            '--disable-infobars',
            '--window-size=1920,1080',
            '--user-agent=Custom Agent',
            // All args should start with -- or be valid flags
            // NO plain URLs!
          ]
          // },
        },
      },

      // {
      //   name: 'Galaxy A55',
      //   use: { ...devices['Galaxy A55'] },
      // },
      // {
      //   name: 'chromium',
      //   use: {
      //     // ...devices['Desktop Chrome'],
      //     viewport: null,
      //     launchOptions: {
      //       args: ['--start-maximized'],
      //     },
      //   },
      // },

      // {
      //   name: 'firefox',
      //   use: { ...devices['Desktop Firefox'] },
      // },

      // {
      //   name: 'webkit',
      //   use: { ...devices['Desktop Safari'] },
      // },

      /* Test against mobile viewports. */
      // {
      //   name: 'Mobile Chrome',
      //   use: { ...devices['Pixel 5'] },
      // },
      // {
      //   name: 'Mobile Safari',
      //   use: { ...devices['iPhone 12'] },
      // },

      /* Test against branded browsers. */
      // {
      //   name: 'Microsoft Edge',
      //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
      // },
      // {
      //   name: 'Google Chrome',
      //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
})
