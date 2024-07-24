import { getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  size: number;
  color: string;
  opacity: number;
}>;

export default function Stage0({ idPrefix, size, color, opacity }: Props) {
  //
  return (
    <polygon
      points={`0,0 ${size},${size} 0,${size}`}
      id={getStageId(0, idPrefix)}
      fill={color}
      opacity={opacity}
      // using style seemed to lead to out-of-memory errors:
      // style={{ fill: color, opacity: "67%" }}
    />
  );
}
