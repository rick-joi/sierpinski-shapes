import StageN from "./stage-n";
import Stage0 from "./stage-0";
import { IsHovering } from "./use-quadrant-hovering";
import { getStageId } from "./sierpinski-utilities";
import { Rotations } from "~/model/_shared/rotations";
import Delayed from "../miscellaneous/components/delayed";

type Props = Readonly<{
  id: string;
  size: number;
  iterations: number;
  rotations: Rotations;
  color: string;
  backgroundColor?: string;
  delay?: number;
  isHovering?: IsHovering;
}>;

export function getSizeWithMargins(size: number) {
  return size + 2 * getMargin(size);
}

function getMargin(size: number) {
  return size / 9;
}

export default function SierpinskiShape({
  id,
  size,
  iterations,
  rotations,
  color,
  backgroundColor,
  isHovering,
  delay = 0,
}: Props) {
  //
  const stages = [];
  for (let i = 1; i <= iterations; i++) {
    stages.push(<StageN stage={i} size={size} rotations={rotations} idPrefix={id} key={i} isHovering={isHovering} />);
  }

  const margin = getMargin(size);
  const sizeWithMargins = getSizeWithMargins(size);
  const viewBox = `${-margin} ${-margin} ${sizeWithMargins} ${sizeWithMargins}`;
  const opacity = iterations < 2 ? 0.75 : iterations === 2 ? 0.875 : iterations === 3 ? 0.9375 : 1;
  const svgBackgroundColor = backgroundColor;
  const borderRadius = size >= 512 ? "var(--radius-md)" : "var(--radius-sm)";

  return (
    <svg viewBox={viewBox} id={id} style={{ backgroundColor: svgBackgroundColor, borderRadius: borderRadius }}>
      <Delayed delay={delay}>
        <defs>
          <Stage0 size={size} idPrefix={id} key={0} color={color} opacity={opacity} />
          {stages}
        </defs>
        <use href={getStageId(iterations, `#${id}`)} />
      </Delayed>
    </svg>
  );
}
