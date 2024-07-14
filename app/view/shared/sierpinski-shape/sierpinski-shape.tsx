import StageN from "./stage-n";
import Stage0 from "./stage-0";
import { getStageId } from "./sierpinski-utilities";
import { Rotations } from "~/model/shared/rotations";

type Props = Readonly<{
  idPrefix: string;
  size: number;
  iterations: number;
  rotations: Rotations;
  color: string;
}>;

export function getSizeWithMargins(size: number) {
  return size + 2 * getMargin(size);
}

function getMargin(size: number) {
  return size / 9;
}

export default function SierpinskiShape({ idPrefix, size, iterations, rotations, color }: Props) {
  //
  const stages = [];
  for (let i = 1; i <= iterations; i++) {
    stages.push(<StageN stage={i} size={size} rotations={rotations} idPrefix={idPrefix} key={i} />);
  }
  const margin = getMargin(size);
  const sizeWithMargins = getSizeWithMargins(size);
  const viewBox = `${-margin} ${-margin} ${sizeWithMargins} ${sizeWithMargins}`;
  const opacity = idPrefix.endsWith("-background") ? "10%" : "100%";
  return (
    <svg width={size} height={size} viewBox={viewBox} style={{ border: "1px solid #fafafa", opacity: opacity }}>
      <defs>
        <Stage0 size={size} idPrefix={idPrefix} key={0} color={color} />
        {stages}
      </defs>
      <use href={getStageId(iterations, `#${idPrefix}`)} />
    </svg>
  );
}
