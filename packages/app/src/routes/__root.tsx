import { createRootRoute, Outlet } from "@tanstack/react-router";

import { AppLayout } from "../components/AppLayout";

export const Route = createRootRoute({
  component: () => <RootComponent />,
});

const RootComponent = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};
