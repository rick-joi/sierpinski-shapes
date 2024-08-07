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
      <label style={{ fontSize: "medium", marginRight: "var(--space-xs)", whiteSpace: "nowrap" }}>
        <input
          type="radio"
          value="auto"
          name="background-color-type"
          checked={backgroundColorType === "auto"}
          onChange={backgroundColorTypeOnChange}
        />{" "}
        Auto
      </label>
      <label style={{ fontSize: "medium", marginRight: "var(--space-xs)", whiteSpace: "nowrap" }}>
        <input
          type="radio"
          value="transparent"
          name="background-color-type"
          checked={backgroundColorType === "transparent"}
          onChange={backgroundColorTypeOnChange}
        />{" "}
        Transparent
      </label>
      <label style={{ fontSize: "medium", whiteSpace: "nowrap" }}>
        <input
          type="radio"
          value="custom"
          name="background-color-type"
          checked={backgroundColorType === "custom"}
          onChange={backgroundColorTypeOnChange}
        />{" "}
        Custom:
      </label>
      <ColorInputNoLabel
        color={backgroundColorType === "custom" ? backgroundColor : "#cccccc"}
        setColor={setBackgroundColor}
        disabled={backgroundColorType !== "custom"}
      />
    </ControlWithLabelLayout>
  );

  function backgroundColorTypeOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value as BackgroundColorType;
    setBackgroundColorType(value);
  }
}
