import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { ImagesList } from "./ImagesList";
import React from "react";

// Mock imageStore
vi.mock("../stores/ImageStore", async () => {
  const actual = await vi.importActual<any>("../stores/ImageStore");
  return {
    ...actual,
    imageStore: {
      ...actual.imageStore,
      getImagesInFolder: () => [
        { id: "1", name: "img1", base64: "data1" },
        { id: "2", name: "img2", base64: "data2" },
      ],
      deleteImages: vi.fn(),
      folders: [],
    },
  };
});
import { imageStore } from "../stores/ImageStore";

describe("ImagesList - Delete selected confirm modal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows confirm modal and deletes images only on confirm", async () => {
    render(<ImagesList />);
    // Select first image
    fireEvent.click(screen.getAllByRole("checkbox")[0]);
    // Open delete dialog
    fireEvent.click(screen.getByText("Delete selected"));
    // Modal should appear
    expect(
      screen.getByText(/permanently delete the selected images/i)
    ).toBeInTheDocument();
    // Cancel should close modal, not delete
    fireEvent.click(screen.getByText("Cancel"));
    expect(imageStore.deleteImages).not.toHaveBeenCalled();
    // Open again and confirm
    fireEvent.click(screen.getByText("Delete selected"));
    fireEvent.click(screen.getByText("Delete images"));
    expect(imageStore.deleteImages).toHaveBeenCalledWith(["1", "2"]);
  });
});
