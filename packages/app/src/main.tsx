import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@repo/ui/styles/tailwind.css";

import { routeTree } from "./routeTree.gen";
import { imageStore, ImageStore } from "./stores/ImageStore";
import { reaction } from "mobx";

// Init router
export const router = createRouter({ routeTree, defaultPreload: "viewport" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Load persisted state on startup
const persisted = ImageStore.loadFromStorage();
if (persisted) {
  imageStore.deserialize(persisted);
}

// Save to storage on every change to images or folders
reaction(
  () => [imageStore.images, imageStore.folders],
  () => {
    imageStore.saveToStorage();
  }
);

// Render app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
