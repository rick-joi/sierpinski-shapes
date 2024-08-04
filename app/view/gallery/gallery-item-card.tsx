import { Link } from "@remix-run/react";

import SierpinskiShape from "../_shared/sierpinski-shape/sierpinski-shape";
import { getCreateShapeUrl } from "../_shared/sierpinski-shape/sierpinski-utilities";

import SierpinskiShapeData from "~/model/_shared/sierpinski-shape";
import rgbToGrayScale from "../_shared/miscellaneous/utilities/grayscale";
import SierpinskiText from "../_shared/sierpinski-shape/sierpinski-text";
import { useEffect, useState } from "react";

type Props = Readonly<{
  shape: SierpinskiShapeData;
  delay: number;
}>;

export default function GalleryItemCard({ shape, delay }: Props) {
  //
  const MAX_ITERATIONS = 7;
  const url = getCreateShapeUrl(shape.rotations, MAX_ITERATIONS, shape.color);
  const backgroundColor = (rgbToGrayScale(shape.color) ?? 0) > 192 ? "var(--color-black)" : "var(--color-white)";

  const [iterations, setIterations] = useState(MAX_ITERATIONS);
  const [iterationDirection, setIterationDirection] = useState<1 | -1>(1);
  const [isOverFooter, setIsOverFooter] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isOverFooter) {
      if (!isAnimating) {
        setIterations(MAX_ITERATIONS - 1);
        setIterationDirection(-1);
        setIsAnimating(true);
      } else {
        const interval = setInterval(
          () => {
            if (isOverFooter) {
              if (iterations === MAX_ITERATIONS) {
                setIterationDirection(-1);
                setIterations(MAX_ITERATIONS - 1);
              } else if (iterations === 1) {
                setIterationDirection(1);
                setIterations(2);
              } else {
                setIterations(iterations + iterationDirection);
              }
            }
          },
          iterations === 1 || iterations === MAX_ITERATIONS ? 3000 : 500
        );
        return () => clearInterval(interval);
      }
    } else {
      setIterations(MAX_ITERATIONS);
      setIterationDirection(-1);
      setIsAnimating(false);
    }
  }, [isAnimating, isOverFooter, iterationDirection, iterations]);

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
            iterations={iterations}
            rotations={shape.rotations}
            color={shape.color}
            delay={delay}
          />
        </Link>
      </div>
      <div
        style={{
          textAlign: "right",
          paddingTop: "var(--space-md)",
          paddingBottom: "var(--space-lg)",
          color: "var(--color-gray-darker)",
          textRendering: "optimizeLegibility",
          cursor: iterationDirection === 1 ? "zoom-out" : "zoom-in",
        }}
        onMouseEnter={() => {
          setIsOverFooter(true);
        }}
        onMouseLeave={() => {
          setIsOverFooter(false);
        }}
      >
        <div style={{ fontSize: "small", paddingBottom: "var(--space-2xs)" }}>
          <span style={{ display: isOverFooter ? "block" : "none", position: "absolute", paddingLeft: "1em" }}>
            {iterations}
          </span>
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
