import { Dispatch, SetStateAction, useState, Touch, TouchEvent } from "react";
import SierpinskiShape from "../_shared/sierpinski-shape/sierpinski-shape";
import TouchableRotationOverlay from "./touchable-rotation-overlay";
import { AllFourQuadrantInputProps, getRotations } from "./quadrant-input";
import TouchableHelpMessage from "./touchable-help-message";
import { useQuadrantHovering } from "../_shared/sierpinski-shape/use-quadrant-hovering";
import TouchableIterationOverlay from "./touchable-iteration-overlay";

type Props = Readonly<{
  id: string;
  size: number;
  quadrantsProps: AllFourQuadrantInputProps;
  maxIterations: number;
  iterations: number;
  color: string;
  backgroundColor: string | undefined;
  setIterations: Dispatch<SetStateAction<number>>;
}>;

export default function TouchableSierpinskiShape({
  id,
  size,
  quadrantsProps,
  iterations,
  maxIterations,
  color,
  backgroundColor,
  setIterations,
}: Props) {
  //
  const [hasTapped, setHasTapped] = useState(false);
  const [hasSwiped, setHasSwiped] = useState(false);
  const [isHovering, setIsHovering] = useQuadrantHovering();

  let firstTouch: Touch | undefined = undefined;

  function handleTouchStart(evt: TouchEvent<HTMLDivElement>) {
    firstTouch = evt.touches[0];
    setHasTapped(true);
  }

  function handleTouchEnd(evt: TouchEvent<HTMLDivElement>) {
    //
    if (firstTouch) {
      const lastTouch = evt.changedTouches[evt.changedTouches.length - 1];
      const firstX = firstTouch.clientX;
      const firstY = firstTouch.clientY;
      const lastX = lastTouch.clientX;
      const lastY = lastTouch.clientY;
      const xDiff = lastX - firstX;
      const yDiff = lastY - firstY;

      // We only want horizontal swipes...
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          setIterations((previous) => {
            if (previous > 1) {
              setHasSwiped(true);
              return previous - 1;
            } else {
              return 1;
            }
          });
        } else {
          setIterations((previous) => {
            if (previous < maxIterations) {
              setHasSwiped(true);
              return previous + 1;
            } else {
              return maxIterations;
            }
          });
        }
      }
      firstTouch = undefined;
    }
  }

  return (
    <div
      style={{
        position: "relative",
        lineHeight: 0,
        borderRadius: "var(--radius-lg)",
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <SierpinskiShape
        id={id}
        size={size}
        iterations={iterations}
        rotations={getRotations(quadrantsProps)}
        color={color}
        backgroundColor={backgroundColor}
        isHovering={isHovering}
      />
      <TouchableHelpMessage
        size={size / 2}
        top={0}
        left={size / 2}
        hasTapped={hasTapped}
        hasSwiped={hasSwiped}
        maxIterations={maxIterations}
        iterations={iterations}
      />
      <TouchableRotationOverlay
        top={0}
        left={0}
        size={size / 2}
        isDisabled={quadrantsProps.topLeft.isDisabled}
        setRotation={quadrantsProps.topLeft.setRotation}
        setIsOverQuadrant={setIsHovering.topLeft}
      />
      <TouchableRotationOverlay
        top={0}
        left={size / 2}
        size={size / 2}
        isDisabled={quadrantsProps.topRight.isDisabled}
        setRotation={quadrantsProps.topRight.setRotation}
        setIsOverQuadrant={setIsHovering.topRight}
      />
      <TouchableRotationOverlay
        top={size / 2}
        left={0}
        size={size / 2}
        isDisabled={quadrantsProps.bottomLeft.isDisabled}
        setRotation={quadrantsProps.bottomLeft.setRotation}
        setIsOverQuadrant={setIsHovering.bottomLeft}
      />
      <TouchableRotationOverlay
        top={size / 2}
        left={size / 2}
        size={size / 2}
        isDisabled={quadrantsProps.bottomRight.isDisabled}
        setRotation={quadrantsProps.bottomRight.setRotation}
        setIsOverQuadrant={setIsHovering.bottomRight}
      />
      <TouchableIterationOverlay
        size={size}
        iterationIncrement={-1}
        maxIterations={maxIterations}
        iterations={iterations}
        setIterations={setIterations}
      />
      <TouchableIterationOverlay
        size={size}
        iterationIncrement={1}
        maxIterations={maxIterations}
        iterations={iterations}
        setIterations={setIterations}
      />
    </div>
  );
}
