import { test, expect } from "@playwright/test";

test.describe("Kanban board", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("loads with dummy data — 5 columns visible", async ({ page }) => {
    const columns = page.getByTestId("column-name");
    await expect(columns).toHaveCount(5);
    await expect(columns.nth(0)).toHaveText("Backlog");
    await expect(columns.nth(4)).toHaveText("Done");
  });

  test("adds a new card to a column", async ({ page }) => {
    // Click "Add a card" in the first column
    const addBtn = page.getByTestId("add-card-btn").first();
    await addBtn.click();

    // Fill in title
    const titleInput = page.getByTestId("add-card-title");
    await titleInput.fill("Brand new card");

    // Submit
    await page.getByTestId("add-card-submit").click();

    // Card should appear
    await expect(page.getByText("Brand new card")).toBeVisible();
  });

  test("deletes a card", async ({ page }) => {
    // Hover over first card to show delete button
    const firstCard = page.getByTestId("card").first();
    const cardTitle = await firstCard.locator("p.font-medium").textContent();

    await firstCard.hover();
    await firstCard.getByTestId("delete-card").click();

    await expect(page.getByText(cardTitle!)).not.toBeVisible();
  });

  test("renames a column", async ({ page }) => {
    const firstColumnName = page.getByTestId("column-name").first();
    await firstColumnName.click();

    const nameInput = page.getByTestId("column-name-input");
    await nameInput.fill("My Custom Column");
    await nameInput.press("Enter");

    await expect(page.getByTestId("column-name").first()).toHaveText("My Custom Column");
  });

  test("opens card modal on click and saves edits", async ({ page }) => {
    const firstCard = page.getByTestId("card").first();
    await firstCard.click();

    const modal = page.getByTestId("card-modal");
    await expect(modal).toBeVisible();

    // Edit title
    const titleInput = page.getByTestId("modal-title");
    await titleInput.fill("Updated card title");
    await page.getByTestId("modal-save").click();

    // Modal closes
    await expect(modal).not.toBeVisible();

    // Updated title visible
    await expect(page.getByText("Updated card title")).toBeVisible();
  });

  test("drag and drop card between columns", async ({ page }) => {
    // Get the first card in the Backlog column
    const sourceColumn = page.locator("[data-testid^='column-col-1']");
    const destColumn = page.locator("[data-testid^='column-col-2']");

    const firstCard = sourceColumn.getByTestId("card").first();
    const cardTitle = await firstCard.locator("p.font-medium").textContent();

    const sourceBox = await firstCard.boundingBox();
    const destBox = await destColumn.boundingBox();

    if (!sourceBox || !destBox) throw new Error("Could not get bounding boxes");

    // Simulate drag
    await page.mouse.move(
      sourceBox.x + sourceBox.width / 2,
      sourceBox.y + sourceBox.height / 2
    );
    await page.mouse.down();
    await page.mouse.move(destBox.x + destBox.width / 2, destBox.y + 50, { steps: 10 });
    await page.mouse.up();

    // Card should now be in the destination column
    await expect(destColumn.getByText(cardTitle!)).toBeVisible();
  });
});
