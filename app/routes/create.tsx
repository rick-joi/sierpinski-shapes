import { useState } from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import * as RouteUtilities from "~/view/shared/utilities/route-utilities";
import useWindowSize from "~/view/shared/utilities/use-window-size";
import SierpinskiShape, { getSizeWithMargins } from "~/view/shared/sierpinski-shape/sierpinski-shape";
import SierpinskiText from "~/view/shared/sierpinski-shape/sierpinski-text";

import QuadrantInput, { getRotations, useAllFourQuadrantInputProps } from "~/view/create/quadrant-input";
import ColorInput from "~/view/create/color-input";
import RangeInput from "~/view/create/range-input";
import useAnimation from "~/view/create/use-animation";
import TouchableSierpinskiShape from "~/view/create/touchable-sierpinski-shape";
import useHistoryReplaceState from "~/view/create/use-history-replace-state";
import LikeThisShapeToolbar from "~/view/create/like-this-shape-toolbar";
import IconButton from "~/view/create/icon-button";

export const meta = RouteUtilities.getMeta("Create", "Create your own Sierpinski Shape!");

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
  if (iterations === 0 && isAnimating) {
    setIsAnimating(false);
  }
  useAnimation(
    isAnimating,
    quadrantProps.topLeft.setRotation,
    quadrantProps.topRight.setRotation,
    quadrantProps.bottomLeft.setRotation,
    quadrantProps.bottomRight.setRotation
  );

  // update URL when created shape changes...
  useHistoryReplaceState(quadrantProps, iterations, color, isAnimating);

  // TSX...
  return (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", columnGap: "3rem" }}>
      <div style={{ width: size }}>
        <TouchableSierpinskiShape
          idPrefix={"create"}
          size={size}
          iterations={iterations}
          quadrantsProps={quadrantProps}
          color={color}
          setIterations={setIterations}
        />
        <LikeThisShapeToolbar isAnimating={isAnimating} />
      </div>
      <div style={{ width: size }}>
        <div style={{ maxWidth: size + "px" }}>
          <fieldset style={{ border: "none" }}>
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
              <div style={{ alignSelf: "flex-end", paddingBottom: "0.75rem" }}>
                <IconButton
                  buttonText={isAnimating ? "Pause animation" : "Animate"}
                  iconImage={isAnimating ? "/pause-icon.png" : "/play-icon.png"}
                  isDisabled={iterations === 0}
                  onClick={() => setIsAnimating((previous) => !previous)}
                  style={{ width: "11em" }}
                />
              </div>
            </div>
            <div style={{ color: "gray", fontSize: "smaller" }}>
              <SierpinskiText rotations={getRotations(quadrantProps)} iterations={iterations} color={color} />
            </div>
          </fieldset>
        </div>
        <div style={{ position: "relative", top: "25%", width: "100%", textAlign: "center", marginBottom: "12rem" }}>
          <h2>
            Welcome to <em>sierpinski</em>
            &#8209;<em>shapes</em>.<em>com</em>!
          </h2>
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

export async function loader({ request }: LoaderFunctionArgs) {
  //
  const { searchParams } = new URL(request.url);
  const rotations = {
    topLeft: RouteUtilities.getParameterIntOrNull(searchParams, "tl", 0),
    topRight: RouteUtilities.getParameterIntOrNull(searchParams, "tr", null),
    bottomLeft: RouteUtilities.getParameterIntOrNull(searchParams, "bl", 0),
    bottomRight: RouteUtilities.getParameterIntOrNull(searchParams, "br", 0),
  };
  const iterations = RouteUtilities.getParameterInt(searchParams, "i", 1);
  const color = searchParams.get("c") ?? "#000000";

  return { rotations, iterations, color };
}
