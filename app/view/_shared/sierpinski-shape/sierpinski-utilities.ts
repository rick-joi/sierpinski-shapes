import { Rotations } from "~/model/sierpinski-shapes/rotations";

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

export function getColorsFromUrl(url: string) {
  //
  console.log(`getColorsFromUrl(${url})`);
  const params = new URL("http://a.b" + url).searchParams; //todo: remove "http://a.b" somehow?...
  const color = getParameterStringOrUndefined(params, "c", "#");
  //todo: remove "as" somehow?...
  const backgroundColorType = getParameterStringOrUndefined(params, "bct") as BackgroundColorType | undefined;
  const backgroundColor = getParameterStringOrUndefined(params, "bc", "#");

  return { color, backgroundColorType, backgroundColor };
}

function getParameterStringOrUndefined(params: URLSearchParams, key: string, prefix: string = "") {
  return params.has(key) ? prefix + params.get(key) : undefined;
}

export function getCreateShapeUrl(
  rotations: Rotations,
  iterations: number,
  color?: string | undefined,
  backgroundColorType?: BackgroundColorType,
  backgroundColor?: string
) {
  //
  let variables: string[] = [];

  variables.push(DEFAULTS.ITERATIONS === iterations ? "" : "i=" + iterations);
  variables.push(formatRotation("tl", rotations.topLeft, DEFAULTS.ROTATIONS.topLeft));
  variables.push(formatRotation("tr", rotations.topRight, DEFAULTS.ROTATIONS.topRight));
  variables.push(formatRotation("bl", rotations.bottomLeft, DEFAULTS.ROTATIONS.bottomLeft));
  variables.push(formatRotation("br", rotations.bottomRight, DEFAULTS.ROTATIONS.bottomRight));
  variables.push(formatColor(color));
  variables.push(formatBackgroundColorType(backgroundColorType));
  variables.push(formatBackgroundColor(backgroundColorType, backgroundColor));

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

function formatBackgroundColorType(backgroundColorType: BackgroundColorType | undefined) {
  //
  if (backgroundColorType === undefined || backgroundColorType === DEFAULTS.BACKGROUND_COLOR_TYPE) {
    return "";
  } else {
    return "bct=" + backgroundColorType;
  }
}

function formatBackgroundColor(
  backgroundColorType: BackgroundColorType | undefined,
  backgroundColor: string | undefined
) {
  //
  if (
    backgroundColorType === undefined ||
    backgroundColorType == "auto" ||
    backgroundColor === undefined ||
    backgroundColor === DEFAULTS.BACKGROUND_COLOR
  ) {
    return "";
  } else {
    return "bc=" + (backgroundColor.startsWith("#") ? backgroundColor.slice(1) : backgroundColor);
  }
}
