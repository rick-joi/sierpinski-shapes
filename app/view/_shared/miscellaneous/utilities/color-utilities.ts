export function rgbToGrayScale(color: string) {
  //
  if (!color.startsWith("#") || !(color.length === 7)) {
    return undefined;
  }
  const { red, green, blue } = parseHexColor(color);
  return 0.299 * red + 0.587 * green + 0.114 * blue;
}

export function rgbToGrayScaleNaive(color: string) {
  //
  if (!color.startsWith("#") || !(color.length === 7)) {
    return undefined;
  }
  const { red, green, blue } = parseHexColor(color);
  return 0.333 * red + 0.334 * green + 0.333 * blue;
}

export function isCloseToGray(color: string) {
  //
  if (!color.startsWith("#") || !(color.length === 7)) {
    return undefined;
  }
  const CUT_OFF = 4;
  const { red, green, blue } = parseHexColor(color);
  const average = (red + green + blue) / 3;
  return Math.abs(red - average) < CUT_OFF && Math.abs(green - average) < CUT_OFF && Math.abs(blue - average) < CUT_OFF;
}

export function adjustBrightness(color: string, adjustment: number) {
  //
  const { red, green, blue } = parseHexColor(color);

  const redAdjustmentOverflow = getAdjustmentOverflow(red, adjustment);
  const greenAdjustmentOverflow = getAdjustmentOverflow(green, adjustment);
  const blueAdjustmentOverflow = getAdjustmentOverflow(blue, adjustment);
  const redAdjustment = adjustment + greenAdjustmentOverflow + blueAdjustmentOverflow;
  const greenAdjustment = adjustment + redAdjustmentOverflow + blueAdjustmentOverflow;
  const blueAdjustment = adjustment + redAdjustmentOverflow + greenAdjustmentOverflow;

  const adjustedRed = adjustComponentBrightness(red, redAdjustment);
  const adjustedGreen = adjustComponentBrightness(green, greenAdjustment);
  const adjustedBlue = adjustComponentBrightness(blue, blueAdjustment);

  return getHexColor(adjustedRed, adjustedGreen, adjustedBlue);
}

function getAdjustmentOverflow(component: number, adjustment: number) {
  const rawAdjustedValue = component + adjustment;
  return rawAdjustedValue > 255 ? rawAdjustedValue - 255 : rawAdjustedValue < 0 ? rawAdjustedValue : 0;
}

export function parseHexColor(color: string) {
  const red = parseInt(color.substring(1, 3), 16);
  const green = parseInt(color.substring(3, 5), 16);
  const blue = parseInt(color.substring(5, 7), 16);
  return { red, green, blue };
}

// function adjustComponentBrightness(component: number, amount: number) {
//   const rawAdjustment = amount > 0 ? component + (255 - component) * amount : component + component * amount;
//   return Math.min(Math.max(rawAdjustment, 0), 255);
// }

function adjustComponentBrightness(component: number, amount: number) {
  return Math.min(Math.max(component + amount, 0), 255);
}

export function getHexColor(red: number, green: number, blue: number) {
  return "#" + getHexComponent(red) + getHexComponent(green) + getHexComponent(blue);
}

function getHexComponent(color: number) {
  return Math.round(color).toString(16).padStart(2, "0");
}
