import { Dispatch, SetStateAction, useId, useState } from "react";

type Props = Readonly<{
  label: string;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  minValue?: number;
  maxValue?: number;
  roundFunction?: (newValue: number, oldValue: number) => number;
}>;

export default function NumberInput(props: Props) {
  //
  const constrainedValue = Math.min(
    Math.max(props.value, props.minValue ?? Number.MIN_SAFE_INTEGER),
    props.maxValue ?? Number.MAX_SAFE_INTEGER
  );
  const [previousValue, setPreviousValue] = useState(constrainedValue);
  return (
    <>
      <label htmlFor={useId()} style={{ padding: "1rem" }}>
        {props.label}:
      </label>
      <input
        id={useId()}
        type="number"
        value={constrainedValue}
        min={props.minValue}
        max={props.maxValue}
        onChange={handleIterationsChange}
        style={{ height: "2rem", width: "4rem", textAlign: "center" }}
      />
    </>
  );

  function handleIterationsChange(event: React.ChangeEvent<HTMLInputElement>) {
    const roundFunction = props.roundFunction ?? ((newValue: number) => newValue);
    const newValue = Number(event.target.value);
    const adjustedValue = roundFunction(newValue, previousValue);
    props.setValue(adjustedValue);
    setPreviousValue(adjustedValue);
  }
}
