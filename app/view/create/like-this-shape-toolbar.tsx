import { useState } from "react";
import IconButton from "./icon-button";
import AddToGalleryDialog from "./add-to-gallery-dialog";
import DownloadButton from "./download-button";
import { Rotations } from "~/model/shared/rotations";

type Props = Readonly<{
  thisSvgId: string;
  rotations: Rotations;
  iterations: number;
  color: string;
  isAnimating: boolean;
}>;

export default function LikeThisShapeToolbar({ thisSvgId, rotations, iterations, color, isAnimating }: Props) {
  //
  const [isAddToGalleryDialogOpen, setIsAddToGalleryDialogOpen] = useState(false);

  return (
    <div style={{ marginBottom: "1rem" }}>
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
          onClick={notImplementedYet}
        />
      </div>
      <AddToGalleryDialog isOpen={isAddToGalleryDialogOpen} setIsOpen={setIsAddToGalleryDialogOpen} />
    </div>
  );
}

function notImplementedYet() {
  alert("not implemented, yet");
}
