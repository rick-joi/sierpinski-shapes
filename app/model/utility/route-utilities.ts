import { MetaFunction } from "@remix-run/react";

export function getMeta(pageName: string, description: string): MetaFunction {
  return () => {
    return [{ title: `${pageName} — Sierpinski Shapes` }, { name: "description", content: description }];
  };
}
