import { useState } from "react";
import NumberInput from "~/components/create/number-input";
import SierpinskiShape from "~/components/sierpinski-shape/sierpinski-shape";
import { getMeta } from "~/model/utility/route-utilities";

export const meta = getMeta("Create", "Create your own Sierpinski Shape!");

export default function Index() {
  //
  const [iterations, setIterations] = useState(1);
  const [size, setSize] = useState(512);
  const maxIterations = Math.floor(Math.log2(size));
  return (
    <>
      <NumberInput
        label="Iterations"
        value={iterations}
        setValue={setIterations}
        minValue={0}
        maxValue={maxIterations}
      />
      <NumberInput
        label="Size"
        value={size}
        setValue={setSize}
        minValue={0}
        maxValue={Number.MAX_SAFE_INTEGER}
        roundFunction={roundToPowerOfTwo}
      />
      <br />
      <SierpinskiShape idPrefix={"create"} iterationCount={iterations} size={size} childRotations={[0, null, 0, 0]} />
    </>
  );

  function roundToPowerOfTwo(newValue: number, oldValue: number) {
    const powerOfTwo = Math.log2(newValue);
    const adjustedPowerOfTwo = newValue < oldValue ? Math.floor(powerOfTwo) : Math.ceil(powerOfTwo);
    return Math.pow(2, adjustedPowerOfTwo);
  }
}
