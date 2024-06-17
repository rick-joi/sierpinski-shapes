import StageN from "./stage-n";
import Stage0 from "./stage-0";
import { ChildRotations, getStageId } from "./sierpinski-utilities";

type Props = {
  idPrefix: string;
  iterationCount: number;
  size: number;
  childRotations: ChildRotations;
};
export default function SierpinskiShape(props: Props) {
  //
  const iterations = [];
  for (let i = 1; i <= props.iterationCount; i++) {
    iterations.push(
      <StageN stage={i} size={props.size} childRotations={props.childRotations} idPrefix={props.idPrefix} key={i} />
    );
  }
  return (
    <svg width={props.size} height={props.size}>
      <defs>
        <Stage0 size={props.size} idPrefix={props.idPrefix} key={0} />
        {iterations}
      </defs>
      <use href={getStageId(props.iterationCount, `#${props.idPrefix}`)} />
    </svg>
  );
}
