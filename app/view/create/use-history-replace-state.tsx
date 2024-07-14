import { useEffect } from "react";
import { AllFourQuadrantInputProps, QuadrantInputProps } from "./quadrant-input";

export default function useHistoryReplaceState(
  quadrantProps: AllFourQuadrantInputProps,
  iterations: number,
  color: string,
  isAnimating: boolean
) {
  useEffect(() => {
    //todo: make requests to these URLs use these values as defaults...
    //todo: make the gallery images link to create using these URLs...
    if (!isAnimating) {
      const id = setTimeout(() => {
        const url = getUrl(quadrantProps, iterations, color);
        history.replaceState(null, "", url);
      }, 250);
      return () => clearTimeout(id);
    }
  }, [quadrantProps, iterations, color, isAnimating]);
}

function getUrl(quadrantProps: AllFourQuadrantInputProps, iterations: number, color: string) {
  const tl = formatRotation(quadrantProps.topLeft);
  const tr = formatRotation(quadrantProps.topRight);
  const bl = formatRotation(quadrantProps.bottomLeft);
  const br = formatRotation(quadrantProps.bottomRight);
  const c = encodeURIComponent(color);

  return `/create?tl=${tl}&tr=${tr}&bl=${bl}&br=${br}&i=${iterations}&c=${c}`;
}

function formatRotation(quadrantInputProps: QuadrantInputProps) {
  return quadrantInputProps.isDisabled ? "-" : Math.round(quadrantInputProps.rotation).toString();
}
