import { useEffect, useState } from "react";
import QuadrantInput, { QuandrantInputProps } from "~/components/create/quandrant-input";
import RangeInputWithLabel from "~/components/create/range-input-with-label";
import SierpinskiShape, { getSizeWithMargins } from "~/components/sierpinski-shape/sierpinski-shape";
import { getMeta } from "~/model/utility/route-utilities";

export const meta = getMeta("Create", "Create your own Sierpinski Shape!");

function useQuandrantInputState(label: string, isDisabledDefault: boolean): QuandrantInputProps {
  //
  const [isDisabled, setIsDisabled] = useState<boolean>(isDisabledDefault);
  const [rotation, setRotation] = useState<number>(0);
  return { label, isDisabled, rotation, setIsDisabled, setRotation };
}

export default function Index() {
  //
  const maxSize = getSizeWithMargins(512);
  const windowSize = useWindowSize();
  const size = Math.min(maxSize, Math.min(windowSize.width, windowSize.height) * 0.9);

  const maxIterations = Math.min(8, Math.ceil(Math.log2(size)) - 2);
  const [iterations, setIterations] = useState(1);
  if (iterations > maxIterations) {
    setIterations(maxIterations);
  }

  const topLeftProps = useQuandrantInputState("Top left", false);
  const topRightProps = useQuandrantInputState("Top right", true);
  const bottomLeftProps = useQuandrantInputState("Bottom left", false);
  const bottomRightProps = useQuandrantInputState("Bottom right", false);

  return (
    <div>
      <div>
        {iterations} iteration{iterations == 1 ? "" : "s"}, {bottomRightProps.rotation}&deg; ,{" "}
        {bottomLeftProps.rotation}&deg; , {topLeftProps.rotation}&deg; , {topRightProps.rotation}&deg;
      </div>
      <SierpinskiShape
        idPrefix={"create"}
        size={size}
        iterationCount={iterations}
        rotations={{
          topRight: topRightProps.isDisabled ? null : topRightProps.rotation,
          topLeft: topLeftProps.isDisabled ? null : topLeftProps.rotation,
          bottomLeft: bottomLeftProps.isDisabled ? null : bottomLeftProps.rotation,
          bottomRight: bottomRightProps.isDisabled ? null : bottomRightProps.rotation,
        }}
      />
      <div style={{ maxWidth: size + "px" }}>
        <div style={{ display: "flex", gap: "1rem" }}>
          <QuadrantInput {...topLeftProps} />
          <QuadrantInput {...topRightProps} />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <QuadrantInput {...bottomLeftProps} />
          <QuadrantInput {...bottomRightProps} />
        </div>
        <RangeInputWithLabel label="Iterations" max={maxIterations} value={iterations} setValue={setIterations} />
      </div>
      <div>
        <input type="button" value="Animate" onClick={notImplementedYet} />
        <input type="button" value="Add to gallery" onClick={notImplementedYet} />
        <input type="button" value="Download" onClick={notImplementedYet} />
        <input type="button" value="Buy print" onClick={notImplementedYet} />
      </div>
    </div>
  );

  function notImplementedYet() {
    alert("not implemented, yet");
  }
}

function useWindowSize() {
  //
  const [windowSize, setWindowSize] = useState({
    width: 256,
    height: 256,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}
