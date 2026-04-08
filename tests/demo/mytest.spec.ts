import { test, expect } from "@playwright/test";

test("should load home page with correct title", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await expect(page).toHaveTitle("CURA Healthcare Service");

  await page.waitForLoadState("networkidle");
});

test("should load home page and verify heading", async ({ page }) => {
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

  await page.waitForLoadState("networkidle");
});

test(
  "should do some action and verify result",
  { tag: ["@smoke"] },
  async ({ page }) => {
    console.log("This is a smoke test");
  },
);

test.only("should demo locators some action and verify result", async ({ page }) => {
  // 1.  launch the application and verify the title
  await page.goto("https://katalon-demo-cura.herokuapp.com/");
  await expect(page).toHaveTitle("CURA Healthcare Service");

  //click on make appointment link
  let makeAppointmentLink = page.getByRole("link", {
    name: "Make Appointment",
  });
  console.log(`>> the type of locator is: ${typeof makeAppointmentLink}, the value of locator is: ${JSON.stringify(makeAppointmentLink)}`);
  await makeAppointmentLink.click();
  await expect(
    page.getByText("Please login to make appointment."),
  ).toBeVisible();
  await expect(
    page.getByRole('heading', { name: 'We Care About Your Health' })
  ).toBeVisible();
});
