import { Dispatch, SetStateAction, useId } from "react";
import ControlWithLabelLayout from "./control-with-label-layout";

export type QuandrantInputProps = Readonly<{
  label: string;
  isOn: boolean;
  rotation: number;
  setIsOn: Dispatch<SetStateAction<boolean>>;
  setRotation: Dispatch<SetStateAction<number>>;
}>;

export default function QuadrantInput({ label, isOn, rotation, setIsOn, setRotation }: QuandrantInputProps) {
  const id = useId();
  return (
    <ControlWithLabelLayout label={label} id={id}>
      <>
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
          style={{
            height: "1.5rem",
            padding: "0.1rem",
            textAlign: "center",
            marginLeft: "0.25rem",
            color: isOn ? "black" : "#f0f0f0",
          }}
        />
      </>
    </ControlWithLabelLayout>
  );
}
