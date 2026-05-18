import { createFileRoute } from "@tanstack/react-router";

// Routing is handled by react-router-dom inside __root.tsx
export const Route = createFileRoute("/")({
  component: () => null,
});
