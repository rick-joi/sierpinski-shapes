import { useEffect } from "react";
import { AllFourQuadrantInputProps, getRotations } from "./quadrant-input";
import { getCreateShapeUrl } from "../shared/sierpinski-shape/sierpinski-utilities";

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
