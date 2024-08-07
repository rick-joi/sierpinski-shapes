import { Dispatch, SetStateAction, useId } from "react";
import { rgbToGrayScale } from "../miscellaneous/utilities/color-utilities";

type Props = Readonly<{
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  disabled?: boolean;
}>;
export default function ColorInputNoLabel({ color, setColor, disabled }: Props) {
  //
  const id = useId();

  return (
    <input
      type="color"
      value={color}
      onChange={(e) => setColor(e.target.value)}
      id={id}
      style={{ flexGrow: 1, border: calculateBorder(color) }}
      disabled={disabled}
    />
  );
}

function calculateBorder(color: string) {
  const grayscale = rgbToGrayScale(color);
  return grayscale && grayscale > 239 ? "1px solid var(--color-gray-light)" : "none";
}
