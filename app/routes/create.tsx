import { useState } from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getMeta, getParameterInt, getParameterIntOrNull } from "~/view/shared/utilities/route-utilities";
import useWindowSize from "~/view/shared/utilities/use-window-size";
import ColorInput from "~/view/create/color-input";
import QuadrantInput, { getRotations, useAllFourQuadrantInputProps } from "~/view/create/quadrant-input";
import RangeInput from "~/view/create/range-input";
import useAnimation from "~/view/create/use-animation";
import TouchableSierpinskiShape from "~/view/create/touchable-sierpinski-shape";
import SierpinskiShape, { getSizeWithMargins } from "~/view/shared/sierpinski-shape/sierpinski-shape";
import SierpinskiText from "~/view/shared/sierpinski-shape/sierpinski-text";
import useHistoryReplaceState from "~/view/create/use-history-replace-state";

export const meta = getMeta("Create", "Create your own Sierpinski Shape!");

//todo: figure out where to put full-screen button
//todo: set up blank about and privacy pages
export default function Index() {
  //
  // screen math...
  const windowSize = useWindowSize();
  const maxSizeWithMargins = getSizeWithMargins(512);
  const size = Math.min(maxSizeWithMargins, Math.min(windowSize.width, windowSize.height) * 0.9);
  const fullScreenSize = Math.min(windowSize.width, windowSize.height);

  // state...
  const initialValues = useLoaderData<typeof loader>();
  const maxIterations = Math.min(8, Math.ceil(Math.log2(size)) - 2);
  const [iterations, setIterations] = useState(initialValues.iterations);
  if (iterations > maxIterations) {
    setIterations(maxIterations);
  }
  const [color, setColor] = useState(initialValues.color);
  const quadrantProps = useAllFourQuadrantInputProps(initialValues.rotations);

  // animation...
  const [isAnimating, setIsAnimating] = useState(false);
  useAnimation(
    isAnimating,
    quadrantProps.topLeft.setRotation,
    quadrantProps.topRight.setRotation,
    quadrantProps.bottomLeft.setRotation,
    quadrantProps.bottomRight.setRotation
  );

  // update URL...
  useHistoryReplaceState(quadrantProps, iterations, color, isAnimating);

  // TSX...
  return (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", columnGap: "1rem" }}>
      <div style={{ width: size }}>
        <TouchableSierpinskiShape
          idPrefix={"create"}
          size={size}
          iterations={iterations}
          quadrantsProps={quadrantProps}
          color={color}
          setIterations={setIterations}
        />
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", marginBottom: "2rem" }}>
          <input
            type="button"
            value="Add to gallery"
            onClick={notImplementedYet}
            disabled={isAnimating}
            style={{ flexGrow: 1, margin: 0 }}
          />
          <input
            type="button"
            value="Download"
            onClick={notImplementedYet}
            disabled={isAnimating}
            style={{ flexGrow: 1, margin: 0 }}
          />
          <input
            type="button"
            value="Buy merch"
            onClick={notImplementedYet}
            disabled={isAnimating}
            style={{ flexGrow: 1, margin: 0 }}
          />
        </div>
      </div>
      <div style={{ width: size }}>
        <div style={{ maxWidth: size + "px" }}>
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
          <div style={{ color: "gray", fontSize: "smaller" }}>
            <SierpinskiText rotations={getRotations(quadrantProps)} iterations={iterations} color={color} />
          </div>
        </div>
        <div style={{ position: "relative", top: "25%", width: "100%", textAlign: "center" }}>
          <h2>Welcome to sierpinski&#8209;shapes.com!</h2>
          <p>We&rsquo;re glad you&rsquo;re here to share our love of fractals</p>
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
          iterations={iterations}
          rotations={getRotations(quadrantProps)}
          color={color}
        />
      </div>
    </div>
  );
}

function notImplementedYet() {
  alert("not implemented, yet");
}

export async function loader({ request }: LoaderFunctionArgs) {
  //
  const { searchParams } = new URL(request.url);
  const rotations = {
    topLeft: getParameterIntOrNull(searchParams, "tl", 0),
    topRight: getParameterIntOrNull(searchParams, "tr", null),
    bottomLeft: getParameterIntOrNull(searchParams, "bl", 0),
    bottomRight: getParameterIntOrNull(searchParams, "br", 0),
  };
  //todo; is there a better way than this "as number"?...
  const iterations = getParameterInt(searchParams, "i", 1);
  const color = searchParams.get("c") ?? "#000000";

  return { rotations, iterations, color };
}
