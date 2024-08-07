import { Dispatch, SetStateAction, useId } from "react";
import { rgbToGrayScale } from "../miscellaneous/utilities/color-utilities";

type Props = Readonly<{
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  isTransparent?: boolean;
}>;
export default function ColorInputNoLabel({ color, setColor, isTransparent }: Props) {
  //
  const id = useId();
  if (isTransparent) {
    return (
      <img
        alt="transparent"
        src="/create/transparent-checkerboard.png"
        width="50"
        height="27"
        style={{ opacity: 0.33 }}
      />
    );
  } else {
    return (
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        id={id}
        style={{ flexGrow: 0, border: calculateBorder(color) }}
      />
    );
  }
}

function calculateBorder(color: string) {
  const grayscale = rgbToGrayScale(color);
  return grayscale && grayscale > 239 ? "1px solid var(--color-gray-light)" : `1px solid ${color}`;
}
