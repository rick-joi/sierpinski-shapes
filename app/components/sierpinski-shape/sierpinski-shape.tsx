import StageN from "./stage-n";
import Stage0 from "./stage-0";
import { Quadrants, getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  iterationCount: number;
  size: number;
  quadrants: Quadrants;
  foregroundColor?: string;
  backgroundColor?: string;
}>;

export default function SierpinskiShape({
  idPrefix,
  iterationCount,
  size,
  quadrants,
  foregroundColor,
  backgroundColor,
}: Props) {
  //
  const iterations = [];
  for (let i = 1; i <= iterationCount; i++) {
    iterations.push(<StageN stage={i} size={size} quadrants={quadrants} idPrefix={idPrefix} key={i} />);
  }
  const viewBoxMargin = size / 8; //todo: could get more precise?
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
