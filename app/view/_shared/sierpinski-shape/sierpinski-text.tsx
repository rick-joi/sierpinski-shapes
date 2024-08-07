import { Rotations } from "~/model/_shared/rotations";

type Props = {
  rotations: Rotations;
  iterations?: number;
  style?: React.CSSProperties;
};

export default function SierpinskiText({ rotations, iterations, style }: Props) {
  //
  return <span style={{ cursor: "default", ...style }}>{getContent(rotations, iterations)}</span>;
}

function getContent(rotations: Rotations, iterations: number | undefined) {
  //
  if (iterations === 0) {
    return "(base triangle)";
  }
  const iterationPrefix = iterations ? `${iterations} × (` : "";
  const iterationSuffix = iterations ? ")" : "";

  return (
    <>
      {iterationPrefix}
      <Rotation rotation={rotations.topLeft} />, <Rotation rotation={rotations.topRight} />,{" "}
      <Rotation rotation={rotations.bottomLeft} />, <Rotation rotation={rotations.bottomRight} />
      {iterationSuffix}
    </>
  );
}

type RotationProps = {
  rotation: number | null;
};

function Rotation({ rotation }: RotationProps) {
  return rotation === null ? <span style={{ opacity: "40%" }}>—</span> : Math.round(rotation) + "º";
}
