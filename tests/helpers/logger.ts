import { test } from '@playwright/test'
import chalk from 'chalk'

type level = 'log' | 'info' | 'warn' | 'error'

export async function log(level: level, message: string) {
  const plainLine = `[${level.toUpperCase()}] : ${message}` // For Allure report
  let coloredLine = plainLine // For console output

  //Pick color based on log level
  switch (level) {
    case 'info':
      coloredLine = chalk.blue(plainLine)
      break
    case 'warn':
      coloredLine = chalk.yellow(plainLine)
      break
    case 'error':
      coloredLine = chalk.red(plainLine)
      break
    default:
      coloredLine = chalk.white(plainLine)
      break
  }

  // print colored text in terminal
  ;(console[level] || console.log)(coloredLine)
  // print plain text in Allure report
  await test.step(plainLine, async () => {
    // console.log(`>> current configuration for this test: ${JSON.stringify(testInfo.config)}`)
    // console.log(`>> Test data for ${appointmentdata.testId}: ${JSON.stringify(appointmentdata)}`)
    //console.log(coloredLine)
  })
}
