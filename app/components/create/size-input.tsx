import { Dispatch, SetStateAction, useId } from "react";

type Props = Readonly<{
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
  isDisabled?: boolean;
}>;

export default function SizeInput({ size, setSize, isDisabled }: Props) {
  const id = useId();
  return (
    <>
      <label htmlFor={id} style={{ verticalAlign: "middle", textAlign: "right", height: "1.5rem" }}>
        Size
      </label>
      <input
        type="range"
        min={Math.log2(16)}
        max={Math.log2(1024)}
        disabled={isDisabled}
        value={Math.log2(size)}
        onChange={(e) => setSize(2 ** Number(e.target.value))}
        style={{ width: "6rem", height: "1.5rem", textAlign: "center" }}
        id={id}
      />
    </>
  );
}
