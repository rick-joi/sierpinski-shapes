import { Dispatch, SetStateAction } from "react";

export type QuandrantInputProps = Readonly<{
  isOn: boolean;
  rotation: number;
  color: string;
  setIsOn: Dispatch<SetStateAction<boolean>>;
  setRotation: Dispatch<SetStateAction<number>>;
  setColor: Dispatch<SetStateAction<string>>;
}>;

export default function QuadrantInput({ isOn, rotation, color, setIsOn, setRotation, setColor }: QuandrantInputProps) {
  return (
    <span style={{ display: "inline-block", padding: "0.25rem 0.5rem", verticalAlign: "middle" }}>
      <input
        type="checkbox"
        checked={isOn}
        onChange={(e) => setIsOn(e.target.checked)}
        style={{ verticalAlign: "middle", height: "1rem", width: "1rem" }}
      />
      <input
        type="number"
        pattern="\d*"
        min={-1}
        max={360}
        disabled={!isOn}
        value={rotation}
        onChange={(e) => setRotation((Number(e.target.value) + 360) % 360)}
        style={{ height: "1.5rem", padding: "0.1rem", textAlign: "center", marginLeft: "0.25rem" }}
      />
      <input
        type="color"
        disabled={!isOn}
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ height: "1.5rem", width: "1.5rem", verticalAlign: "middle", marginLeft: "0.25rem" }}
      />
    </span>
  );
}
