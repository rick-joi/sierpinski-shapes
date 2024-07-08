import { getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  size: number;
  stageNMinus1: number;
  x: number;
  y: number;
  rotation: number | null;
}>;

export default function StageNMinus1(props: Props) {
  //
  if (props.rotation === null) {
    return;
  } else {
    const rotationCenterX = props.x + props.size / 2;
    const rotationCenterY = props.y + props.size / 2;
    return (
      <use
        href={getStageId(props.stageNMinus1, `#${props.idPrefix}`)}
        x={props.x}
        y={props.y}
        transform={`scale(0.5) rotate(${props.rotation}, ${rotationCenterX}, ${rotationCenterY})`}
      />
    );
  }
}
