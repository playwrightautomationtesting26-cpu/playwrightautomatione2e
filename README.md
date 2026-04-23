# Instructions and Notes

## Github link: https://github.com/playwrightautomationtesting26-cpu

## Execute Typescript file: npx tsx debug/play.ts

## ctrl+k+0 --> collase the code

## ctrl+k+j --> expand the code

## windows + . --> open the emoji

## In this session

**Setup Git Repo**

1. Git commands

- `git init`
- `git status`
- `git add`
- `git commint -m "<commit-message>"`

2. git ignore the folowing files

- /debug
- logs/
- .env
- allure-results
- tests-examples/
- example.\*
- \*.log

1. Git commands

- `git branch -M main`
- `git remote add origin <remote-url>`
- `git remote -v`
- `git push -u origin main`

2. Issues

- `git config --list`
- `git push -f origin main` --> force push

3. Remember this - `ACP` - `Add commit push`

**Option 1 - Install VS code Extension**

1. VS code Extension -> `plyawright Test for VSCode`

**Option 2 - CLI**

- Help -> `npx playwright codegen --help`
- CLI basic command - `npx playwright codegen`
- With URL `npx playwright codegen https://katalon-demo-cura.herokuapp.com/`

**Deep drive into playwright session**

- [] ✔ `page.getBy*()` and `page.locator()` methods returns the locator `object`
- [] ✔ The above methods not to be `awaited` as it does not return a promise
- [] ✔ The type of locator is an `object`
- [] ✔ Locators are LAZY until an action is fired on them

## In this session...

**Interacting with Web Elements**

- codgen CLI: `npx playwright codegen https://katalon-demo-cura.herokuapp.com/`

## In this session...

**Interacting over list of Web Elements**

- codgen CLI: `npx playwright codegen https://www.saucedemo.com/`

**Scenario:**

1. Login as standard user
2. Get a list of products with its price
3. Assert that all products have non-zero dollar value

## In this session...

**Allure Setup**

1. check if allure is installed globally --> `allure --version`, if not present
2. Install allure commandline globally --> `npm install -g allure-commandline`
3. Install 'Allure' Reporter for project level - `npm install -D allure-playwright`
4. Add it in the config file

reporter: [
['html'], // Default Playwright HTML report
['allure-playwright'] // Allure report
],

5. Run a test and config that the new folder is created
6. Spin up the report --> `allure serve`
7. Done

## In this session...

1.  Config options --> `use` --> `screenshot`
2.  At test scope level

## In this session...

**Advanced Debugging - PW API level**

- Set `DEBUG=pw:api` to view the API level logs
- Other namespaces exist too, e.g. `pw:browser*, pw:channel*, pw:protocol*`

## In this session...

### Pseudo-code

1. [] Create `global-setup.ts`
2. [] as per the rule, export a single function that takes a config object
3. [] Delete allure report
   - [] Get the `allure-report` path
   - [] Use `path` module to get the path
   - [] Use `fs` native module's sync method `existsSync, rmSync` to delete files
4. [] Link it to `config` file
5. [] Run a simple test to confirm if allure results is deleted
6. [] Add a `RUNNER` in `.env`
7. [] Install `dotenv` package and load it in config file
8. [] Add a logic to delete only for `local` runs
9. Done

## In this session...

### Pseudo-code

1. Create `global-teardown.ts` under `helper`
2. Link it to the `config`
3. Done

## In this session...

**Understanding playwright parallelism**

1. Do you know number of CPU of your current machine?
   1. `node -e "console.log('CPU cores: ', require('os').cpus().length )" `

2. Do you know how many tests you have in the current projects?
   1. `npx playwright test --list`

3. What are the key components/settings affect the parall runs?

4. Reference: https://playwright.dev/docs/test-parallel
5. Done!

## In this session...

**Setting up tsconfig.json file**

1. Create `tsconfig.json` file in the root dir
2. Have the following content
3. Reference: https://www.typescriptlang.org/tsconfig/

## In this session...

**Handling Static/Constants Data**

1. Keep all Constant/Static data in `constants.json` under the `/data` folder
2. Start importing the `json` when required
3. Done!

## In this session...

**Paramerterizing Tests - forEach Dataset**

1. Create `test-data.ts` file under `/data` folder
2. Create e class `TestData` and create a `static` method
3. Update test data combo

```
/**

* Test data combinations
*
* 1. Dropdown
* - Tokyo CURA Healthcare Center
* - Hongkong CURA Healthcare Center
* - Seoul CURA Healthcare Center
*
* 2. Healthcare Program
* - Medicare
* - Medicaid
* - None
*
* 3. Different date
* - 05/10/2028
* - 05/10/2029
* - 05/10/2030
*
**/
```

**Execute typescript file `npx tsx debug/play.ts `**

4. Access the data confirm the iteration
5. Apply it to `spec` file
6. Done!

## In this session...

**Global Data setup - Dynamic Data\_**

1. Intialize a global varible in `global-setup.ts` file
2. Set anywhere in projects using `node.process.<KEY>`
3. Access is anywhere, optionally we can reset in `global-teardown.ts` file
4. Done!

## In this session...

**Handling Environment specific data**

**Steps to follow**:
**Create a config fixture**:

1. Create a new fixture `config-fixtures.ts` under `/helpers`
2. follow the docs and
   1. Define `EnvConfig` type and target fields
   2. [Rule]: `Define an option and provide a default value.`

The existing `test` function will extend the custom varibles

**Create a new config**

