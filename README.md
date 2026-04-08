# Instructions and Notes

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
- example.*
- *.log

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