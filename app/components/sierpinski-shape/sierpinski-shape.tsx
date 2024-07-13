import StageN from "./stage-n";
import Stage0 from "./stage-0";
import { Quadrants, getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  iterationCount: number;
  size: number;
  quadrants: Quadrants;
}>;

export default function SierpinskiShape({ idPrefix, iterationCount, size, quadrants }: Props) {
  //
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
