import { Rotations } from "~/model/shared/rotations";

type Props = {
  rotations: Rotations;
  iterations: number;
  color: string;
};

export default function SierpinskiText({ rotations, iterations, color }: Props) {
  return (
    <span style={{ color: color, cursor: "" }} title={`color: ${color}`}>
      {iterations} × (<Rotation rotation={rotations.topLeft} />, <Rotation rotation={rotations.topRight} />,{" "}
      <Rotation rotation={rotations.bottomLeft} />, <Rotation rotation={rotations.bottomRight} />)
    </span>
  );
}

type RotationProps = {
  rotation: number | null;
};

function Rotation({ rotation }: RotationProps) {
  return rotation === null ? <span style={{ opacity: "40%" }}>—</span> : Math.round(rotation) + "º";
}
