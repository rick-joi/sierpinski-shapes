import { Dispatch, SetStateAction, useId } from "react";
import ControlWithLabelLayout from "./control-with-label-layout";
import ColorInputNoLabel from "./color-input-no-label";

type Props = Readonly<{
  label: string;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  style?: React.CSSProperties;
}>;
export default function ColorInput({ label, color, setColor, style }: Props) {
  const id = useId();
  return (
    <ControlWithLabelLayout label={label} isDisabled={false} id={id} style={style}>
      <ColorInputNoLabel color={color} setColor={setColor} />
    </ControlWithLabelLayout>
  );
}
