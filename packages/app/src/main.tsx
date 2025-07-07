import { createRouter, RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@repo/ui/styles/tailwind.css";

import { routeTree } from "./routeTree.gen";

// Init router
export const router = createRouter({ routeTree, defaultPreload: "viewport" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Render app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
