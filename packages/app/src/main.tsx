import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode, useEffect, useState } from "react";
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

function AppWithHydration() {
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    // Simulate async hydration (future-proofing)
    const persisted = ImageStore.loadFromStorage();
    if (persisted) {
      imageStore.deserialize(persisted);
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    // Save to storage on every change to images or folders
    const disposer = reaction(
      () => [imageStore.images, imageStore.folders],
      () => {
        imageStore.saveToStorage();
      }
    );
    return () => disposer();
  }, []);

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading...
      </div>
    );
  }
  return <RouterProvider router={router} />;
}

// Render app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppWithHydration />
  </StrictMode>
);
