import { getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  size: number;
  stageNMinus1: number;
  x: number;
  y: number;
  rotation: number | null;
  quadrantAcronym: string;
  key: string;
  isHovering?: boolean;
}>;

export default function StageNMinus1({ idPrefix, size, stageNMinus1, x, y, rotation, isHovering }: Props) {
  //
  if (rotation !== null) {
    const rotationCenterX = x + size / 2;
    const rotationCenterY = y + size / 2;
    const style = //todo: pull this out into a class that uses a variable set in root.css maybe?
      isHovering ? { filter: "var(--color-filter-primary-from-black)" } : undefined;
    return (
      <use
        href={getStageId(stageNMinus1, `#${idPrefix}`)}
        x={x}
        y={y}
        transform={`scale(0.5) rotate(${rotation}, ${rotationCenterX}, ${rotationCenterY})`}
        key={`${x}-${y}`}
        style={style}
      />
    );
  }
}
