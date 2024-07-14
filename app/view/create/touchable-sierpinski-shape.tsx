import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SierpinskiShape from "../shared/sierpinski-shape/sierpinski-shape";
import TouchableSierpinskiShapeQuadrant from "./touchable-sierpinski-shape-quadrant";
import { AllFourQuadrantInputProps, getRotations } from "./quadrant-input";
import TouchableHelpMessage from "./touchable-help-message";

type Props = Readonly<{
  idPrefix: string;
  size: number;
  quadrantsProps: AllFourQuadrantInputProps;
  iterations: number;
  color: string;
  setIterations: Dispatch<SetStateAction<number>>;
}>;

export default function TouchableSierpinskiShape({
  idPrefix,
  size,
  quadrantsProps,
  iterations,
  setIterations,
  color,
}: Props) {
  //
  const [hasTapped, setHasTapped] = useState(false);
  const [hasSwiped, setHasSwiped] = useState(false);

  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchend", handleTouchEnd, false);
    let firstTouch: Touch | undefined = undefined;

    function handleTouchStart(evt: TouchEvent) {
      firstTouch = evt.touches[0];
      setHasTapped(true);
    }

    function handleTouchEnd(evt: TouchEvent) {
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
            setIterations((previous) => Math.max(1, previous - 1));
          } else {
            setIterations((previous) => previous + 1);
            setHasSwiped(true);
          }
        }
        firstTouch = undefined;
      }
    }
  }, [setIterations]);

  return (
    <div style={{ position: "relative" }}>
      <SierpinskiShape
        idPrefix={idPrefix}
        size={size}
        iterations={iterations}
        rotations={getRotations(quadrantsProps)}
        color={color}
      />
      <TouchableHelpMessage size={size / 2} top={0} left={size / 2} hasTapped={hasTapped} hasSwiped={hasSwiped} />
      <TouchableSierpinskiShapeQuadrant
        top={0}
        left={0}
        size={size / 2}
        setRotation={quadrantsProps.topLeft.setRotation}
      />
      <TouchableSierpinskiShapeQuadrant
        top={0}
        left={size / 2}
        size={size / 2}
        setRotation={quadrantsProps.topRight.setRotation}
      />
      <TouchableSierpinskiShapeQuadrant
        top={size / 2}
        left={0}
        size={size / 2}
        setRotation={quadrantsProps.bottomLeft.setRotation}
      />
      <TouchableSierpinskiShapeQuadrant
        top={size / 2}
        left={size / 2}
        size={size / 2}
        setRotation={quadrantsProps.bottomRight.setRotation}
      />
    </div>
  );
}
