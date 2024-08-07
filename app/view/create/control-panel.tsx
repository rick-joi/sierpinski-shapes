import { Dispatch, SetStateAction } from "react";

import ColorInput from "../_shared/forms/color-input";
import IconButton from "../_shared/forms/icon-button";
import RangeInput from "../_shared/forms/range-input";
import SierpinskiText from "../_shared/sierpinski-shape/sierpinski-text";

import QuadrantInput, { AllFourQuadrantInputProps, getRotations } from "./quadrant-input";
import BackgroundColorTypeInput from "./background-color-input";
import { BackgroundColorType } from "../_shared/sierpinski-shape/sierpinski-utilities";

type Props = Readonly<{
  quadrantProps: AllFourQuadrantInputProps;
  maxIterations: number;
  iterations: number;
  setIterations: Dispatch<SetStateAction<number>>;
  color: string;
  setColor: Dispatch<SetStateAction<string>>;
  backgroundColorType: BackgroundColorType;
  setBackgroundColorType: Dispatch<SetStateAction<BackgroundColorType>>;
  backgroundColor: string;
  setBackgroundColor: Dispatch<SetStateAction<string>>;
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
  backgroundColorType,
  setBackgroundColorType,
  backgroundColor,
  setBackgroundColor,
  isAnimating,
  setIsAnimating,
}: Props) {
  return (
    <div>
      <fieldset style={{ border: "none" }}>
        <div style={{ display: "flex", gap: "var(--space-md)" }}>
          <div style={{ flexGrow: "1" }}>
            <RangeInput label="Iterations" max={maxIterations} value={iterations} setValue={setIterations} />
          </div>
        </div>
        <div style={{ display: "flex", gap: "var(--space-md)" }}>
          <QuadrantInput {...quadrantProps.topLeft} />
          <QuadrantInput {...quadrantProps.topRight} />
        </div>
        <div style={{ display: "flex", gap: "var(--space-md)" }}>
          <QuadrantInput {...quadrantProps.bottomLeft} />
          <QuadrantInput {...quadrantProps.bottomRight} />
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            columnGap: "var(--space-md)",
            rowGap: "var(--space-sm)",
          }}
        >
          <div>
            <ColorInput label={"Color"} color={color} setColor={setColor} style={{ marginRight: "var(--space-md)" }} />
            <BackgroundColorTypeInput
              backgroundColorType={backgroundColorType}
              setBackgroundColorType={setBackgroundColorType}
              backgroundColor={backgroundColor}
              setBackgroundColor={setBackgroundColor}
            />
          </div>
          <div style={{ alignSelf: "flex-end", paddingBottom: "var(--space-md)" }}>
            <IconButton
              buttonText={isAnimating ? "Pause animation" : "Animate"}
              iconImage={isAnimating ? "/pause-icon.png" : "/play-icon.png"}
              isDisabled={iterations === 0}
              onClick={() => setIsAnimating((previous) => !previous)}
              style={{ width: "13em" }}
              isCallToAction={isAnimating}
            />
          </div>
          <div style={{ alignSelf: "flex-end", paddingBottom: "var(--space-md)" }}>
            <SierpinskiText
              rotations={getRotations(quadrantProps)}
              iterations={iterations}
              style={{
                fontSize: "smaller",
                display: "inline-block",
                whiteSpace: "nowrap",
                minWidth: "15em",
                textAlign: "right",
              }}
            />
          </div>
        </div>
      </fieldset>
    </div>
  );
}
