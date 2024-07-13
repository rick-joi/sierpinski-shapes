import { Quadrant, getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  size: number;
  stageNMinus1: number;
  x: number;
  y: number;
  quadrant: Quadrant | null;
}>;

export default function StageNMinus1({ idPrefix, size, stageNMinus1, x, y, quadrant }: Props) {
  //
  if (quadrant === null) {
    return;
  } else {
    const rotationCenterX = x + size / 2;
    const rotationCenterY = y + size / 2;
    return (
      <use
        href={getStageId(stageNMinus1, `#${idPrefix}`)}
        x={x}
        y={y}
        transform={`scale(0.5) rotate(${quadrant.rotation}, ${rotationCenterX}, ${rotationCenterY})`}
      />
    );
  }
}
