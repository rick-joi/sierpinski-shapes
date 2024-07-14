import { Dispatch, SetStateAction, useId } from "react";
import ControlWithLabelLayout from "./control-with-label-layout";
import RangeInputWithoutLabel from "./range-input-without-label";

type Props = Readonly<{
  label: string;
  max: number;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  isDisabled?: boolean;
}>;
export default function RangeInputWithLabel({ label, max, value, setValue, isDisabled }: Props) {
  const id = useId();
  return (
    <ControlWithLabelLayout label={label} isDisabled={false} id={id}>
      <RangeInputWithoutLabel max={max} value={value} setValue={setValue} isDisabled={isDisabled} id={id} />
    </ControlWithLabelLayout>
  );
}
