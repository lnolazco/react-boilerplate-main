import loadImage, { LoadImageResult } from "blueimp-load-image";
import { makeAutoObservable, runInAction } from "mobx";
import { v4 as uuidv4 } from "uuid";

const BASE64_IMAGE_HEADER = "data:image/png;base64,";
const STORAGE_KEY = "photoroom-image-store";

export interface Image {
  id: string;
  name?: string;
  base64: string;
  folderId?: string;
}

export interface Folder {
  id: string;
  name: string;
}

// Data schemas for serialization
export type SerializedImage = Image;
export type SerializedFolder = Folder;

export interface SerializedState {
  images: SerializedImage[];
  folders: SerializedFolder[];
}

export class ImageStore {
  private _images: Map<string, Image> = new Map();
  private _folders: Map<string, Folder> = new Map();
  private uploadQueue: Array<{ file: File; folderId?: string }> = [];
  private isUploading: boolean = false;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  get folders() {
    return Array.from(this._folders.values());
  }

  get images() {
    return Array.from(this._images.values());
  }

  uploadMultipleImages = (files: File[], folderId?: string) => {
    files.forEach((file) => this.uploadQueue.push({ file, folderId }));
    this.processUploadQueue();
  };

  getImagesInFolder = (folderId?: string): Image[] => {
    const output = Array.from(this._images.values());
    if (folderId) {
      return output.filter((image) => image.folderId === folderId);
    }
    return output;
  };

  moveImages(imageIds: string[], targetFolderId?: string) {
    for (const imageId of imageIds) {
      const image = this._images.get(imageId);
      if (image) {
        this._images.set(imageId, { ...image, folderId: targetFolderId });
      }
    }
  }

  deleteImages(imageIds: string[]) {
    for (const imageId of imageIds) {
      this._images.delete(imageId);
    }
  }

  createFolder = (name: string): string => {
    const newFolder: Folder = {
      id: uuidv4(),
      name,
    };
    this._folders.set(newFolder.id, newFolder);
    return newFolder.id;
  };

  getFolder(folderId: string) {
    return this._folders.get(folderId);
  }

  renameFolder(folderId: string, newName: string) {
    const folder = this._folders.get(folderId);
    if (folder) {
      this._folders.set(folderId, { ...folder, name: newName });
    }
  }

  deleteFolder(folderId: string) {
    const folder = this._folders.get(folderId);
    if (folder) {
      this._folders.delete(folderId);
    }
  }

  private async processUploadQueue() {
    if (this.isUploading || this.uploadQueue.length === 0) return;

    this.isUploading = true;
    while (this.uploadQueue.length > 0) {
      const { file, folderId } = this.uploadQueue.shift()!;
      await this.uploadImageToServer(file, folderId);
    }
    this.isUploading = false;
  }

  uploadImageToServer = async (file: File, folderId?: string) => {
    try {
      const imageData: LoadImageResult = await loadImage(file, {
        maxWidth: 400,
        maxHeight: 400,
        canvas: true,
      });

      const image = imageData.image as HTMLCanvasElement;
      const imageBase64 = image.toDataURL("image/png");
      const imageBase64Data = imageBase64.replace(BASE64_IMAGE_HEADER, "");
      const data = {
        image_file_b64: imageBase64Data,
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_HOST}/v1/segment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "x-api-key": import.meta.env.VITE_API_KEY,
          },
          body: JSON.stringify(data),
        }
      );

      if (response.status >= 400 && response.status < 600) {
        throw new Error("Bad response from server");
      }

      const result = await response.json();
      const base64Result = BASE64_IMAGE_HEADER + result.result_b64;
      const newImage: Image = {
        id: result.id || uuidv4(),
        name: file.name,
        base64: base64Result,
        folderId,
      };
      runInAction(() => {
        this._images.set(newImage.id, newImage);
      });
    } catch (error) {
      console.error(error);
      throw error; // Re-throw for error handling in UI
    }
  };

  // --- Serialization/Deserialization ---
  /**
   * Export the current state to a plain object for storage.
   */
  serialize(): SerializedState {
    return {
      images: Array.from(this._images.values()),
      folders: Array.from(this._folders.values()),
    };
  }

  /**
   * Load state from a plain object (e.g., from localStorage).
   * This replaces the current state.
   */
  deserialize(state: SerializedState) {
    this._images = new Map(state.images.map((img) => [img.id, img]));
    this._folders = new Map(state.folders.map((folder) => [folder.id, folder]));
  }

  /**
   * Save the current state to localStorage.
   */
  saveToStorage() {
    const state = this.serialize();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  /**
   * Load state from localStorage, if present. Returns true if loaded, false if not.
   */
  static loadFromStorage(): SerializedState | null {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    try {
      const state = JSON.parse(raw);
      if (
        state &&
        Array.isArray(state.images) &&
        Array.isArray(state.folders)
      ) {
        return state;
      }
    } catch (e) {
      // Ignore parse errors
    }
    return null;
  }
}

export const imageStore = new ImageStore();
