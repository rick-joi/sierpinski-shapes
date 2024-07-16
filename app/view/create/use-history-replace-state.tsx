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
    if (!isAnimating) {
      const id = setTimeout(() => {
        const rotations = getRotations(quadrantProps);
        let url = getCreateShapeUrl(rotations, iterations, color);
        if ("/create?tl=0&tr=-&bl=0&br=0&i=1&c=%23000000" === url) {
          url = "/create";
        }
        history.replaceState(null, "", url);
      }, 250);
      return () => clearTimeout(id);
    }
  }, [quadrantProps, iterations, color, isAnimating]);
}

//todo: make it smarter so that it only adds the query parameters that are different from the default...
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
