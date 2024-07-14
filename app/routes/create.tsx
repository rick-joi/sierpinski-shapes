import { useEffect, useState } from "react";
import ColorInput from "~/components/create/color-input";
import QuadrantInput, { QuadrantInputProps } from "~/components/create/quandrant-input";
import RangeInputWithLabel from "~/components/create/range-input-with-label";
import ClickableSierpinskiShape from "~/components/sierpinski-shape/clickable-sierpinski-shape";
import SierpinskiShape, { getSizeWithMargins } from "~/components/sierpinski-shape/sierpinski-shape";
import { getMeta } from "~/model/utility/route-utilities";

export const meta = getMeta("Create", "Create your own Sierpinski Shape!");

function useQuandrantInputState(label: string, isDisabledDefault: boolean): QuadrantInputProps {
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
  const fullScreenSize = Math.min(windowSize.width, windowSize.height);

  const maxIterations = Math.min(8, Math.ceil(Math.log2(size)) - 2);
  const [iterations, setIterations] = useState(1);
  if (iterations > maxIterations) {
    setIterations(maxIterations);
  }
  const [color, setColor] = useState("#000000");

  const topLeftProps = useQuandrantInputState("Top left", false);
  const topRightProps = useQuandrantInputState("Top right", true);
  const bottomLeftProps = useQuandrantInputState("Bottom left", false);
  const bottomRightProps = useQuandrantInputState("Bottom right", false);

  const [isAnimating, setIsAnimating] = useState(false);
  const [animationValues, setAnimationValues] = useState<AnimationValues>({
    hasLastAnimationCompleted: true,
    counter: 0,
    rotations: [0, 0, 0, 0],
    increments: [-1, 1, 1, -1],
  });
  useAnimation(
    isAnimating,
    animationValues,
    setAnimationValues,
    topLeftProps.setRotation,
    topRightProps.setRotation,
    bottomLeftProps.setRotation,
    bottomRightProps.setRotation
  );

  useEffect(() => {
    //todo: make this work for quadrants that are off...
    //todo: make requests to these URLs use these values as defaults...
    //todo: make the gallery images link to create using these URLs...
    history.replaceState(
      null,
      "",
      `/create?tl=${Math.round(topLeftProps.rotation)}&tr=${Math.round(topRightProps.rotation)}&bl=${Math.round(
        bottomLeftProps.rotation
      )}&br=${Math.round(bottomRightProps.rotation)}&i=${iterations}&c=${encodeURIComponent(color)}`
    );
  }, [iterations, topLeftProps, topRightProps, bottomLeftProps, bottomRightProps, color]);

  const shapeDescription = getShapeDescription(
    iterations,
    topLeftProps,
    topRightProps,
    bottomLeftProps,
    bottomRightProps
  );

  return (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", columnGap: "1rem" }}>
      <div style={{ width: size }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div className="touch-screen-only" style={{ color: "gray", fontSize: "smaller" }}>
            ☞ Tap on a quadrant or swipe left / right
          </div>
          <div style={{ color: "gray", textAlign: "right", fontSize: "smaller" }}>{shapeDescription}</div>
        </div>
        <ClickableSierpinskiShape
          idPrefix={"create"}
          size={size}
          iterationCount={iterations}
          rotations={{
            topRight: topRightProps.isDisabled ? null : topRightProps.rotation,
            topLeft: topLeftProps.isDisabled ? null : topLeftProps.rotation,
            bottomLeft: bottomLeftProps.isDisabled ? null : bottomLeftProps.rotation,
            bottomRight: bottomRightProps.isDisabled ? null : bottomRightProps.rotation,
          }}
          color={color}
          setTopLeftRotation={topLeftProps.setRotation}
          setTopRightRotation={topRightProps.setRotation}
          setBottomLeftRotation={bottomLeftProps.setRotation}
          setBottomRightRotation={bottomRightProps.setRotation}
          setIterations={setIterations}
        />
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "2rem" }}>
          <input type="button" value="Add to gallery" onClick={notImplementedYet} style={{ flexGrow: 1, margin: 0 }} />
          <input type="button" value="Download" onClick={notImplementedYet} style={{ flexGrow: 1, margin: 0 }} />
          <input type="button" value="Buy merch" onClick={notImplementedYet} style={{ flexGrow: 1, margin: 0 }} />
        </div>
      </div>
      <div style={{ width: size }}>
        <div style={{ maxWidth: size + "px" }}>
          <div style={{ display: "flex", gap: "1rem" }}>
            <QuadrantInput {...topLeftProps} />
            <QuadrantInput {...topRightProps} />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <QuadrantInput {...bottomLeftProps} />
            <QuadrantInput {...bottomRightProps} />
          </div>
          <div style={{ display: "flex", gap: "1rem" }}>
            <div style={{ flexGrow: "1" }}>
              <RangeInputWithLabel label="Iterations" max={maxIterations} value={iterations} setValue={setIterations} />
            </div>
            <div>
              <ColorInput label={"Color"} color={color} setColor={setColor} />
            </div>
            <div style={{ alignSelf: "flex-end" }}>
              <input
                type="button"
                value={isAnimating ? "Stop animation" : "Animate"}
                onClick={() => setIsAnimating((previous) => !previous)}
                disabled={iterations === 0}
                style={{ width: "9em" }}
              />
            </div>
          </div>
        </div>
        <div style={{ position: "relative", top: "25%", width: "100%", textAlign: "center" }}>
          <h2>Welcome to sierpinski&#8209;shapes.com!</h2>
          <p>We&lsquo;re glad you&lsquo;re here to share our love of fractals.</p>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          zIndex: 500,
          textAlign: "center",
          display: "none",
        }}
      >
        <SierpinskiShape
          idPrefix={"full-screen"}
          size={fullScreenSize}
          iterationCount={iterations}
          rotations={{
            topRight: topRightProps.isDisabled ? null : topRightProps.rotation,
            topLeft: topLeftProps.isDisabled ? null : topLeftProps.rotation,
            bottomLeft: bottomLeftProps.isDisabled ? null : bottomLeftProps.rotation,
            bottomRight: bottomRightProps.isDisabled ? null : bottomRightProps.rotation,
          }}
          color={color}
        />
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

