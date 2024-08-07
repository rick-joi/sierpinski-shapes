import { useEffect } from "react";
import { AllFourQuadrantInputProps, getRotations } from "./quadrant-input";
import { BackgroundColorType, getCreateShapeUrl } from "../_shared/sierpinski-shape/sierpinski-utilities";

export default function useHistoryReplaceState(
  quadrantProps: AllFourQuadrantInputProps,
  iterations: number,
  color: string,
  backgroundColorType: BackgroundColorType,
  backgroundColor: string,
  isAnimating: boolean,
  setMostRecentCreateUrl: React.Dispatch<React.SetStateAction<string>>
) {
  const rotations = getRotations(quadrantProps);
  const url = getCreateShapeUrl(rotations, iterations, color, backgroundColorType, backgroundColor);

  useEffect(() => {
    if (!isAnimating) {
      const id = setTimeout(() => {
        history.replaceState(null, "", url);
        setMostRecentCreateUrl(url);
      }, 250);
      return () => clearTimeout(id);
    }
  }, [url, isAnimating, setMostRecentCreateUrl]);

  return url;
}
