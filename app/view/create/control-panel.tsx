import { Dispatch, SetStateAction } from "react";

import ColorInput from "../_shared/forms/color-input";
import IconButton from "../_shared/forms/icon-button";
import RangeInput from "../_shared/forms/range-input";
import SierpinskiText from "../_shared/sierpinski-shape/sierpinski-text";

import QuadrantInput, { AllFourQuadrantInputProps, getRotations } from "./quadrant-input";

type Props = Readonly<{
  quadrantProps: AllFourQuadrantInputProps;
  maxIterations: number;
  iterations: number;
  setIterations: Dispatch<SetStateAction<number>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  isAnimating: boolean;
  setIsAnimating: Dispatch<SetStateAction<boolean>>;
}>;

export default function ControlPanel({
  quadrantProps,
  maxIterations,
  iterations,
  setIterations,
  color,
  setColor,
  isAnimating,
  setIsAnimating,
}: Props) {
  return (
    <div>
      <fieldset style={{ border: "none" }}>
        <div style={{ display: "flex", gap: "var(--space-md)" }}>
          <QuadrantInput {...quadrantProps.topLeft} />
          <QuadrantInput {...quadrantProps.topRight} />
        </div>
        <div style={{ display: "flex", gap: "var(--space-md)" }}>
          <QuadrantInput {...quadrantProps.bottomLeft} />
          <QuadrantInput {...quadrantProps.bottomRight} />
        </div>
        <div style={{ display: "flex", gap: "var(--space-md)" }}>
          <div style={{ flexGrow: "1" }}>
            <RangeInput label="Iterations" max={maxIterations} value={iterations} setValue={setIterations} />
          </div>
          <div>
            <ColorInput label={"Color"} color={color} setColor={setColor} />
          </div>
          <div style={{ alignSelf: "flex-end", paddingBottom: "var(--space-sm)" }}>
            <IconButton
              buttonText={isAnimating ? "Pause animation" : "Animate"}
              iconImage={isAnimating ? "/pause-icon.png" : "/play-icon.png"}
              isDisabled={iterations === 0}
              onClick={() => setIsAnimating((previous) => !previous)}
              style={{ width: "11em" }}
              className={isAnimating ? "cta" : ""}
            />
          </div>
        </div>
        <div style={{ fontSize: "smaller" }}>
          <SierpinskiText rotations={getRotations(quadrantProps)} iterations={iterations} color={color} />
        </div>
      </fieldset>
    </div>
  );
}
