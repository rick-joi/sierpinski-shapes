import StageNMinus1 from "./stage-n-minus-1";
import { ChildRotations, getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  stage: number;
  size: number;
  childRotations: ChildRotations;
}>;

export default function StageN(props: Props) {
  //
  const previousStage = props.stage - 1;
  return (
    <g id={getStageId(props.stage, props.idPrefix)}>
      <StageNMinus1
        size={props.size}
        stageNMinus1={previousStage}
        x={0}
        y={0}
        rotation={props.childRotations[0]}
        idPrefix={props.idPrefix}
      />
      <StageNMinus1
        size={props.size}
        stageNMinus1={previousStage}
        x={props.size}
        y={0}
        rotation={props.childRotations[1]}
        idPrefix={props.idPrefix}
      />
      <StageNMinus1
        size={props.size}
        stageNMinus1={previousStage}
        x={props.size}
        y={props.size}
        rotation={props.childRotations[2]}
        idPrefix={props.idPrefix}
      />
      <StageNMinus1
        size={props.size}
        stageNMinus1={previousStage}
        x={0}
        y={props.size}
        rotation={props.childRotations[3]}
        idPrefix={props.idPrefix}
      />
    </g>
  );
}
