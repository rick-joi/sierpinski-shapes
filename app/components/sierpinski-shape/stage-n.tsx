import StageNMinus1 from "./stage-n-minus-1";
import { Rotations, getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  stage: number;
  size: number;
  rotations: Rotations;
}>;

export default function StageN({ idPrefix, stage, size, rotations }: Props) {
  //
  const previousStage = stage - 1;
  return (
    <g id={getStageId(stage, idPrefix)}>
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={0}
        y={0}
        rotation={rotations.topLeft}
        idPrefix={idPrefix}
      />
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={size}
        y={0}
        rotation={rotations.topRight}
        idPrefix={idPrefix}
      />
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={size}
        y={size}
        rotation={rotations.bottomRight}
        idPrefix={idPrefix}
      />
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={0}
        y={size}
        rotation={rotations.bottomLeft}
        idPrefix={idPrefix}
      />
    </g>
  );
}
