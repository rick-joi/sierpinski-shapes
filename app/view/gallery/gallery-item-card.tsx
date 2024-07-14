import { Link } from "@remix-run/react";
import SierpinskiShape from "../shared/sierpinski-shape/sierpinski-shape";
import SierpinskiShapeData from "~/model/shared/sierpinski-shape";

type Props = Readonly<{
  shape: SierpinskiShapeData;
}>;

export default function GalleryItemCard({ shape }: Props) {
  return (
    <div
      style={{
        border: "4px solid var(--dark-neutral-color)",
        borderRadius: "0.5rem",
        textAlign: "center",
      }}
    >
      <h3
        style={{
          fontSize: "1.1rem",
          color: "white",
          backgroundColor: "var(--dark-neutral-color)",
          padding: "0.25rem",
          paddingBottom: "0.5rem",
        }}
      >
        {shape.name}
      </h3>
      <SierpinskiShape
        idPrefix={shape.id.toString()}
        size={313}
        iterationCount={7}
        rotations={shape.rotations}
        color={shape.color}
      />
      <div style={{ padding: "1rem 0", borderTop: "4px solid var(--dark-neutral-color)" }}>
        <Link to=".">
          ♡ like <span style={{ fontSize: "smaller" }}>(1)</span>
        </Link>{" "}
        &nbsp; | &nbsp;{" "}
        <Link to=".">
          $ buy <span style={{ fontSize: "smaller" }}>(0)</span>
        </Link>
      </div>
    </div>
  );
}
