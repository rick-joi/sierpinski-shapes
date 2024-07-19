import { Link } from "@remix-run/react";

import SierpinskiShape from "../shared/sierpinski-shape/sierpinski-shape";
import { getCreateShapeUrl } from "../shared/sierpinski-shape/sierpinski-utilities";

import SierpinskiShapeData from "~/model/shared/sierpinski-shape";

type Props = Readonly<{
  shape: SierpinskiShapeData;
}>;

export default function GalleryItemCard({ shape }: Props) {
  const url = getCreateShapeUrl(shape.rotations, 7, shape.color);
  return (
    <div
      style={{
        border: "4px solid var(--dark-neutral-color)",
        borderRadius: "0.5rem",
        textAlign: "center",
        boxShadow: "4px 4px 6px rgba(0, 0, 0, 0.3)",
      }}
    >
      <Link to={url}>
        <h3
          style={{
            fontSize: "1.1rem",
            color: "white",
            backgroundColor: "var(--dark-neutral-color)",
            padding: "0.25rem",
            paddingBottom: "0.5rem",
            marginTop: 0,
          }}
        >
          {shape.name}
        </h3>
        <SierpinskiShape
          id={"gallery-shape-" + shape.id.toString()}
          size={313}
          iterations={7}
          rotations={shape.rotations}
          color={shape.color}
        />
      </Link>
      <div style={{ padding: "1rem 0", borderTop: "4px solid var(--dark-neutral-color)" }}>
        <Link to="." onClick={() => alert("not implemented yet")}>
          ♡ like <span style={{ fontSize: "smaller" }}>(1)</span>
        </Link>{" "}
        &nbsp; | &nbsp; <Link to="/shop">$ buy</Link>
      </div>
    </div>
  );
}
