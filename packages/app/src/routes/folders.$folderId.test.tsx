import "@testing-library/jest-dom";
import { render, screen, fireEvent, within } from "@testing-library/react";
import React from "react";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";

// Mock imageStore and navigation
vi.mock("../stores/ImageStore", async () => {
  const actual = await vi.importActual<any>("../stores/ImageStore");
  return {
    ...actual,
    imageStore: {
      ...actual.imageStore,
      getFolder: () => ({ id: "f1", name: "Folder 1" }),
      deleteFolder: vi.fn(),
      get folders() {
        return [{ id: "f1", name: "Folder 1" }];
      },
    },
  };
});
vi.mock("@tanstack/react-router", async () => {
  const actual = await vi.importActual<any>("@tanstack/react-router");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});
import { imageStore } from "../stores/ImageStore";

describe("Folder deletion confirm modal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows confirm modal and deletes folder only on confirm", async () => {
    // Use the same routeTree as the app
    const router = createRouter({
      routeTree,
      basepath: "/",
      context: {},
    });
    await router.navigate({
      to: "/folders/$folderId",
      params: { folderId: "f1" },
    });
    render(<RouterProvider router={router} />);
    // Wait for the header delete button to appear and click it
    const headerDeleteBtn = (
      await screen.findAllByRole("button", { name: "Delete folder" })
    )[0];
    fireEvent.click(headerDeleteBtn);
    // Wait for the modal content to appear
    expect(
      await screen.findByText(/delete all subfolders and images/i)
    ).toBeInTheDocument();
    // Cancel should close modal, not delete
    fireEvent.click(screen.getByText("Cancel"));
    expect(imageStore.deleteFolder).not.toHaveBeenCalled();
    // Open again and confirm
    fireEvent.click(
      (await screen.findAllByRole("button", { name: "Delete folder" }))[0]
    );
    // Wait for the dialog to appear
    const dialog = await screen.findByRole("dialog");
    const confirmDeleteBtn = within(dialog).getByRole("button", {
      name: "Delete folder",
    });
    fireEvent.click(confirmDeleteBtn);
    expect(imageStore.deleteFolder).toHaveBeenCalledWith("f1");
  });
});
