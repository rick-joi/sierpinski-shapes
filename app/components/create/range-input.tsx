import { Dispatch, SetStateAction, useId } from "react";
import ControlLayout from "./control-layout";

type Props = Readonly<{
  label: string;
  max: number;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  isDisabled?: boolean;
}>;
export default function RangeInput({ label, max, value, setValue, isDisabled }: Props) {
  const id = useId();
  return (
    <ControlLayout label={label} id={id}>
      <>
        <span style={{ fontSize: "x-small", verticalAlign: "top" }}>0</span>
        <input
          type="range"
          min={0}
          max={max}
          disabled={isDisabled}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          style={{ verticalAlign: "middle", flexGrow: 1 }}
          id={id}
        />
        <span style={{ fontSize: "x-small", verticalAlign: "bottom" }}>{max}</span>
      </>
    </ControlLayout>
  );
}
