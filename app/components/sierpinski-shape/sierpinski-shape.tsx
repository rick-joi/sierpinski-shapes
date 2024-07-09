import StageN from "./stage-n";
import Stage0 from "./stage-0";
import { ChildRotations, getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  iterationCount: number;
  size: number;
  childRotations: ChildRotations;
  foregroundColor?: string;
  backgroundColor?: string;
}>;

export default function SierpinskiShape({
  idPrefix,
  iterationCount,
  size,
  childRotations,
  foregroundColor,
  backgroundColor,
}: Props) {
  //
  const iterations = [];
  for (let i = 1; i <= iterationCount; i++) {
    iterations.push(<StageN stage={i} size={size} childRotations={childRotations} idPrefix={idPrefix} key={i} />);
  }
  const viewBoxMargin = calculateViewBoxMargin(size, childRotations);
  const viewBox = `${-viewBoxMargin} ${-viewBoxMargin} ${size + 2 * viewBoxMargin} ${size + 2 * viewBoxMargin}`;
  return (
    <svg width={size} height={size} style={{ backgroundColor: backgroundColor ?? "white" }} viewBox={viewBox}>
      <defs>
        <Stage0 size={size} idPrefix={idPrefix} key={0} color={foregroundColor ?? "black"} />
        {iterations}
      </defs>
      <use href={getStageId(iterationCount, `#${idPrefix}`)} />
    </svg>
  );
}

function calculateViewBoxMargin(
  size: number,
  childRotations: readonly [number | null, number | null, number | null, number | null]
) {
  const isSquare = childRotations.reduce(
    (isSquare, rotation) => isSquare && (rotation === null || rotation % 90 !== 0),
    false
  );
  return isSquare ? 0 : size / 8;
}
