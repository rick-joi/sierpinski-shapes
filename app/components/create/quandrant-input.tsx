import { Dispatch, SetStateAction, useId } from "react";
import ControlWithLabelLayout from "./control-with-label-layout";
import RangeInput from "./range-input";

export type QuandrantInputProps = Readonly<{
  label: string;
  isDisabled: boolean;
  rotation: number;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  setRotation: Dispatch<SetStateAction<number>>;
}>;

export default function QuadrantInput({
  label,
  setIsDisabled,
  rotation,
  isDisabled,
  setRotation,
}: QuandrantInputProps) {
  const id = useId();
  return (
    <ControlWithLabelLayout label={label} isDisabled={isDisabled} id={id}>
      <>
        <input
          type="checkbox"
          checked={!isDisabled}
          onChange={(e) => setIsDisabled(!e.target.checked)}
          style={{
            verticalAlign: "middle",
            height: "1rem",
            width: "1rem",
            marginRight: "0.25rem",
          }}
        />
        <RangeInput
          max={359}
          value={rotation}
          setValue={setRotation}
          id={id}
          rangeLabelSuffix="º"
          isDisabled={isDisabled}
        />
      </>
    </ControlWithLabelLayout>
  );
}
