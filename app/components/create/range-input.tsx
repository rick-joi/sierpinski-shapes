import { Dispatch, SetStateAction } from "react";

type Props = Readonly<{
  max: number;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  isDisabled?: boolean;
  id: string;
}>;
export default function RangeInput({ max, value, setValue, isDisabled, id }: Props) {
  return (
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
  );
}
