export default function rgbToGrayScale(color: string) {
  //
  if (!color.startsWith("#") || !(color.length === 7)) {
    return undefined;
  }
  const red = parseInt(color.slice(1, 3), 16);
  const green = parseInt(color.slice(3, 5), 16);
  const blue = parseInt(color.slice(5, 7), 16);
  return 0.299 * red + 0.587 * green + 0.114 * blue;
}
