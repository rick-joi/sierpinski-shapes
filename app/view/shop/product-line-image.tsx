type Props = Readonly<{
  imageName: string;
  singularName: string;
  width: string;
  top: string;
  left: string;
}>;
export default function ProductLineImage({ imageName, singularName, width, top, left }: Props) {
  return (
    <img
      src={`/public/shop/${imageName}`}
      alt={`Example ${singularName}`}
      style={{
        width: width,
        position: "relative",
        top: top,
        left: left,
        boxShadow: "4px 4px 5px rgba(0, 0, 0, 0.3)",
      }}
    />
  );
}
