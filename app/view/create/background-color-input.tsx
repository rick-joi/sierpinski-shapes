import { Dispatch, SetStateAction, useId } from "react";
import ControlWithLabelLayout from "../_shared/forms/control-with-label-layout";
import { BackgroundColorType } from "../_shared/sierpinski-shape/sierpinski-utilities";
import ColorInputNoLabel from "../_shared/forms/color-input-no-label";

type Props = Readonly<{
  backgroundColorType: BackgroundColorType;
  setBackgroundColorType: Dispatch<SetStateAction<BackgroundColorType>>;
  backgroundColor: string;
  setBackgroundColor: Dispatch<SetStateAction<string>>;
}>;

export default function BackgroundColorInput({
  backgroundColorType,
  setBackgroundColorType,
  backgroundColor,
  setBackgroundColor,
}: Props) {
  //
  const id = useId();

  return (
    <ControlWithLabelLayout label="Background color" isDisabled={false} id={id}>
      <ColorInputNoLabel
        color={backgroundColor}
        setColor={setBackgroundColor}
        isTransparent={backgroundColorType === "transparent"}
        id={id}
      />
      <select
        value={backgroundColorType}
        onChange={backgroundColorTypeOnChange}
        style={{ marginLeft: "var(--space-xxs)" }}
        name="background-color-type"
      >
        <option value="auto">Auto</option>
        <option value="custom">Custom</option>
        <option value="transparent">Transparent</option>
      </select>
    </ControlWithLabelLayout>
  );

  function backgroundColorTypeOnChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const value = event.target.selectedOptions[0].value as BackgroundColorType;
    setBackgroundColorType(value);
  }
}
