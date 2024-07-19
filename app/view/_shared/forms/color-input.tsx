import { Dispatch, SetStateAction, useId } from "react";
import ControlWithLabelLayout from "./control-with-label-layout";
import rgbToGrayScale from "../miscellaneous/grayscale";

type Props = Readonly<{
  label: string;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}>;
export default function ColorInput({ label, color, setColor }: Props) {
  const id = useId();
  return (
    <ControlWithLabelLayout label={label} isDisabled={false} id={id}>
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        id={id}
        style={{ flexGrow: 1, border: calculateBorder(color) }}
      />
    </ControlWithLabelLayout>
  );
}

function calculateBorder(color: string) {
  const grayscale = rgbToGrayScale(color);
  return grayscale && grayscale > 239 ? "1px solid lightgray" : "none";
}
