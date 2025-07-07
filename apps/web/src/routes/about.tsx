import { useEmployees } from "@/hooks/useEmployees1";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const { data, loading } = useEmployees({ });
  if (loading) {
    return <div>Loading</div>;
  } else {
    console.log(data)
  }
  return <div className="p-2"></div>;
}
