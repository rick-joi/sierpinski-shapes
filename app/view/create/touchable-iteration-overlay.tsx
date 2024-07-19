import { Dispatch, SetStateAction, useState } from "react";

type Props = Readonly<{
  size: number;
  iterationIncrement: -1 | 1;
  maxIterations: number;
  iterations: number;
  setIterations: Dispatch<SetStateAction<number>>;
}>;

export default function TouchableIterationOverlay({
  size,
  iterationIncrement,
  maxIterations,
  iterations,
  setIterations,
}: Props) {
  //
  const [isHoveredOver, setIsHoveredOver] = useState(false);

  const WIDTH = 16;
  const isDisabled = iterationIncrement === -1 ? iterations < 2 : iterations > maxIterations - 1;
  const left = iterationIncrement === -1 ? -WIDTH : size;
  const color = isHoveredOver ? (isDisabled ? "#f8f8f8" : "var(--primary-accent-color)") : "#f8f8f8";
  const tallSideBorder = `${WIDTH}px solid ${color}`;
  const borderLeft = iterationIncrement === -1 ? "none" : tallSideBorder;
  const borderRight = iterationIncrement === -1 ? tallSideBorder : "none";

  return (
    <button
      className="non-touch-screen-only"
      style={{
        background: "transparent",
        boxShadow: "none",
        borderBottom: `${size / 2}px solid transparent`,
        borderTop: `${size / 2}px solid transparent`,
        borderLeft: borderLeft,
        borderRight: borderRight,
        position: "absolute",
        top: 0,
        left: left,
        height: size / 2,
        width: WIDTH,
        margin: 0,
        padding: 0,
        cursor: isDisabled ? "not-allowed" : "pointer",
      }}
      onClick={() => {
        if (!isDisabled) {
          setIterations((previous) => previous + iterationIncrement);
        }
      }}
      onMouseEnter={() => {
        setIsHoveredOver(true);
      }}
      onMouseLeave={() => {
        setIsHoveredOver(false);
      }}
    />
  );
}
