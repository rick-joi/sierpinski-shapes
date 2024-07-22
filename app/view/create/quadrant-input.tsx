import { Dispatch, SetStateAction, useId, useState } from "react";

import ControlWithLabelLayout from "../_shared/forms/control-with-label-layout";
import RangeInputWithoutLabel from "../_shared/forms/range-input-without-label";

import { Rotations } from "~/model/_shared/rotations";

export type QuadrantInputProps = Readonly<{
  label: string;
  isDisabled: boolean;
  rotation: number;
  setIsDisabled: Dispatch<SetStateAction<boolean>>;
  setRotation: Dispatch<SetStateAction<number>>;
}>;

export type AllFourQuadrantInputProps = Readonly<{
  topLeft: QuadrantInputProps;
  topRight: QuadrantInputProps;
  bottomLeft: QuadrantInputProps;
  bottomRight: QuadrantInputProps;
}>;

export default function QuadrantInput({ label, setIsDisabled, rotation, isDisabled, setRotation }: QuadrantInputProps) {
  const id = useId();
  return (
    <ControlWithLabelLayout label={label} isDisabled={isDisabled} id={id}>
      <>
        <input
          type="checkbox"
          checked={!isDisabled}
          onChange={(e) => setIsDisabled(!e.target.checked)}
          style={{
            verticalAlign: "middle",
            height: "1rem",
            width: "1rem",
            marginRight: "var(--space-2xs)",
          }}
        />
        <RangeInputWithoutLabel
          max={359}
          value={rotation}
          setValue={setRotation}
          id={id}
          rangeLabelSuffix="º"
          isDisabled={isDisabled}
        />
      </>
    </ControlWithLabelLayout>
  );
}

export function useQuadrantInputProps(label: string, initialRotation: number | null): QuadrantInputProps {
  //
  const [isDisabled, setIsDisabled] = useState<boolean>(initialRotation === null);
  const [rotation, setRotation] = useState<number>(initialRotation ?? 0);

  return { label, isDisabled, rotation, setIsDisabled, setRotation };
}

export function useAllFourQuadrantInputProps(initialRotations: Rotations): AllFourQuadrantInputProps {
  //
  const topLeft = useQuadrantInputProps("Top left", initialRotations.topLeft);
  const topRight = useQuadrantInputProps("Top right", initialRotations.topRight);
  const bottomLeft = useQuadrantInputProps("Bottom left", initialRotations.bottomLeft);
  const bottomRight = useQuadrantInputProps("Bottom right", initialRotations.bottomRight);

  return { topLeft, topRight, bottomLeft, bottomRight };
}

export function getRotations(allFourQuadrantsInputProps: AllFourQuadrantInputProps): Rotations {
  return {
    topLeft: getRotation(allFourQuadrantsInputProps.topLeft),
    topRight: getRotation(allFourQuadrantsInputProps.topRight),
    bottomLeft: getRotation(allFourQuadrantsInputProps.bottomLeft),
    bottomRight: getRotation(allFourQuadrantsInputProps.bottomRight),
  };
}

function getRotation(quadrantInputProps: QuadrantInputProps): number | null {
  return quadrantInputProps.isDisabled ? null : quadrantInputProps.rotation;
}
