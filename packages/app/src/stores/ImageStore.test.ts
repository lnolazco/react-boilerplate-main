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

describe("ImageStore persistence (localStorage)", () => {
  const STORAGE_KEY = "photoroom-image-store";
  let originalLocalStorage: Storage;
  let localStorageMock: any;

  beforeEach(() => {
    // Mock localStorage
    originalLocalStorage = global.localStorage;
    let store: Record<string, string> = {};
    localStorageMock = {
      getItem: (key: string) => store[key] || null,
      setItem: (key: string, value: string) => {
        store[key] = value;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      },
    };
    // @ts-ignore
    global.localStorage = localStorageMock;
  });

  afterEach(() => {
    // @ts-ignore
    global.localStorage = originalLocalStorage;
  });

  it("saves state to localStorage", () => {
    const store = new ImageStore();
    const folder: Folder = { id: "f1", name: "Folder" };
    const image: Image = {
      id: "i1",
      name: "img.png",
      base64: "data",
      folderId: "f1",
    };
    (store as any)._folders.set(folder.id, folder);
    (store as any)._images.set(image.id, image);
    store.saveToStorage();
    const saved = localStorageMock.getItem(STORAGE_KEY);
    expect(saved).toBe(JSON.stringify({ images: [image], folders: [folder] }));
  });

  it("loads state from localStorage", () => {
    const state: SerializedState = {
      images: [{ id: "i1", name: "img.png", base64: "data", folderId: "f1" }],
      folders: [{ id: "f1", name: "Folder" }],
    };
    localStorageMock.setItem(STORAGE_KEY, JSON.stringify(state));
    const loaded = ImageStore.loadFromStorage();
    expect(loaded).toEqual(state);
  });

  it("returns null if nothing in storage", () => {
    localStorageMock.removeItem(STORAGE_KEY);
    expect(ImageStore.loadFromStorage()).toBeNull();
  });

  it("returns null if storage is corrupted", () => {
    localStorageMock.setItem(STORAGE_KEY, "not-json");
    expect(ImageStore.loadFromStorage()).toBeNull();
  });
});
