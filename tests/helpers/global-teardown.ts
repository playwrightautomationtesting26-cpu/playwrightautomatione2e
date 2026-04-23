import { type FullConfig } from '@playwright/test'
import { exec, type ExecException } from 'node:child_process'

export default async function globalTeardown(config: FullConfig) {
  // Perform any global teardown tasks here, such as closing databases, stopping servers, etc.
  console.log(`[INFO]: Starting the Global teardown process...`)
  // Add any global teardown tasks here
  /** Executed after all tests have finished
   * Note: This function will be called only if the global setup function was executed successfully. If the global setup fails, the global teardown will not be executed.
   * This is a good place to clean up any resources that were set up in the global setup, such as closing database connections, stopping servers, or deleting temporary files. You can also perform any final reporting or logging tasks here.
   */
  // Generate Allure report after tests have completed
  if (process.env.RUNNER?.toUpperCase() === 'LOCAL') {
    console.log(`>> Local run detected - starting Allure server...`)
    // exec(
    //   'allure serve',
    //   (error: ExecException | null, stdout: string, stderr: string) => {
    //     if (error) {
    //       console.error(`Error starting Allure server: ${error.message}`)
    //       return
    //     }
    //     if (stderr) {
    //       console.error(`Error output from Allure server: ${stderr}`)
    //       return
    //     }
    //     console.log(`Allure server output: ${stdout}`)
    //   },
    // )
  }
  console.log(`[INFO]: Global teardown completed.`)

  // All other one-off taskk goes here
  //Set the login cookie global varible
  process.env.LOGIN_COOKIE = undefined
}
