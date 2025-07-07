import { expect, test } from "@playwright/test";

test("create and delete folder", async ({ page }) => {
  await page.goto("/");

  // create folder
  const folderName = "My folder";
  await page
    .getByRole("button", {
      name: "Create folder",
    })
    .click();
  const dialog = page.getByRole("dialog", { name: "New folder" });
  await expect(dialog).toBeVisible();
  await page.getByLabel("Folder name").fill(folderName);
  await page.getByRole("button", { name: "Create" }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/\/folders\/[a-z0-9-]+/);

  // delete folder
  await page.getByRole("button", { name: "Delete folder" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("link", { name: folderName })).not.toBeVisible();
});