1. Create e new config file `test.playwright.config.ts` under `/config` folder
2. [Rule]: There should be one function that has to `export default defineConfig`
3. Change the root config export to
   1. ``export default defineConfig({})` --> `export const baseConfig = defineCnfig({})``
      4.Import `root` config `import {baseConfig} from "../playwright.config,ts`
4. Extend the root setting with `spread opeartor`

The new `config` will extend the old config setting

### Session 2: Run test with New Env Config

1. Import the `EnvConfig` from helper folder
2. Extend the new config to extend the `EnvConfig` type
3. Add the custom env varibles under `use` object to the config
   1. e.g. `https://katalon-demo-cura.herokuapp.com/`
4. Run the command below and confirm the number of tests
   1. `npx playwright test --config=config/test.playwright.config.ts --list`
5. You would see `Error: No tests found` - why?
   1. Update `testDir`
6. Use the varible in `spec` file
7. Add a new key in `scripts` section with `--config` option
8. Try with new `env` config file and run and prove it works
9. Done!

## In this session...

**Handling Sensitive Data**

1. Click or install if `dotenv` if not
   1. `npm install -D dotenv`
2. Set the varibles in `.env` config file
3. Start using them with `process.env.<varname>`
4. Done!

## In this session...

### Pseudocode

1. ✔ Create a `.csv` file with test data
2. Read the file with native `fs` module
3. parse the csv data -> Array of data (install csv-parse) ->(npm i --save-dev csv-parse )
4. console out the data
5. Done!

**Reference**

1. Nodejs Doco: https://nodejs.org/docs/latest/api/fs.html

## In this session...

**Logger Setup**

1. Install chalk --> `npm i --save-dev chalk`
2. Create a file `tests/helpers/logger.ts`
3. Import the log function and start logging
4. Run a test and see the logs
5. Done!

**Note: Command: npm install chalk@4**

## In this session...

**Record Test Execution Flow**

1. Record the login flow using `https://admin-demo.nopcommerce.com/login?` / `https://www.saucedemo.com/` app
2. Add URL Assertion
3. Runa nd confirm if it works
4. Done!

standard_user
secret_sauce

## In this session...

**Implementing the Page Objecr Model**

1. Create a new page objects `nopCommerce.home.page.ts` / `Saucedemo.home.page.ts` under `/tests/page-objects`
2. Import the `BasePage` to make use already defined actions
3. Create the page object from the reocored flow

## In this session...

**Creating the Tests Using Page Objects**

1. Create `tests/e2e/nopCommerce.e2e.spec.ts` and put in under `e2e`
2. Import the `HomePage`and make a login flow
3. place the data at appropriate places
   1. URL--> `config` file
   2. Creds --> `.env`
4. Done!

## In this session...

**GET Method - Example**

1. Crate a new spec file `tests/api/users.api.spec.ts`
2. Make a `Get` call
3. Confirm if it works
4. Done!

## In this session...

**E2E Test - Complete Page Objects**

1. Capture the customer search flow using codegen for the web app: `https://admin-demo.nopcommerce.com/login?`
2. Copy the existing `Page-Objects` and re-use the format
3. Done!

## In this session...

**Running the E2E Test Success**

1. Get the API key and update `.env` file
2. Add the following setting in `playwright.config.ts`

// Use object
userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",

// Project object
`args: [
            '--start-maximized',
            '--disable-notifications',
            '--disable-blink-features=AutomationControlled',
            '--disable-infobars',
            '--window-size=1920,1080',
            '--user-agent=Custom Agent',
            // All args should start with -- or be valid flags
            // NO plain URLs!
          ]`

1. Re-run the test
2. Test ✔

## In this session...

**📌GitHub copilot Setting**

**Pre-Requisite**

1. Sould have a valid `github` credentials
2. Latest VSCode installed (`command palette --> Help:About`)

**Check**

1. The signed-in user in VS Code
2. GitHub --> Profiles should yourcurrent plan
3. Done!🎉

## In this session...

**Playwright MCP Server SetUp**

1. Create `.VSCode/mcp.json` in the workspace
2. This config has two structure

```json
"servers": {} - Contains the list of MCP servers and their configurations
"inputs" : {} - Optional placeholders for sensitive information like API keys
```

3. Add the playwright MCP server config
4. Done! 🎉

## In this session...

**Playwright MCP server - In Action**

1. Create a new spec file called `multi.window.spec.ts` under Functional folder
2. And capture the flow as below:
   - Navigate to the site: `https://the-internet.herokuapp.com/`
   - Click on 'Multiple Windows' link
   - Navigate to the newly opened window and assert the haeder
   - Click the link on that new window
   - Navigate to the next window that is opened
   - Assert the header text
   - come back to the parent window
3. Add a new key in `package.json` file'
4. And run the spec in `headed` mode

## In this session...

## Playwright Test Agents - Installation

**Pre-check**

1. Vs Code version (>`1.105.0`) -> Update if required
2. Check the playwright version - goog to have it latest

```sh

1. npx playwright --version # Returns current version
2. npm view playwright version # Returns latest version
```

3. Update Playwright(recommended)

```sh


npm install -D @playwright/test@latest
npx playwright install

```

**Installation steps**

1. Run `npx playwright init-agents --loop=vscode`
2. check the generated files
3. Done!

### Ref:

- [Updating playwright](https://playwright.dev/docs/intro#updating-playwright)
- [Playwright Agents](https://playwright.dev/docs/test-agents)
- [Agents md](https://github.com/agentsmd/agents.md?tab=readme-ov-file)
