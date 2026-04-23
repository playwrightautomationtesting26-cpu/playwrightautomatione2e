import { test as base } from '@playwright/test'

export type EnvConfig = {
  envName: any
  appUrl: any
  nopCommerceWeb: any
  apiURL: any
  dbCONFIG: {}
}

export const test = base.extend<EnvConfig>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  envName: ['Test', { option: true }],
  appUrl: ['<PROVIDE_APP_URL>', { option: true }],
  nopCommerceWeb: ['<PROVIDE_URL>', { option: true }],
  apiURL: ['<PROVIDE_API_URL>', { option: true }],
  dbCONFIG: [{}, { option: true }],
})
