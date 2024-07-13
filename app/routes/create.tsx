import { useState } from "react";
import IterationsInput from "~/components/create/iterations-input";
import QuadrantInput, { QuandrantInputProps } from "~/components/create/quandrant-input";
import SizeInput from "~/components/create/size-input";
import SierpinskiShape from "~/components/sierpinski-shape/sierpinski-shape";
import { getMeta } from "~/model/utility/route-utilities";

export const meta = getMeta("Create", "Create your own Sierpinski Shape!");

function useQuandrantInputState(isOnDefault: boolean): QuandrantInputProps {
  //
  const [isOn, setIsOn] = useState<boolean>(isOnDefault);
  const [rotation, setRotation] = useState<number>(0);
  const [color, setColor] = useState<string>("#000000");
  return { isOn, rotation, color, setIsOn, setRotation, setColor };
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
      </div>
      <div style={{ display: "inline-block", marginRight: "1rem", marginBottom: "1rem" }}>
        <span style={{ display: "inline-block", marginRight: "0.5rem" }}>Image</span>
        <div
          id="image-settings"
          style={{
            display: "inline-grid",
            gridTemplateColumns: "auto auto",
            border: "solid #f0f0f0 1px",
            padding: "0.25rem 0.5rem",
          }}
        >
          <SizeInput size={size} setSize={setSize} />
          <IterationsInput maxIterations={maxIterations} iterations={iterations} setIterations={setIterations} />
        </div>
      </div>
      <div style={{ display: "inline-block" }}>
        <span style={{ display: "inline-block", marginRight: "0.5rem" }}>Triangles</span>
        <div style={{ display: "inline-grid", gridTemplateColumns: "auto auto", border: "solid #f0f0f0 1px" }}>
          <QuadrantInput {...topLeftProps} />
          <QuadrantInput {...topRightProps} />
          <QuadrantInput {...bottomLeftProps} />
          <QuadrantInput {...bottomRightProps} />
        </div>
      </div>
      <br />
      <span style={{ width: "5rem", display: "inline-block" }}></span>
      <input type="button" value="Add to gallery" onClick={notImplementedYet} />
      <input type="button" value="Animate" onClick={notImplementedYet} />
      <input type="button" value="Download" onClick={notImplementedYet} />
      <input type="button" value="Buy print" onClick={notImplementedYet} />
    </div>
  );

  function notImplementedYet() {
    alert("not implemented, yet");
  }
}
