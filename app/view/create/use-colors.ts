import { Dispatch, SetStateAction, useState } from "react";
import { BackgroundColorType } from "../_shared/sierpinski-shape/sierpinski-utilities";
import {
  adjustBrightness,
  isCloseToGray,
  rgbToGrayScaleNaive,
} from "../_shared/miscellaneous/utilities/color-utilities";

export default function useColors(
  initialColor: string,
  initialBackgroundColorType: BackgroundColorType,
  initialBackgroundColor: string
) {
  //
  initialBackgroundColor =
    initialBackgroundColorType === "custom" ? initialBackgroundColor : calculateBackgroundColor(initialColor);
  const [color, setColorRaw] = useState(initialColor);
  const [backgroundColorType, setBackgroundColorTypeRaw] = useState(initialBackgroundColorType);
  const [backgroundColor, setBackgroundColorRaw] = useState(initialBackgroundColor);

  const setColor: Dispatch<SetStateAction<string>> = (value: SetStateAction<string>) => {
    value = typeof value === "function" ? value(color) : value;
    setColorRaw(value);
    if (backgroundColorType !== "custom") {
      setBackgroundColorRaw(calculateBackgroundColor(value));
    }
  };
  const setBackgroundColorType: Dispatch<SetStateAction<BackgroundColorType>> = (
    value: SetStateAction<BackgroundColorType>
  ) => {
    value = typeof value === "function" ? value(backgroundColorType) : value;
    setBackgroundColorTypeRaw(value);
    if (value !== "custom") {
      setBackgroundColorRaw(calculateBackgroundColor(color));
    }
  };
  const setBackgroundColor: Dispatch<SetStateAction<string>> = (value: SetStateAction<string>) => {
    value = typeof value === "function" ? value(backgroundColor) : value;
    setBackgroundColorRaw(value);
    setBackgroundColorType("custom");
  };

  return [color, backgroundColorType, backgroundColor, setColor, setBackgroundColorType, setBackgroundColor] as const;
}

function calculateBackgroundColor(color: string): string {
  //
  const MIDPOINT = 160;
  const grayscale = rgbToGrayScaleNaive(color);
  const isGray = isCloseToGray(color);
  if (grayscale === undefined || isGray === undefined || (isGray && grayscale < MIDPOINT)) {
    // dark gray...
    return "#ffffff";
  } else if (grayscale < MIDPOINT) {
    // dark...
    const adjustmentToWhite = 255 - grayscale;
    const percentageFromMidpoint = (MIDPOINT - grayscale) / MIDPOINT;
    const darkerThanWhiteAdjustment = percentageFromMidpoint * 29;
    const adjustment = adjustmentToWhite - darkerThanWhiteAdjustment;
    return adjustBrightness(color, adjustment);
  } else {
    // light...
    const distanceFromMidpoint = grayscale - MIDPOINT;
    return adjustBrightness(color, distanceFromMidpoint - grayscale);
  }
}
