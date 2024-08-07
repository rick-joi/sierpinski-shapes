import { Dispatch, SetStateAction, useState } from "react";
import IconButton from "../_shared/forms/icon-button";
import AddToGalleryDialog from "./add-to-gallery-dialog";
import DownloadButton from "./download-button";
import { Rotations } from "~/model/sierpinski-shapes/rotations";
import { useNavigate } from "@remix-run/react";

type Props = Readonly<{
  thisSvgId: string;
  rotations: Rotations;
  iterations: number;
  color: string;
  createUrl: string;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
}>;

export default function ButtonBar({ thisSvgId, rotations, iterations, color, createUrl, setIsAnimating }: Props) {
  //
  const [isAddToGalleryDialogOpen, setIsAddToGalleryDialogOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div style={{ marginBottom: "var(--space-ml)", marginTop: "var(--space-xs)" }}>
      <div style={{ display: "flex", gap: "var(--space-xs)" }}>
        <IconButton
          buttonText={"Add to gallery"}
          hoverText={"Add this Sierpinski Shape to our gallery, and name if if you'd like"}
          iconImage={"/like-icon.png"}
          onClick={() => {
            setIsAnimating(false);
            setIsAddToGalleryDialogOpen(true);
          }}
        />
        <DownloadButton
          svgId={thisSvgId}
          imageFormat="png"
          rotations={rotations}
          iterations={iterations}
          color={color}
          shareText={createUrl}
        />
        <DownloadButton
          svgId={thisSvgId}
          imageFormat="svg"
          rotations={rotations}
          iterations={iterations}
          color={color}
          shareText={createUrl}
        />
        <IconButton
          buttonText={"Buy merch"}
          hoverText={
            "Shop for t-shirts, wall prints, pillows, and more ... all with Sierpinski Shapes printed on them!"
          }
          iconImage={"/t-shirt-icon.png"}
          onClick={() => {
            setIsAnimating(false);
            navigate("/shop");
          }}
          isHiddenOnNarrowScreens={true}
        />
      </div>
      <AddToGalleryDialog isOpen={isAddToGalleryDialogOpen} setIsOpen={setIsAddToGalleryDialogOpen} />
    </div>
  );
}
