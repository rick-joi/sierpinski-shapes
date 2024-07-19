import { MetaFunction } from "@remix-run/react";

export function getMeta(pageName: string, description: string): MetaFunction {
  return () => {
    return [{ title: `${pageName} — Sierpinski Shapes` }, { name: "description", content: description }];
  };
}

export function getParameterIntOrNull(
  searchParams: URLSearchParams,
  key: string,
  defaultValue: number | null
): number | null {
  //
  const value = searchParams.get(key);
  if (value === null) {
    return defaultValue;
  }
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    return null;
  }
  return parsedValue;
}

export function getParameterInt(searchParams: URLSearchParams, key: string, defaultValue: number): number {
  //
  const value = searchParams.get(key);
  if (value === null) {
    return defaultValue;
  }
  const parsedValue = parseInt(value, 10);
  if (isNaN(parsedValue)) {
    return defaultValue;
  }
  return parsedValue;
}
