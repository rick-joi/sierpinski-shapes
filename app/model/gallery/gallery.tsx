import SierpinskiShape from "../_shared/sierpinski-shape";

export default class Gallery {
  //
  public static async getGalleryShapes(): Promise<Readonly<SierpinskiShape[]>> {
    //
    const galleryItems: SierpinskiShape[] = [];
    galleryItems.push(new SierpinskiShape(1, "the OG", 0, null, 0, 0, "#000000"));
    galleryItems.push(new SierpinskiShape(2, "ferns", 330, null, 145, 0, "#005500"));
    galleryItems.push(new SierpinskiShape(3, "butterflies", 186, null, 174, 210, "#c38a28"));
    galleryItems.push(new SierpinskiShape(4, "puzzle pieces", 101, null, 259, 153, "#735591"));
    galleryItems.push(new SierpinskiShape(5, "watch out for the barbed wire", 234, 47, 112, null, "#000000"));
    galleryItems.push(new SierpinskiShape(6, "so many peppermints", 46, null, 315, 115, "#c02668"));
    galleryItems.push(new SierpinskiShape(7, "Ô Canada", 224, 0, null, 162, "#ff0000"));
    galleryItems.push(new SierpinskiShape(8, "I can’t read your handwriting", 133, null, 171, 326, "#000000"));
    galleryItems.push(new SierpinskiShape(9, "here come the bats again", 0, null, 171, 326, "#000000"));
    galleryItems.push(new SierpinskiShape(10, "Sierpinski’s starry night", 214, null, 72, 0, "#eac234"));
    galleryItems.push(new SierpinskiShape(11, "in my heart is a Christmas tree farm", 0, null, 14, 352, "#218e1f"));
    galleryItems.push(new SierpinskiShape(12, "let’s play jacks", 44, 180, null, 306, "#f490bb"));
    galleryItems.push(new SierpinskiShape(13, "can you see the hidden face?", 39, null, 209, 122, "#000000"));
    galleryItems.push(new SierpinskiShape(14, "deoxyribonucleic acid", 173, 171, 333, null, "#555555"));
    galleryItems.push(new SierpinskiShape(15, "who’s shell is this?", 254, 343, 27, null, "#e16c2d"));
    galleryItems.push(new SierpinskiShape(16, "snow angel", 337, 27, null, 175, "#9b8c8c"));
    galleryItems.push(new SierpinskiShape(17, "in the crook of the old oak tree", 335, null, 35, 194, "#583f13"));
    galleryItems.push(new SierpinskiShape(18, "broccoli", 38, 345, null, 311, "#2a7a33"));
    galleryItems.push(new SierpinskiShape(19, "lightning", 320, 176, 354, null, "#f5e105"));
    galleryItems.push(new SierpinskiShape(20, "the eternal flame", 15, null, 15, 195, "#ac2020"));
    shuffle(galleryItems);
    return galleryItems.slice(0, 12);
  }
}

// uses Durstenfeld shuffle algorithm
function shuffle<T>(array: T[]): void {
  //
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
