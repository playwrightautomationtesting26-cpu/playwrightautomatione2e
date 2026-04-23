import { test, expect } from "@playwright/test";
/**
 * **Scenario:**
1. Login as standard user
2. Get a list of products with its price
3. Assert that all products have non-zero dollar value
    * **Expected Result:**
    * All products should have a price greater than zero
 */

test.describe("Inventory Functionality", () => {
  
  test.beforeEach(
    "Login with valid credentials in Inventory Functionality ",
    async ({ page }) => {
      // 1.  launch the application and verify the title
      await page.goto("https://www.saucedemo.com/");
      await expect(page).toHaveTitle("Swag Labs");

      // 2. fill in the login form and submit
      await page.locator("#user-name").fill("standard_user");
      await page.locator("#password").fill("secret_sauce");
      await page.getByRole("button", { name: "Login" }).click();
      await expect(page.getByText("Products")).toBeVisible();

      //await expect(page).toHaveURL("https://www.saucedemo.com/inventory.html");
      // Assertion: URL should contain 'inventory.html' using regex match
      await expect(page).toHaveURL(/.*\/inventory/);
      page.waitForLoadState("networkidle");
    },
  );

  test("Should confirm all products have non-zero prices", async ({ page }) => {
    // 2. Get a list of products
    let productDetails = page.locator(".inventory_item");
    await expect(productDetails).toHaveCount(6);

    // Get the product name and price for each product
    let totalProducts = await productDetails.count();
    let priceArray: any = [];

    for (let i = 0; i < totalProducts; i++) {
      // Process each product
      let productDetail = productDetails.nth(i);

      // product name
      let productName = await productDetail
        .locator(".inventory_item_name")
        .innerText();
      // product price
      let productPrice = await productDetail
        .locator(".inventory_item_price")
        .innerText();
      // print product name and price
      console.log(`Product ${i + 1}: ${productName} - Price: ${productPrice}`);

      priceArray.push(productPrice);
      console.log(`Original Price array: ${priceArray}`);

      priceArray.map((price: any) => {
        let priceValue = parseFloat(price.replace("$", ""));
        console.log(`Extracted price value: ${priceValue}`);

        if (priceValue <= 0) {
          console.log(`ERROR: Invalid price found: ${priceValue}`);
        } else {
          console.log(`INFO: All prices are valid and greater than zero.`);
        }
        expect(priceValue).toBeGreaterThan(0);
      });

      // // extract numeric price value
      // let priceValue = parseFloat(productPrice.replace("$", ""));
      // priceArray.push(priceValue);
      // // Assertion: price should be greater than zero
      // expect(priceValue).toBeGreaterThan(0);
    }
    // // 2. get a list of products with its price
    // const productName = page.locator(".inventory_item_name");
    // console.log(`Name of the products: ${await productName.allTextContents()}`);
    // const productPrices = page.locator(".inventory_item_price");
    // console.log(
    //   `Prices of the products: ${await productPrices.allTextContents()}`,
    // );
    // const count = await productPrices.count();
    // console.log(`Total products found: ${count}`);

    // // 3. Assert that all products have non-zero dollar value
    // for (let i = 0; i < count; i++) {
    //   const priceText = await productPrices.nth(i).textContent();
    //   const productNameText = await productName.nth(i).textContent();
    //   console.log(
    //     `Product ${i + 1} : (${productNameText}) price text: ${priceText}`,
    //   );
    //   const priceValue = parseFloat(priceText?.replace("$", "") || "0");
    //   console.log(
    //     `Product ${i + 1} : (${productNameText}) price value: ${priceValue}`,
    //   );
    //   // Assertion: price should be greater than zero
    //   expect(priceValue).toBeGreaterThan(0);
    // }
    page.waitForLoadState("networkidle");
  });
  
});
