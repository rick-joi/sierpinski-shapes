import StageNMinus1 from "./stage-n-minus-1";
import { Quadrants, getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  stage: number;
  size: number;
  quadrants: Quadrants;
}>;

export default function StageN({ idPrefix, stage, size, quadrants }: Props) {
  //
  const previousStage = stage - 1;
  return (
    <g id={getStageId(stage, idPrefix)}>
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={0}
        y={0}
        quadrant={quadrants.topLeft}
        idPrefix={idPrefix}
      />
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={size}
        y={0}
        quadrant={quadrants.topRight}
        idPrefix={idPrefix}
      />
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={size}
        y={size}
        quadrant={quadrants.bottomRight}
        idPrefix={idPrefix}
      />
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={0}
        y={size}
        quadrant={quadrants.bottomLeft}
        idPrefix={idPrefix}
      />
    </g>
  );
}
