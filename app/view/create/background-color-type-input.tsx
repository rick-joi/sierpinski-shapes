import { Dispatch, SetStateAction } from "react";
import ControlWithLabelLayout from "../_shared/forms/control-with-label-layout";
import { BackgroundColorType } from "../_shared/sierpinski-shape/sierpinski-utilities";
import ColorInputNoLabel from "../_shared/forms/color-input-no-label";

type Props = Readonly<{
  backgroundColorType: BackgroundColorType;
  setBackgroundColorType: Dispatch<SetStateAction<BackgroundColorType>>;
  backgroundColor: string;
  setBackgroundColor: Dispatch<SetStateAction<string>>;
}>;

export default function BackgroundColorTypeInput({
  backgroundColorType,
  setBackgroundColorType,
  backgroundColor,
  setBackgroundColor,
}: Props) {
  return (
    <ControlWithLabelLayout label="Background color" isDisabled={false} id={""}>
      <ColorInputNoLabel
        color={backgroundColorType === "custom" ? backgroundColor : "#cccccc"}
        setColor={setBackgroundColor}
        disabled={backgroundColorType !== "custom"}
      />
      <select onChange={backgroundColorTypeOnChange} style={{ marginLeft: "var(--space-xs)" }}>
        <option value="auto" selected={backgroundColorType === "auto"}>
          Auto
        </option>
        <option value="transparent" selected={backgroundColorType === "transparent"}>
          Transparent
        </option>
        <option value="custom" selected={backgroundColorType === "custom"}>
          Custom
        </option>
      </select>
    </ControlWithLabelLayout>
  );

  function backgroundColorTypeOnChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.selectedOptions[0].value as BackgroundColorType;
    alert(`x${value}x`);
    setBackgroundColorType(value);
  }
}
