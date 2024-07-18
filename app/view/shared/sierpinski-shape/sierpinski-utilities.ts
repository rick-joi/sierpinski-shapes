import { Rotations } from "~/model/shared/rotations";

export const DEFAULT_ROTATIONS: Rotations = {
  topLeft: 0,
  topRight: null,
  bottomLeft: 0,
  bottomRight: 0,
};
export const DEFAULT_ITERATIONS = 1;
export const MAX_ITERATIONS = 8;
export const DEFAULT_COLOR = "#000000";

export function getStageId(stage: number, prefix: string) {
  return `${prefix}Stage${stage}`;
}

export function getCreateShapeUrl(rotations: Rotations, iterations: number, color?: string | undefined) {
  //
  let variables: string[] = [];
  variables.push(DEFAULT_ITERATIONS === iterations ? "" : "i=" + iterations);
  variables.push(formatRotation("tl", rotations.topLeft, DEFAULT_ROTATIONS.topLeft));
  variables.push(formatRotation("tr", rotations.topRight, DEFAULT_ROTATIONS.topRight));
  variables.push(formatRotation("bl", rotations.bottomLeft, DEFAULT_ROTATIONS.bottomLeft));
  variables.push(formatRotation("br", rotations.bottomRight, DEFAULT_ROTATIONS.bottomRight));
  variables.push(DEFAULT_COLOR === color || undefined === color ? "" : "c=" + encodeURIComponent(color));
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
