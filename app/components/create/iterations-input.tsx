import { Dispatch, SetStateAction, useId } from "react";

type Props = Readonly<{
  maxIterations: number;
  iterations: number;
  setIterations: Dispatch<SetStateAction<number>>;
  isDisabled?: boolean;
}>;

export default function IterationsInput({ maxIterations, iterations, setIterations, isDisabled }: Props) {
  const id = useId();
  return (
    <>
      <label htmlFor={id} style={{ height: "1.5rem", verticalAlign: "middle" }}>
        Detail
      </label>
      <input
        type="range"
        min={0}
        max={maxIterations}
        disabled={isDisabled}
        value={iterations}
        onChange={(e) => setIterations(Number(e.target.value))}
        id={id}
      />
    </>
  );
}
