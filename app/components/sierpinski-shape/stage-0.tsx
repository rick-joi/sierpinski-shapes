import { getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  size: number;
}>;

export default function Stage0({ idPrefix, size }: Props) {
  //
  return <polygon points={`0,0 ${size},${size} 0,${size}`} id={getStageId(0, idPrefix)} />;
}
