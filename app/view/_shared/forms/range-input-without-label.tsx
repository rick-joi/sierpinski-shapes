import { Dispatch, SetStateAction } from "react";

type Props = Readonly<{
  max: number;
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  rangeLabelSuffix?: string;
  isDisabled?: boolean;
  id: string;
}>;
export default function RangeInputWithoutLabel({ max, value, setValue, rangeLabelSuffix, isDisabled, id }: Props) {
  return (
    <>
      <span
        style={{ fontSize: "x-small", verticalAlign: "top", color: isDisabled ? "var(--color-gray-light)" : undefined }}
      >
        0{rangeLabelSuffix}
      </span>
      <input
        type="range"
        min={0}
        max={max}
        disabled={isDisabled}
        value={isDisabled ? 0 : value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{
          verticalAlign: "middle",
          flexGrow: 1,
          width: "100%",
          minWidth: "var(--space-lg)",
        }}
        id={id}
      />
      <span
        style={{
          fontSize: "x-small",
          verticalAlign: "bottom",
          color: isDisabled ? "var(--color-gray-light)" : undefined,
        }}
      >
        {max}
        {rangeLabelSuffix}
      </span>
    </>
  );
}
