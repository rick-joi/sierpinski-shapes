import { getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  size: number;
}>;

export default function Stage0(props: Props) {
  //
  return (
    <polygon
      style={{ fill: "black" }}
      points={`0,0 ${props.size},${props.size} 0,${props.size}`}
      id={getStageId(0, props.idPrefix)}
    />
  );
}
