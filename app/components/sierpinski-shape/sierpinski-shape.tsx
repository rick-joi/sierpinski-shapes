import StageN from "./stage-n";
import Stage0 from "./stage-0";
import { Rotations, getStageId } from "./sierpinski-utilities";

type Props = Readonly<{
  idPrefix: string;
  size: number;
  iterationCount: number;
  rotations: Rotations;
  color: string;
}>;

export function getSizeWithMargins(size: number) {
  return size + 2 * getMargin(size);
}

function getMargin(size: number) {
  return size / 9;
}

export default function SierpinskiShape({ idPrefix, size, iterationCount, rotations, color }: Props) {
  //
  const iterations = [];
  for (let i = 1; i <= iterationCount; i++) {
    iterations.push(<StageN stage={i} size={size} rotations={rotations} idPrefix={idPrefix} key={i} />);
  }
  const margin = getMargin(size);
  const sizeWithMargins = getSizeWithMargins(size);
  const viewBox = `${-margin} ${-margin} ${sizeWithMargins} ${sizeWithMargins}`;
  const opacity = idPrefix.endsWith("-background") ? "10%" : "100%";
  return (
    <svg width={size} height={size} viewBox={viewBox} style={{ border: "1px solid #fafafa", opacity: opacity }}>
      <defs>
        <Stage0 size={size} idPrefix={idPrefix} key={0} color={color} />
        {iterations}
      </defs>
      <use href={getStageId(iterationCount, `#${idPrefix}`)} />
    </svg>
  );
}
