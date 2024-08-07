import { Rotations } from "~/model/_shared/rotations";

export type BackgroundColorType = "auto" | "transparent" | "custom";

export const DEFAULTS = {
  ITERATIONS: 1,
  ROTATIONS: {
    topLeft: 0,
    topRight: null,
    bottomLeft: 0,
    bottomRight: 0,
  },
  COLOR: "#000000",
  BACKGROUND_COLOR_TYPE: "auto" as BackgroundColorType,
  BACKGROUND_COLOR: "#ffffff",
};
export const MAX_ITERATIONS = 8;

export function getStageId(stage: number, prefix: string) {
  return `${prefix}Stage${stage}`;
}

export function getCreateShapeUrl(rotations: Rotations, iterations: number, color?: string | undefined) {
  //
  let variables: string[] = [];

  variables.push(DEFAULTS.ITERATIONS === iterations ? "" : "i=" + iterations);
  variables.push(formatRotation("tl", rotations.topLeft, DEFAULTS.ROTATIONS.topLeft));
  variables.push(formatRotation("tr", rotations.topRight, DEFAULTS.ROTATIONS.topRight));
  variables.push(formatRotation("bl", rotations.bottomLeft, DEFAULTS.ROTATIONS.bottomLeft));
  variables.push(formatRotation("br", rotations.bottomRight, DEFAULTS.ROTATIONS.bottomRight));
  variables.push(formatColor(color));

  variables = variables.filter((v) => v.length > 0);

  return "/create" + (variables.length === 0 ? "" : "?" + variables.join("&"));
}

function formatRotation(key: string, rotation: number | null, defaultValue: number | null) {
  //
  if (rotation === defaultValue) {
    return "";
  } else if (rotation === null) {
    return key + "=-";
  } else {
    return key + "=" + Math.round(rotation).toString();
  }
}

function formatColor(color: string | undefined) {
  //
  if (color === undefined || color === DEFAULTS.COLOR) {
    return "";
  } else {
    return "c=" + (color.startsWith("#") ? color.slice(1) : color);
  }
}
