import { ImageStore, SerializedState, Image, Folder } from "./ImageStore";

describe("ImageStore serialization", () => {
  it("serializes and deserializes state correctly", () => {
    const store = new ImageStore();
    // Add folders and images
    const folderA: Folder = { id: "f1", name: "Folder A" };
    const folderB: Folder = { id: "f2", name: "Folder B" };
    (store as any)._folders.set(folderA.id, folderA);
    (store as any)._folders.set(folderB.id, folderB);
    const image1: Image = {
      id: "i1",
      name: "img1.png",
      base64: "data1",
      folderId: "f1",
    };
    const image2: Image = {
      id: "i2",
      name: "img2.png",
      base64: "data2",
      folderId: "f2",
    };
    (store as any)._images.set(image1.id, image1);
    (store as any)._images.set(image2.id, image2);

    // Serialize
    const serialized = store.serialize();
    expect(serialized).toEqual({
      images: [image1, image2],
      folders: [folderA, folderB],
    });

    // Create a new store and deserialize
    const newStore = new ImageStore();
    newStore.deserialize(serialized);
    expect(newStore.folders).toEqual([folderA, folderB]);
    expect(newStore.images).toEqual([image1, image2]);
  });

  it("overwrites previous state on deserialize", () => {
    const store = new ImageStore();
    // Initial state
    (store as any)._folders.set("f0", { id: "f0", name: "Old Folder" });
    (store as any)._images.set("i0", {
      id: "i0",
      name: "old.png",
      base64: "old",
      folderId: "f0",
    });

    // Deserialize new state
    const newState: SerializedState = {
      images: [{ id: "i1", name: "img1.png", base64: "data1", folderId: "f1" }],
      folders: [{ id: "f1", name: "Folder A" }],
    };
    store.deserialize(newState);
    expect(store.folders).toEqual([{ id: "f1", name: "Folder A" }]);
    expect(store.images).toEqual([
      { id: "i1", name: "img1.png", base64: "data1", folderId: "f1" },
    ]);
  });
});
