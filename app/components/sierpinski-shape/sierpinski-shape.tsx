import StageN from "./stage-n";
import Stage0 from "./stage-0";
import { Quadrants, getStageId } from "./sierpinski-utilities";
import { useEffect, useState } from "react";

type Props = Readonly<{
  idPrefix: string;
  iterationCount: number;
  quadrants: Quadrants;
}>;

export default function SierpinskiShape({ idPrefix, iterationCount, quadrants }: Props) {
  //
  const windowSize = useWindowSize();
  const size = Math.min(windowSize.width, windowSize.height) * 0.9;
  const iterations = [];
  for (let i = 1; i <= iterationCount; i++) {
    iterations.push(<StageN stage={i} size={size} quadrants={quadrants} idPrefix={idPrefix} key={i} />);
  }
  const viewBoxMargin = size / 9; //todo: could get more precise?
  const viewBox = `${-viewBoxMargin} ${-viewBoxMargin} ${size + 2 * viewBoxMargin} ${size + 2 * viewBoxMargin}`;
  return (
    <svg width={size} height={size} viewBox={viewBox} style={{ border: "1px solid #f0f0f0" }}>
      <defs>
        <Stage0 size={size} idPrefix={idPrefix} key={0} />
        {iterations}
      </defs>
      <use href={getStageId(iterationCount, `#${idPrefix}`)} />
    </svg>
  );
}
// Hook
function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: 256,
    height: 256,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
