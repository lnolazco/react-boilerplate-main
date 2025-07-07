import { Divider, Heading } from "@repo/ui";
import { createFileRoute } from "@tanstack/react-router";

import { ImagesList } from "../components/ImagesList";

export const Route = createFileRoute("/")({
  component: () => <RouteComponent />,
});

const RouteComponent = () => {
  return (
    <section className="space-y-4">
      <header className="flex items-center justify-between gap-2">
        <Heading level={1}>All images</Heading>
      </header>
      <Divider />
      <ImagesList />
    </section>
  );
};
