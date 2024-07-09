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

export default function SierpinskiShape(props: Props) {
  //

  const iterations = [];
  for (let i = 1; i <= props.iterationCount; i++) {
    iterations.push(
      <StageN stage={i} size={props.size} childRotations={props.childRotations} idPrefix={props.idPrefix} key={i} />
    );
  }
  const viewBoxMargin = calculateViewBoxMargin(props.size, props.childRotations);
  const viewBox = `${-viewBoxMargin} ${-viewBoxMargin} ${props.size + 2 * viewBoxMargin} ${
    props.size + 2 * viewBoxMargin
  }`;
  return (
    <svg
      width={props.size}
      height={props.size}
      style={{ backgroundColor: props.backgroundColor ?? "white" }}
      viewBox={viewBox}
    >
      <defs>
        <Stage0 size={props.size} idPrefix={props.idPrefix} key={0} color={props.foregroundColor ?? "black"} />
        {iterations}
      </defs>
      <use href={getStageId(props.iterationCount, `#${props.idPrefix}`)} />
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
