import { useState } from "react";
import IconButton from "./icon-button";
import AddToGalleryDialog from "./add-to-gallery-dialog";

type Props = Readonly<{ isAnimating: boolean }>;

export default function LikeThisShapeToolbar({ isAnimating }: Props) {
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
        <IconButton
          buttonText={"Download .png"}
          hoverText={"Download this Sierpinski Shape as a .png image file"}
          iconImage={"/download-icon.png"}
          isDisabled={isAnimating}
          onClick={notImplementedYet}
        />
        <IconButton
          buttonText={"Download .svg"}
          hoverText={"Download this Sierpinski Shape as an .svg image file"}
          iconImage={"/download-icon.png"}
          isDisabled={isAnimating}
          onClick={notImplementedYet}
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
