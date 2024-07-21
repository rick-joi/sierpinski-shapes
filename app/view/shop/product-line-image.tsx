type Props = Readonly<{
  imageName: string;
  singularName: string;
  width: number;
  top: number;
  left: number;
}>;
export default function ProductLineImage({ imageName, singularName, width, top, left }: Props) {
  //
  const VW_MULTIPLIER = 2;
  const vwWidth = width * VW_MULTIPLIER;
  const vwTop = top * VW_MULTIPLIER;
  const vwLeft = left * VW_MULTIPLIER;

  return (
    <img
      src={`/shop/low-res/${imageName}`}
      alt={`Example ${singularName}`}
      style={{
        width: `min(${vwWidth}vw, ${width}rem)`,
        position: "relative",
        top: `max(${vwTop}vw, ${top}rem)`,
        left: `max(${vwLeft}vw, ${left}rem)`,
        boxShadow: "4px 4px 5px rgba(0, 0, 0, 0.3)",
        borderRadius: "0.25rem",
      }}
    />
  );
}
