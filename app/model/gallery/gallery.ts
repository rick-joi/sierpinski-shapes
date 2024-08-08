import SierpinskiShape from "../_shared/sierpinski-shape";

export default class Gallery {
  //
  public static async getGalleryShapes(): Promise<Readonly<SierpinskiShape[]>> {
    //
    const galleryItems: SierpinskiShape[] = [];
    galleryItems.push(new SierpinskiShape(1, "the OG", 0, null, 0, 0, "#003e4d", "#faffff"));
    galleryItems.push(new SierpinskiShape(2, "ferns", 330, null, 145, 0, "#005500", "#ecffec"));
    galleryItems.push(new SierpinskiShape(3, "butterflies", 186, null, 174, 210, "#c38a28", "#f0fdff"));
    galleryItems.push(new SierpinskiShape(4, "puzzle pieces", 101, null, 259, 153, "#735591", "#fffff0"));
    galleryItems.push(
      new SierpinskiShape(5, "watch out for the barbed wire", 234, 47, 112, null, "#000000", "#ededed")
    );
    galleryItems.push(new SierpinskiShape(6, "so many peppermints", 46, null, 315, 115, "#c02668", "#fff5ff"));
    galleryItems.push(new SierpinskiShape(7, "Ô Canada", 224, 0, null, 162, "#ff0000", "#ffffff"));
    galleryItems.push(
      new SierpinskiShape(8, "I can’t read your handwriting", 133, null, 171, 326, "#000000", "#ffffff")
    );
    galleryItems.push(new SierpinskiShape(9, "here come the bats again", 0, null, 171, 326, "#000000", "#605757"));
    galleryItems.push(new SierpinskiShape(10, "Sierpinski’s starry night", 214, null, 72, 0, "#ebc53d", "#1f1a00"));
    galleryItems.push(
      new SierpinskiShape(11, "in my heart is a Christmas tree farm", 0, null, 14, 352, "#218e1f", "#ffe5f8")
    );
    galleryItems.push(new SierpinskiShape(12, "let’s play jacks", 44, 180, null, 306, "#f490bb", "#f1f5fa"));
    galleryItems.push(
      new SierpinskiShape(13, "can you see the hidden face?", 39, null, 209, 122, "#000000", "#e1cdb2")
    );
    galleryItems.push(new SierpinskiShape(14, "deoxyribonucleic acid", 173, 171, 333, null, "#555555", "#fffcfa"));
    galleryItems.push(new SierpinskiShape(15, "who’s shell is this?", 254, 343, 27, null, "#e16c2d", "fff8eb"));
    galleryItems.push(new SierpinskiShape(16, "snow angel", 337, 27, null, 175, "#9b8c8c", "ffffff"));
    galleryItems.push(
      new SierpinskiShape(17, "in the crook of the old oak tree", 335, null, 35, 194, "#583f13", "#fff4e0")
    );
    galleryItems.push(new SierpinskiShape(18, "it’s raining broccoli", 38, 345, null, 311, "#076412", "#ecfff7"));
    galleryItems.push(new SierpinskiShape(19, "lightning strikes twice", 320, 176, 354, null, "#fffff0", "#3d3d00"));
    galleryItems.push(new SierpinskiShape(20, "the Sierpinski flame", 15, null, 15, 195, "#ac2020", "#fff9db"));
    galleryItems.push(new SierpinskiShape(21, "flying flock", 182, 179, null, 180, "#001b3d", "#dff4fb"));
    galleryItems.push(new SierpinskiShape(22, "Picaso’s triangle", 7, null, 359, 127, "#3a96f8", "#dbedff"));
    galleryItems.push(
      new SierpinskiShape(23, "stay up all night to get lucky", 316, 46, 43, 317, "#3f9938", "#ecffec")
    );
    galleryItems.push(new SierpinskiShape(24, "Sierpinski’s shag carpet", 158, 198, 175, 194, "#88623f", "#ffffea"));
    galleryItems.push(new SierpinskiShape(25, "snowflakes", null, 83, 302, 134, "#ffffff", "#0d6582"));
    galleryItems.push(new SierpinskiShape(26, "tornado", 191, 20, 0, null, "#000000", "#afa1a1"));

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