type AnimationValues = {
  hasLastAnimationCompleted: boolean;
  counter: number;
  rotations: [number, number, number, number];
  increments: [number, number, number, number];
};

function useAnimation(
  isAnimating: boolean,
  animationValues: AnimationValues,
  setAnimationValues: React.Dispatch<React.SetStateAction<AnimationValues>>,
  setTopLeftRotation: React.Dispatch<React.SetStateAction<number>>,
  setTopRightRotation: React.Dispatch<React.SetStateAction<number>>,
  setBottomLeftRotation: React.Dispatch<React.SetStateAction<number>>,
  setBottomRightRotation: React.Dispatch<React.SetStateAction<number>>
) {
  useEffect(() => {
    if (isAnimating && animationValues.hasLastAnimationCompleted) {
      setAnimationValues((previous) => ({
        hasLastAnimationCompleted: false,
        counter: previous.counter,
        rotations: [
          previous.rotations[0] + previous.increments[0],
          previous.rotations[1] + previous.increments[1],
          previous.rotations[2] + previous.increments[2],
          previous.rotations[3] + previous.increments[3],
        ],
        increments: previous.increments,
      }));
      setTopLeftRotation((previous) => (360 + previous + animationValues.increments[0]) % 360);
      setTopRightRotation((previous) => (360 + previous + animationValues.increments[1]) % 360);
      setBottomLeftRotation((previous) => (360 + previous + animationValues.increments[2]) % 360);
      setBottomRightRotation((previous) => (360 + previous + animationValues.increments[3]) % 360);
      setTimeout(() => {
        setAnimationValues((previous) => ({
          hasLastAnimationCompleted: true,
          counter: (previous.counter + 1) % 15,
          rotations: previous.rotations,
          increments: [
            getNextIncrement(previous.counter, previous.increments[0]),
            getNextIncrement(previous.counter, previous.increments[1]),
            getNextIncrement(previous.counter, previous.increments[2]),
            getNextIncrement(previous.counter, previous.increments[3]),
          ],
        }));
      }, 100);
    }
  }, [
    isAnimating,
    animationValues,
    setAnimationValues,
    setTopLeftRotation,
    setTopRightRotation,
    setBottomLeftRotation,
    setBottomRightRotation,
  ]);
}

function getNextIncrement(counter: number, previousIncrement: number) {
  //
  const shouldChange = counter === 0 && Math.random() > 0.75;
  if (shouldChange) {
    const unconstrainedNextIncrement = previousIncrement + 0.25 - 0.5 * Math.random();
    return Math.min(Math.max(unconstrainedNextIncrement, -1), 1);
  } else {
    return previousIncrement;
  }
}

function getShapeDescription(
  iterations: number,
  topLeftProps: QuadrantInputProps,
  topRightProps: QuadrantInputProps,
  bottomLeftProps: QuadrantInputProps,
  bottomRightProps: QuadrantInputProps
) {
  return (
    `${iterations} iteration${iterations == 1 ? "" : "s"}` +
    getQuadrantDescription(topLeftProps) +
    getQuadrantDescription(topRightProps) +
    getQuadrantDescription(bottomLeftProps) +
    getQuadrantDescription(bottomRightProps)
  );
}

function getQuadrantDescription(quadrantInputProps: QuadrantInputProps) {
  return ", " + (quadrantInputProps.isDisabled ? "—" : Math.round(quadrantInputProps.rotation) + "º");
}
