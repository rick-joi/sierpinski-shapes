import { useState } from "react";
import ColorInput from "~/components/create/color-input";
import NumberInput from "~/components/create/number-input";
import RotationInput from "~/components/create/rotation-input";
import SierpinskiShape from "~/components/sierpinski-shape/sierpinski-shape";
import { getMeta } from "~/model/utility/route-utilities";

export const meta = getMeta("Create", "Create your own Sierpinski Shape!");

export default function Index() {
  //
  const [size, setSize] = useState(512);
  const maxIterations = Math.floor(Math.log2(size));
  const [iterations, setIterations] = useState(1);
  const [topLeftIsOn, setTopLeftIsOn] = useState<boolean>(true);
  const [topRightIsOn, setTopRightIsOn] = useState<boolean>(false);
  const [bottomRightIsOn, setBottomRightIsOn] = useState<boolean>(true);
  const [bottomLeftIsOn, setBottomLeftIsOn] = useState<boolean>(true);
  const [topLeftRotation, setTopLeftRotation] = useState<number>(0);
  const [topRightRotation, setTopRightRotation] = useState<number>(0);
  const [bottomRightRotation, setBottomRightRotation] = useState<number>(0);
  const [bottomLeftRotation, setBottomLeftRotation] = useState<number>(0);
  const [foregroundColor, setForegroundColor] = useState<string>("#000000");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "15rem 15rem 15rem 15rem",
          gridTemplateRows: "1fr 1fr",
        }}
      >
        <NumberInput
          label="Size"
          value={size}
          setValue={setSize}
          minValue={0}
          maxValue={Number.MAX_SAFE_INTEGER}
          roundFunction={roundToPowerOfTwo}
        />
        <RotationInput
          label="Top left"
          isOn={topLeftIsOn}
          setIsOn={setTopLeftIsOn}
          rotation={topLeftRotation}
          setRotation={setTopLeftRotation}
        />
        <RotationInput
          label="Top right"
          isOn={topRightIsOn}
          setIsOn={setTopRightIsOn}
          rotation={topRightRotation}
          setRotation={setTopRightRotation}
        />
        <ColorInput label="Foreground" value={foregroundColor} setValue={setForegroundColor} />
        <NumberInput
          label="Iterations"
          value={iterations}
          setValue={setIterations}
          minValue={0}
          maxValue={maxIterations}
        />
        <RotationInput
          label="Bottom left"
          isOn={bottomLeftIsOn}
          setIsOn={setBottomLeftIsOn}
          rotation={bottomLeftRotation}
          setRotation={setBottomLeftRotation}
        />
        <RotationInput
          label="Bottom right"
          isOn={bottomRightIsOn}
          setIsOn={setBottomRightIsOn}
          rotation={bottomRightRotation}
          setRotation={setBottomRightRotation}
        />
        <ColorInput label="Background" value={backgroundColor} setValue={setBackgroundColor} />
      </div>
      <SierpinskiShape
        idPrefix={"create"}
        iterationCount={iterations}
        size={size}
        childRotations={[
          topLeftIsOn ? topLeftRotation : null,
          topRightIsOn ? topRightRotation : null,
          bottomRightIsOn ? bottomRightRotation : null,
          bottomLeftIsOn ? bottomLeftRotation : null,
        ]}
        foregroundColor={foregroundColor}
        backgroundColor={backgroundColor}
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
