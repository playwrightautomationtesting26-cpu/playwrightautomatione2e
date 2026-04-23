import { defineConfig, devices } from '@playwright/test'
import { baseConfig } from '../playwright.config.ts'
import { EnvConfig } from '../tests/helpers/config-fixtures.ts'
import { Server } from 'node:http'
import path from 'node:path'

console.log('---Running the Tests in Dev environment---')
export default defineConfig<EnvConfig>({
  ...baseConfig, // Loads all the existing configuration from the base config file
  testDir: path.resolve(process.cwd(), './tests'), // Override the test directory to point to the tests folder

  use: {
    ...baseConfig.use, // Loads all the existing "use" object from the base config file
    envName: 'Dev',
    appUrl: 'https://katalon-demo-cura.herokuapp.com/',
    dbCONFIG: {
      server: 'localhost',
      dbname: 'mydb',
      username: 'myuser',
      password: 'mypassword',
      connectionString:
        'Server=localhost;Database=mydb;username=myuser;Password=mypassword;',
    },
  },
})
