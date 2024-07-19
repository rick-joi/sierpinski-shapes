import { Dispatch, SetStateAction } from "react";

import SierpinskiText from "../shared/sierpinski-shape/sierpinski-text";

import ColorInput from "../shared/utilities/forms/color-input";
import IconButton from "../shared/utilities/icon-button";
import QuadrantInput, { AllFourQuadrantInputProps, getRotations } from "./quadrant-input";
import RangeInput from "../shared/utilities/forms/range-input";

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
        <div style={{ display: "flex", gap: "1rem" }}>
          <QuadrantInput {...quadrantProps.topLeft} />
          <QuadrantInput {...quadrantProps.topRight} />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <QuadrantInput {...quadrantProps.bottomLeft} />
          <QuadrantInput {...quadrantProps.bottomRight} />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <div style={{ flexGrow: "1" }}>
            <RangeInput label="Iterations" max={maxIterations} value={iterations} setValue={setIterations} />
          </div>
          <div>
            <ColorInput label={"Color"} color={color} setColor={setColor} />
          </div>
          <div style={{ alignSelf: "flex-end", paddingBottom: "0.75rem" }}>
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
        <div style={{ color: "gray", fontSize: "smaller" }}>
          <SierpinskiText rotations={getRotations(quadrantProps)} iterations={iterations} color={color} />
        </div>
      </fieldset>
    </div>
  );
}
