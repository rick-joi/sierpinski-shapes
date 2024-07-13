import { Dispatch, SetStateAction, useId } from "react";
import ControlWithLabelLayout from "./control-with-label-layout";

type Props = Readonly<{
  label: string;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
}>;
export default function ColorInput({ label, color, setColor }: Props) {
  const id = useId();
  return (
    <ControlWithLabelLayout label={label} isDisabled={false} id={id}>
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} id={id} style={{ flexGrow: 1 }} />
    </ControlWithLabelLayout>
  );
}
