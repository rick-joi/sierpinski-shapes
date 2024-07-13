import { useState } from "react";
import NumberInput from "~/components/create/number-input";
import QuadrantInput, { QuandrantInputProps } from "~/components/create/quandrant-input";
import SierpinskiShape from "~/components/sierpinski-shape/sierpinski-shape";
import { getMeta } from "~/model/utility/route-utilities";

export const meta = getMeta("Create", "Create your own Sierpinski Shape!");

function useQuandrantInputProps(name: string, isOnDefault: boolean): QuandrantInputProps {
  const [isOn, setIsOn] = useState<boolean>(isOnDefault);
  const [rotation, setRotation] = useState<number>(0);
  const [color, setColor] = useState<string>("#000000");
  return { name, isOn, rotation, color, setIsOn, setRotation, setColor };
}

export default function Index() {
  //
  const [size, setSize] = useState(512);
  const [iterations, setIterations] = useState(1);
  const maxIterations = Math.floor(Math.log2(size));
  const topLeftProps = useQuandrantInputProps("Top left", true);
  const topRightProps = useQuandrantInputProps("Top right", false);
  const bottomLeftProps = useQuandrantInputProps("Bottom left", true);
  const bottomRightProps = useQuandrantInputProps("Bottom right", true);
  return (
    <>
      <div>
        <NumberInput
          label="Size"
          value={size}
          setValue={setSize}
          minValue={0}
          maxValue={Number.MAX_SAFE_INTEGER}
          roundFunction={roundToPowerOfTwo}
        />
        <input
          type="range"
          min={0}
          max={maxIterations}
          value={maxIterations}
          onChange={(e) => setIterations(Number(e.target.value))}
        />
      </div>
      <div>
        <QuadrantInput {...topLeftProps} />
        <QuadrantInput {...topRightProps} />
        <QuadrantInput {...bottomLeftProps} />
        <QuadrantInput {...bottomRightProps} />
      </div>
      <SierpinskiShape
        idPrefix={"create"}
        iterationCount={iterations}
        size={size}
        quadrants={{
          topLeft: topLeftProps.isOn
            ? { rotation: topLeftProps.rotation, color: topLeftProps.color, opacity: 1 }
            : null,
          topRight: topRightProps.isOn
            ? { rotation: topRightProps.rotation, color: topRightProps.color, opacity: 1 }
            : null,
          bottomLeft: bottomLeftProps.isOn
            ? { rotation: bottomLeftProps.rotation, color: bottomLeftProps.color, opacity: 1 }
            : null,
          bottomRight: bottomRightProps.isOn
            ? { rotation: bottomRightProps.rotation, color: bottomRightProps.color, opacity: 1 }
            : null,
        }}
      />
      <br />
      <span style={{ width: "5rem", display: "inline-block" }}></span>
      <input type="button" value="Add to gallery" onClick={notImplementedYet} />
      <input type="button" value="Animate" onClick={notImplementedYet} />
      <input type="button" value="Download" onClick={notImplementedYet} />
      <input type="button" value="Buy print" onClick={notImplementedYet} />
    </>
  );

  function roundToPowerOfTwo(newValue: number, oldValue: number) {
    const powerOfTwo = Math.log2(newValue);
    const adjustedPowerOfTwo = newValue < oldValue ? Math.floor(powerOfTwo) : Math.ceil(powerOfTwo);
    return Math.pow(2, adjustedPowerOfTwo);
  }

  function notImplementedYet() {
    alert("not implemented, yet");
  }
}
