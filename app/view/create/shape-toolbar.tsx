import { useState } from "react";
import IconButton from "../shared/utilities/icon-button";
import AddToGalleryDialog from "./add-to-gallery-dialog";
import DownloadButton from "./download-button";
import { Rotations } from "~/model/shared/rotations";
import { useNavigate } from "@remix-run/react";

type Props = Readonly<{
  thisSvgId: string;
  rotations: Rotations;
  iterations: number;
  color: string;
  isAnimating: boolean;
}>;

export default function ShapeToolbar({ thisSvgId, rotations, iterations, color, isAnimating }: Props) {
  //
  const [isAddToGalleryDialogOpen, setIsAddToGalleryDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: "1.5rem", marginTop: "0.5rem" }}>
      <div style={{ display: "flex", gap: "0.5rem" }}>
        <IconButton
          buttonText={"Add to gallery"}
          hoverText={"Add this Sierpinski Shape to our gallery, and name if if you'd like"}
          iconImage={"/like-icon.png"}
          isDisabled={isAnimating}
          onClick={() => setIsAddToGalleryDialogOpen(true)}
        />
        <DownloadButton
          svgId={thisSvgId}
          imageFormat="png"
          rotations={rotations}
          iterations={iterations}
          color={color}
          isDisabled={isAnimating}
        />
        <DownloadButton
          svgId={thisSvgId}
          imageFormat="svg"
          rotations={rotations}
          iterations={iterations}
          color={color}
          isDisabled={isAnimating}
        />
        <IconButton
          buttonText={"Buy merch"}
          hoverText={
            "Shop for t-shirts, wall prints, pillows, and more ... all with Sierpinski Shapes printed on them!"
          }
          iconImage={"/t-shirt-icon.png"}
          isDisabled={isAnimating}
          onClick={() => {
            navigate("/shop");
          }}
        />
      </div>
      <AddToGalleryDialog isOpen={isAddToGalleryDialogOpen} setIsOpen={setIsAddToGalleryDialogOpen} />
    </div>
  );
}
