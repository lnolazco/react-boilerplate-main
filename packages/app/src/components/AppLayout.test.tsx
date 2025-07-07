import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AppLayout } from "./AppLayout";
import React from "react";
import {
  RouterProvider,
  createRouter,
  createRootRoute,
  createRoute,
  Outlet,
} from "@tanstack/react-router";

describe("AppLayout", () => {
  it("renders children", async () => {
    // Root route renders AppLayout with Outlet
    const rootRoute = createRootRoute({
      component: () => (
        <AppLayout>
          <Outlet />
        </AppLayout>
      ),
    });
    // Child route renders test content
    const testRoute = createRoute({
      getParentRoute: () => rootRoute,
      path: "/",
      component: () => <>Test Content</>,
    });
    const routeTree = rootRoute.addChildren([testRoute]);
    const router = createRouter({ routeTree });
    await router.navigate({ to: "/" });
    render(<RouterProvider router={router} />);
    expect(await screen.findByText("Test Content")).toBeInTheDocument();
  });
});
