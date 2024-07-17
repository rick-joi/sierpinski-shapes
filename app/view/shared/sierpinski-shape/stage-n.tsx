import StageNMinus1 from "./stage-n-minus-1";
import { getStageId } from "./sierpinski-utilities";
import { Rotations } from "~/model/shared/rotations";
import { IsHovering } from "./use-quadrant-hovering";

type Props = Readonly<{
  idPrefix: string;
  stage: number;
  size: number;
  rotations: Rotations;
  isHovering?: IsHovering;
}>;

export default function StageN({ idPrefix, stage, size, rotations, isHovering }: Props) {
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
        quadrantAcronym="tl"
        key="tl"
        isHovering={isHovering?.topLeft}
      />
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={size}
        y={0}
        rotation={rotations.topRight}
        idPrefix={idPrefix}
        quadrantAcronym="tr"
        key="tr"
        isHovering={isHovering?.topRight}
      />
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={0}
        y={size}
        rotation={rotations.bottomLeft}
        idPrefix={idPrefix}
        quadrantAcronym="bl"
        key="bl"
        isHovering={isHovering?.bottomLeft}
      />
      <StageNMinus1
        size={size}
        stageNMinus1={previousStage}
        x={size}
        y={size}
        rotation={rotations.bottomRight}
        idPrefix={idPrefix}
        quadrantAcronym="br"
        key="br"
        isHovering={isHovering?.bottomRight}
      />
    </g>
  );
}
