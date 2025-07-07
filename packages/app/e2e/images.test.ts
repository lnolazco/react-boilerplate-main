import { expect, test } from "@playwright/test";

test("upload image", async ({ page }) => {
  await page.goto("/");
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.getByText(/select files/).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles("e2e/assets/mini-falcon.png");
  await expect(page.getByAltText(/mini-falcon/)).toBeVisible();
});

test("move image to folder", async ({ page }) => {
  await page.goto("/");

  // upload image
  const fileChooserPromise = page.waitForEvent("filechooser");
  await page.getByText(/select files/).click();
  const fileChooser = await fileChooserPromise;
  await fileChooser.setFiles("e2e/assets/mini-falcon.png");
  await expect(page.getByAltText(/mini-falcon/)).toBeVisible();

  // create folder
  await page
    .getByRole("button", {
      name: "Create folder",
    })
    .click();
  const folderName = "My folder";
  await page.getByLabel("Folder name").fill(folderName);
  await page.getByRole("button", { name: "Create" }).click();
  await page.waitForURL(/\/folders\/[a-z0-9-]+/);
  await expect(page.getByAltText(/mini-falcon/)).not.toBeVisible();

  // move image to folder
  await page.getByRole("link", { name: "All images" }).click();
  const gallery = page.getByTestId("gallery");
  const firstImage = gallery.getByRole("checkbox", { name: "Select image" });
  await firstImage.click();
  await page.getByRole("button", { name: /move [0-9]+ images?/i }).click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await dialog.getByRole("button", { name: folderName }).click();
  await expect(dialog).not.toBeVisible();

  // check image is in folder
  await page.getByRole("link", { name: folderName }).click();
  await page.waitForURL(/\/folders\/[a-z0-9-]+/);
  await expect(page.getByAltText(/mini-falcon/)).toBeVisible();
});
