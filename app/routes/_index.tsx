import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [{ title: "Sierpinski Shapes" }, { name: "description", content: "Create your own Sierpinski Shape!" }];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Sierpinski Shapes</h1>
      <p>Coming soon...</p>
    </div>
  );
}
