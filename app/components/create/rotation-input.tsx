import { Dispatch, SetStateAction } from "react";
import NumberInput from "./number-input";

type Props = Readonly<{
  label: string;
  isOn: boolean;
  setIsOn: Dispatch<SetStateAction<boolean>>;
  rotation: number;
  setRotation: Dispatch<SetStateAction<number>>;
}>;

export default function RotationInput(props: Props) {
  //
  if (props.rotation < 0 || props.rotation > 359) {
    props.setRotation((props.rotation + 360) % 360);
  }
  return (
    <span style={{ whiteSpace: "nowrap", textAlign: "right" }}>
      <NumberInput label={props.label} value={props.rotation} setValue={props.setRotation} isDisabled={!props.isOn} />
      <input type="checkbox" checked={props.isOn} onChange={checkBoxChange} style={{ marginLeft: "0.5rem" }} />
    </span>
  );

  function checkBoxChange(event: React.ChangeEvent<HTMLInputElement>) {
    props.setIsOn(event.target.checked);
  }
}
