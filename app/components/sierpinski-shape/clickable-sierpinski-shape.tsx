import { Dispatch, SetStateAction } from "react";
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
}: Props) {
  //
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
