import { getMeta } from "~/model/utility/route-utilities";
import GalleryItemCard, { GalleryItem } from "~/components/gallery/gallery-item-card";

export const meta = getMeta("Gallery", "View Sierpinski Shapes created by others!");

export default function Index() {
  //

  const galleryItems: GalleryItem[] = [];
  galleryItems.push({
    key: "1",
    name: "The OG",
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
    name: "Watch out for the barbed wire",
    rotations: { topLeft: 234, topRight: 47, bottomLeft: 112, bottomRight: null },
    color: "#000000",
  });
  galleryItems.push({
    key: "6",
    name: "So many peppermints",
    rotations: { topLeft: 46, topRight: null, bottomLeft: 315, bottomRight: 115 },
    color: "#c02668",
  });
  galleryItems.push({
    key: "7",
    name: "I can't read your handwriting",
    rotations: { topLeft: 133, topRight: null, bottomLeft: 171, bottomRight: 326 },
    color: "#000000",
  });
  galleryItems.push({
    key: "8",
    name: "Here come the bats again",
    rotations: { topLeft: 0, topRight: null, bottomLeft: 171, bottomRight: 326 },
    color: "#000000",
  });
  galleryItems.push({
    key: "9",
    name: "Starry night",
    rotations: { topLeft: 214, topRight: null, bottomLeft: 72, bottomRight: 0 },
    color: "#eac234",
  });
  galleryItems.push({
    key: "10",
    name: "Christmas tree farm",
    rotations: { topLeft: 0, topRight: null, bottomLeft: 14, bottomRight: 352 },
    color: "#218e1f",
  });
  galleryItems.push({
    key: "11",
    name: "Can you see the hidden face?",
    rotations: { topLeft: 39, topRight: null, bottomLeft: 209, bottomRight: 122 },
    color: "#000000",
  });
  return (
    <>
      <p style={{ textAlign: "center" }}>There are over 16 billion Sierpinski Shapes! 🫨</p>
      <p style={{ textAlign: "center" }}>These are some of the community&lsquo;s favorites...</p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", justifyContent: "center" }}>
        {galleryItems.map((item) => (
          <GalleryItemCard key={item.key} item={item} />
        ))}
      </div>
    </>
  );
}
