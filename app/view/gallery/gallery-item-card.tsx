import { Link } from "@remix-run/react";

import SierpinskiShape from "../_shared/sierpinski-shape/sierpinski-shape";
import { getCreateShapeUrl } from "../_shared/sierpinski-shape/sierpinski-utilities";

import SierpinskiShapeData from "~/model/_shared/sierpinski-shape";
import rgbToGrayScale from "../_shared/miscellaneous/grayscale";
import SierpinskiText from "../_shared/sierpinski-shape/sierpinski-text";

type Props = Readonly<{
  shape: SierpinskiShapeData;
}>;

export default function GalleryItemCard({ shape }: Props) {
  //
  const url = getCreateShapeUrl(shape.rotations, 7, shape.color);
  const backgroundColor = (rgbToGrayScale(shape.color) ?? 0) > 192 ? "black" : "white";

  return (
    <div
      style={{
        textAlign: "center",
        width: "313px",
        padding: "0.5rem",
        backgroundColor: "#f5f5f5",
        paddingBottom: "0",
        boxShadow: "4px 4px 5px rgba(0, 0, 0, 0.2)",
        borderRadius: "0.5rem",
      }}
      key={shape.id.toString()}
    >
      <div
        style={{
          backgroundColor: backgroundColor,
          borderRadius: "0.33rem",
          boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.1)",
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
          paddingTop: "1rem",
          paddingBottom: "2rem",
          color: "#333333",
          textRendering: "optimizeLegibility",
        }}
      >
        <div style={{ fontSize: "small", paddingBottom: "0.25rem" }}>
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
