import { Link } from "@remix-run/react";

import SierpinskiShape from "../_shared/sierpinski-shape/sierpinski-shape";
import { getCreateShapeUrl } from "../_shared/sierpinski-shape/sierpinski-utilities";

import SierpinskiShapeData from "~/model/_shared/sierpinski-shape";
import rgbToGrayScale from "../_shared/miscellaneous/utilities/grayscale";
import SierpinskiText from "../_shared/sierpinski-shape/sierpinski-text";

type Props = Readonly<{
  shape: SierpinskiShapeData;
}>;

export default function GalleryItemCard({ shape }: Props) {
  //
  const url = getCreateShapeUrl(shape.rotations, 7, shape.color);
  const backgroundColor = (rgbToGrayScale(shape.color) ?? 0) > 192 ? "var(--color-black)" : "var(--color-white)";

  return (
    <div
      style={{
        textAlign: "center",
        width: "336px",
        padding: "var(--space-xs)",
        backgroundColor: "var(--color-gray-lightest)",
        paddingBottom: "0",
        boxShadow: "var(--shadow)",
        borderRadius: "var(--radius-md)",
      }}
      key={shape.id.toString()}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderRadius: "var(--radius-sm)",
          boxShadow: "var(--shadow-shallow)",
        }}
      >
        <Link to={url}>
          <SierpinskiShape
            id={"gallery-shape-" + shape.id.toString()}
            size={313}
            iterations={7}
            rotations={shape.rotations}
            color={shape.color}
          />
        </Link>
      </div>
      <div
        style={{
          textAlign: "right",
          paddingTop: "var(--space-md)",
          paddingBottom: "var(--space-lg)",
          color: "var(--color-gray-dark)",
          textRendering: "optimizeLegibility",
        }}
      >
        <div style={{ fontSize: "small", paddingBottom: "var(--space-2xs)" }}>
          <span style={{ fontWeight: "bold", fontStyle: "italic" }}>{shape.name}</span>, 2024
        </div>
        <div style={{ fontSize: "x-small" }}>
          <SierpinskiText rotations={shape.rotations} />
        </div>
        <div style={{ fontSize: "x-small" }}>curated by Rick Joi</div>
      </div>
    </div>
  );
}
