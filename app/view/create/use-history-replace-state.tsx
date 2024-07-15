import { useEffect } from "react";
import { AllFourQuadrantInputProps, getRotations } from "./quadrant-input";
import { Rotations } from "~/model/shared/rotations";

export default function useHistoryReplaceState(
  quadrantProps: AllFourQuadrantInputProps,
  iterations: number,
  color: string,
  isAnimating: boolean
) {
  useEffect(() => {
    //todo: make the gallery images link to create using these URLs...
    if (!isAnimating) {
      const id = setTimeout(() => {
        const rotations = getRotations(quadrantProps);
        const url = getCreateShapeUrl(rotations, iterations, color);
        history.replaceState(null, "", url);
      }, 250);
      return () => clearTimeout(id);
    }
  }, [quadrantProps, iterations, color, isAnimating]);
}

export function getCreateShapeUrl(rotations: Rotations, iterations: number, color: string) {
  //
  const tl = formatRotation(rotations.topLeft);
  const tr = formatRotation(rotations.topRight);
  const bl = formatRotation(rotations.bottomLeft);
  const br = formatRotation(rotations.bottomRight);
  const c = encodeURIComponent(color);

  return `/create?tl=${tl}&tr=${tr}&bl=${bl}&br=${br}&i=${iterations}&c=${c}`;
}

function formatRotation(rotation: number | null) {
  return rotation === null ? "-" : Math.round(rotation).toString();
}
