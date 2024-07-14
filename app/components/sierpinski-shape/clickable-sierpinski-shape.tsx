import { Dispatch, SetStateAction, useEffect } from "react";
import SierpinskiShape from "./sierpinski-shape";
import { Rotations } from "./sierpinski-utilities";
import ClickableSierpinskiShapeQuadrant from "./clickable-sierpinski-shape-quadrant";

type Props = Readonly<{
  idPrefix: string;
  size: number;
  iterationCount: number;
  rotations: Rotations;
  color: string;
  setTopLeftRotation: Dispatch<SetStateAction<number>>;
  setTopRightRotation: Dispatch<SetStateAction<number>>;
  setBottomLeftRotation: Dispatch<SetStateAction<number>>;
  setBottomRightRotation: Dispatch<SetStateAction<number>>;
  setIterations: Dispatch<SetStateAction<number>>;
}>;

export default function ClickableSierpinskiShape({
  idPrefix,
  size,
  iterationCount,
  rotations,
  color,
  setTopLeftRotation,
  setTopRightRotation,
  setBottomLeftRotation,
  setBottomRightRotation,
  setIterations,
}: Props) {
  //
  useEffect(() => {
    document.addEventListener("touchstart", handleTouchStart, false);
    document.addEventListener("touchend", handleTouchEnd, false);
    let firstTouch: Touch | undefined = undefined;

    function handleTouchStart(evt: TouchEvent) {
      firstTouch = evt.touches[0];
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
        iterationCount={iterationCount}
        rotations={rotations}
        color={color}
      />
      <ClickableSierpinskiShapeQuadrant top={0} left={0} size={size / 2} setRotation={setTopLeftRotation} />
      <ClickableSierpinskiShapeQuadrant top={0} left={size / 2} size={size / 2} setRotation={setTopRightRotation} />
      <ClickableSierpinskiShapeQuadrant top={size / 2} left={0} size={size / 2} setRotation={setBottomLeftRotation} />
      <ClickableSierpinskiShapeQuadrant
        top={size / 2}
        left={size / 2}
        size={size / 2}
        setRotation={setBottomRightRotation}
      />
    </div>
  );
}
