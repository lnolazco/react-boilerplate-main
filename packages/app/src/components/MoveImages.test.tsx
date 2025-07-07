import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MoveImages } from "./MoveImages";
import React from "react";

vi.mock("../stores/ImageStore", async () => {
  const actual = await vi.importActual<any>("../stores/ImageStore");
  return {
    ...actual,
    imageStore: {
      ...actual.imageStore,
      getRootFolders: () => [{ id: "1", name: "Root" }],
      getChildFolders: (parentId: string) =>
        parentId === "1"
          ? [
              { id: "2", name: "Child", parentId: "1" },
              { id: "3", name: "Child2", parentId: "1" },
            ]
          : [],
      folders: [
        { id: "1", name: "Root" },
        { id: "2", name: "Child", parentId: "1" },
        { id: "3", name: "Child2", parentId: "1" },
      ],
      moveImages: vi.fn(),
    },
  };
});
import { imageStore } from "../stores/ImageStore";

describe("MoveImages - Folder hierarchy", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders root and child folders with indentation", () => {
    render(<MoveImages imageIds={["img1"]} />);
    // Root folder
    expect(screen.getByText("Root")).toBeInTheDocument();
    // Child folders
    expect(screen.getByText("Child")).toBeInTheDocument();
    expect(screen.getByText("Child2")).toBeInTheDocument();
    // Check indentation (pl-8 for depth 1)
    expect(screen.getByText("Child").parentElement).toHaveClass("pl-8");
    expect(screen.getByText("Child2").parentElement).toHaveClass("pl-8");
  });

  it("calls moveImages with correct folder id when a folder is clicked", async () => {
    const onSuccess = vi.fn();
    render(<MoveImages imageIds={["img1"]} onSuccess={onSuccess} />);
    const user = userEvent.setup();
    await user.click(screen.getByText("Child"));
    expect(imageStore.moveImages).toHaveBeenCalledWith(["img1"], "2");
    expect(onSuccess).toHaveBeenCalledWith("2");
  });
});
