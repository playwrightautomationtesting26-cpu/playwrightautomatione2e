import { type FullConfig } from '@playwright/test'
import path from 'node:path'
import fs from 'node:fs'

export default async function globalSetup(config: FullConfig) {
  // Perform any global setup tasks here, such as initializing databases, starting servers, etc.
  console.log('Global setup started...')

  if (process.env.RUNNER?.toUpperCase() === 'LOCAL') {
    console.log('Running in LOCAL environment. Performing local setup tasks...')
    console.log(`>>[INFO]: Detecting local runsner... ${process.env.RUNNER}`)
    // Add any local-specific setup tasks here

    // Delete allure report
    const resultsDir = path.resolve(process.cwd(), 'allure-results')
    console.log(`>> resultsDir: ${resultsDir}`)

    if (fs.existsSync(resultsDir)) {
      console.log('Deleting allure-results directory...')
      fs.rmSync(resultsDir, { recursive: true, force: true })
      console.log('Allure-results directory deleted.')
    }
    console.log('Global setup completed.')
  }

  // Add any additional global setup tasks here
  // Set the Login cookie global variable
  process.env.LOGIN_COOKIE = undefined
}
