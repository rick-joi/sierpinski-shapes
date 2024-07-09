import StageNMinus1 from "./stage-n-minus-1";
import { ChildRotations, getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  stage: number;
  size: number;
  childRotations: ChildRotations;
}>;

export default function StageN({ idPrefix, stage, size, childRotations }: Props) {
  //
  const previousStage = stage - 1;
  return (
    <g id={getStageId(stage, idPrefix)}>
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={0}
        y={0}
        rotation={childRotations[0]}
        idPrefix={idPrefix}
      />
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={size}
        y={0}
        rotation={childRotations[1]}
        idPrefix={idPrefix}
      />
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={size}
        y={size}
        rotation={childRotations[2]}
        idPrefix={idPrefix}
      />
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={0}
        y={size}
        rotation={childRotations[3]}
        idPrefix={idPrefix}
      />
    </g>
  );
}
