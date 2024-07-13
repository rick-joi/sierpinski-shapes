import { useState } from "react";
import IterationsInput from "~/components/create/iterations-input";
import QuadrantInput, { QuandrantInputProps } from "~/components/create/quandrant-input";
import RangeInput from "~/components/create/range-input";
import SizeInput from "~/components/create/size-input";
import SierpinskiShape from "~/components/sierpinski-shape/sierpinski-shape";
import { getMeta } from "~/model/utility/route-utilities";

export const meta = getMeta("Create", "Create your own Sierpinski Shape!");

function useQuandrantInputState(isOnDefault: boolean): QuandrantInputProps {
  //
  const [isOn, setIsOn] = useState<boolean>(isOnDefault);
  const [rotation, setRotation] = useState<number>(0);
  return { isOn, rotation, setIsOn, setRotation };
}

export default function Index() {
  //
  const [size, setSize] = useState(512);
  const maxIterations = Math.min(8, Math.floor(Math.log2(size)) - 2);
  const [iterations, setIterations] = useState(1);
  if (iterations > maxIterations) {
    setIterations(maxIterations);
  }

  const topLeftProps = useQuandrantInputState(true);
  const topRightProps = useQuandrantInputState(false);
  const bottomLeftProps = useQuandrantInputState(true);
  const bottomRightProps = useQuandrantInputState(true);

  return (
    <div>
      <div>
        {iterations} iteration{iterations == 1 ? "" : "s"}, {bottomRightProps.rotation}&deg; ,{" "}
        {bottomLeftProps.rotation}&deg; , {topLeftProps.rotation}&deg; , {topRightProps.rotation}&deg;
      </div>
      <div>
        <SierpinskiShape
          idPrefix={"create"}
          iterationCount={iterations}
          quadrants={{
            topRight: topRightProps.isOn ? { position: 1, rotation: topRightProps.rotation } : null,
            topLeft: topLeftProps.isOn ? { position: 2, rotation: topLeftProps.rotation } : null,
            bottomLeft: bottomLeftProps.isOn ? { position: 3, rotation: bottomLeftProps.rotation } : null,
            bottomRight: bottomRightProps.isOn ? { position: 4, rotation: bottomRightProps.rotation } : null,
          }}
        />
      </div>
      <div style={{ maxWidth: "400px" }}>
        <QuadrantInput {...topLeftProps} />
        <QuadrantInput {...topRightProps} />
        <QuadrantInput {...bottomLeftProps} />
        <QuadrantInput {...bottomRightProps} />
        <RangeInput label="Iterations" max={maxIterations} value={iterations} setValue={setIterations} />
      </div>
      <div>
        <input type="button" value="Add to gallery" onClick={notImplementedYet} />
        <input type="button" value="Animate" onClick={notImplementedYet} />
        <input type="button" value="Download" onClick={notImplementedYet} />
        <input type="button" value="Buy print" onClick={notImplementedYet} />
      </div>
    </div>
  );

  function notImplementedYet() {
    alert("not implemented, yet");
  }
}
