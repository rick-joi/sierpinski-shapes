import { Dispatch, SetStateAction, useId } from "react";
import ControlWithLabelLayout from "./control-with-label-layout";
import RangeInput from "./range-input";

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
      <RangeInput max={max} value={value} setValue={setValue} isDisabled={isDisabled} id={id} />
    </ControlWithLabelLayout>
  );
}
