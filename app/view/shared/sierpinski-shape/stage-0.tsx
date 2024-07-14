import { getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  size: number;
  color: string;
}>;

export default function Stage0({ idPrefix, size, color }: Props) {
  //
  return (
    <polygon
      points={`0,0 ${size},${size} 0,${size}`}
      id={getStageId(0, idPrefix)}
      fill={color}
      opacity={"67%"}
      //      style={{ fill: color, opacity: "67%" }}
    />
  );
}
