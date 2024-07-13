import { Dispatch, SetStateAction } from "react";

export type QuandrantInputProps = Readonly<{
  name: string;
  isOn: boolean;
  rotation: number;
  color: string;
  setIsOn: Dispatch<SetStateAction<boolean>>;
  setRotation: Dispatch<SetStateAction<number>>;
  setColor: Dispatch<SetStateAction<string>>;
}>;

export default function QuadrantInput({
  name,
  isOn,
  rotation,
  color,
  setIsOn,
  setRotation,
  setColor,
}: QuandrantInputProps) {
  return (
    <span style={{ display: "inline-block", paddingRight: "1rem", verticalAlign: "middle" }}>
      <label>{name}</label>
      <input
        type="checkbox"
        checked={isOn}
        onChange={(e) => setIsOn(e.target.checked)}
        style={{ marginLeft: "0.5rem" }}
      />
      <input
        type="number"
        pattern="\d*"
        min={-1}
        max={360}
        disabled={!isOn}
        value={rotation}
        onChange={(e) => setRotation((Number(e.target.value) + 360) % 360)}
        style={{ height: "1.5rem", padding: "0.1rem", textAlign: "center" }}
      />
      <input
        type="color"
        disabled={!isOn}
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ height: "1.5rem", width: "1.5rem", verticalAlign: "middle" }}
      />
    </span>
  );
}
