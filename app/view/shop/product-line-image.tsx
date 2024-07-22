import { useState } from "react";
import Lightbox from "../_shared/miscellaneous/components/lightbox";

type Props = Readonly<{
  imageName: string;
  singularName: string;
  height: number;
  width: number;
  top: number;
  left: number;
}>;
export default function ProductLineImage({ imageName, singularName, width, height, top, left }: Props) {
  //
  const VW_MULTIPLIER = 2;
  const vwWidth = width * VW_MULTIPLIER;
  const vwHeight = height * VW_MULTIPLIER;
  const vwTop = (top * VW_MULTIPLIER) / 6;
  const vwLeft = (left * VW_MULTIPLIER) / 6;

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const lightboxImageWidth = width > height ? "80vw" : "auto";
  const lightboxImageHeight = width > height ? "auto" : "80vw";

  return (
    <>
      <button
        style={{
          width: `min(${vwWidth}vw, ${width}rem)`,
          height: `min(${vwHeight}vw, ${height}rem)`,
          position: "relative",
          top: `min(${vwTop}vw, ${top}rem)`,
          left: `min(${vwLeft}vw, ${left}rem)`,
          boxShadow: "var(--shadow)",
          borderRadius: "var(--radius-sm)",
          backgroundColor: "transparent",
          backgroundImage: `url('/shop/low-res/${imageName}')`,
          backgroundSize: "100%",
          border: "none",
          outline: "none",
          padding: 0,
          margin: 0,
          color: "transparent",
          lineHeight: 0,
        }}
        title={`Example ${singularName} — click to see it bigger`}
        onClick={() => {
          setIsDialogOpen(true);
          console.log("clicked");
        }}
      ></button>
      <Lightbox isOpen={isDialogOpen} setIsOpen={setIsDialogOpen}>
        <img
          src={`/shop/high-res/${imageName}`}
          alt={`Example ${singularName}`}
          style={{
            width: lightboxImageWidth,
            height: lightboxImageHeight,
            margin: "0 auto",
            borderRadius: "var(--radius-xl)",
          }}
        />
      </Lightbox>
    </>
  );
}
