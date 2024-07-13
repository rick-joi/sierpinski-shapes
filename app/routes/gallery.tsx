import { getMeta } from "~/model/utility/route-utilities";
import GalleryItemCard, { GalleryItem } from "~/components/gallery/gallery-item-card";

export const meta = getMeta("Gallery", "View Sierpinski Shapes created by others!");

export default function Index() {
  //

  const galleryItems: GalleryItem[] = [];
  galleryItems.push({
    key: "1",
    name: "The original Sierpinski Triangle",
    rotations: { topLeft: 0, topRight: null, bottomLeft: 0, bottomRight: 0 },
    color: "#000000",
  });
  galleryItems.push({
    key: "2",
    name: "Ferns",
    rotations: { topLeft: 330, topRight: null, bottomLeft: 145, bottomRight: 0 },
    color: "#005500",
  });
  galleryItems.push({
    key: "3",
    name: "Butterflies",
    rotations: { topLeft: 186, topRight: null, bottomLeft: 174, bottomRight: 210 },
    color: "#c38a28",
  });
  galleryItems.push({
    key: "4",
    name: "Star fighters",
    rotations: { topLeft: 101, topRight: null, bottomLeft: 259, bottomRight: 153 },
    color: "#735591",
  });
  galleryItems.push({
    key: "5",
    name: "So many peppermints",
    rotations: { topLeft: 46, topRight: null, bottomLeft: 315, bottomRight: 115 },
    color: "#c02668",
  });
  return (
    <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
      {galleryItems.map((item) => (
        <GalleryItemCard key={item.key} item={item} />
      ))}
    </div>
  );
}
