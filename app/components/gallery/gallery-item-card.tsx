import { Link } from "@remix-run/react";
import SierpinskiShape from "../sierpinski-shape/sierpinski-shape";
import { Rotations } from "../sierpinski-shape/sierpinski-utilities";

export type GalleryItem = Readonly<{
  key: string;
  name: string;
  rotations: Rotations;
  color: string;
}>;

type Props = Readonly<{
  item: GalleryItem;
}>;

export default function GalleryItemCard({ item }: Props) {
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
        {item.name}
      </h3>
      <SierpinskiShape
        idPrefix={item.key}
        size={313}
        iterationCount={7}
        rotations={item.rotations}
        color={item.color}
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
