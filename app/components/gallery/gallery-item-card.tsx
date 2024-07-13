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
        style={{ fontSize: "1.1rem", color: "white", backgroundColor: "var(--dark-neutral-color)", padding: "0.25rem" }}
      >
        {item.name}
      </h3>
      <SierpinskiShape
        idPrefix={item.key}
        size={313}
        iterationCount={6}
        rotations={item.rotations}
        color={item.color}
      />
      <div style={{ marginBottom: "1rem" }}>
        <Link to=".">❤️ like (1)</Link> &nbsp; | &nbsp; <Link to=".">👀 view (1)</Link>
      </div>
    </div>
  );
}
