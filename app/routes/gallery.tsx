import { getMeta } from "~/view/shared/utilities/route-utilities";
import GalleryItemCard from "~/view/gallery/gallery-item-card";
import Gallery from "~/model/gallery/gallery";
import { useLoaderData } from "@remix-run/react";

export const meta = getMeta("Gallery", "View Sierpinski Shapes created by others!");

export default function Index() {
  //
  const galleryShapes = useLoaderData<typeof loader>();
  return (
    <>
      <p style={{ textAlign: "center" }}>
        There are over 16 billion Sierpinski&nbsp;Shapes!&nbsp;🫨 &nbsp; &nbsp; Here&nbsp;are&nbsp;some&nbsp;favorites...
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        {galleryShapes.map((shape) => (
          <GalleryItemCard key={shape.id} shape={shape} />
        ))}
      </div>
    </>
  );
}

export async function loader() {
  return Gallery.getGalleryShapes();
}
