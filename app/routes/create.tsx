import { useState } from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import * as RouteUtilities from "~/view/_shared/miscellaneous/utilities/route-utilities";
import useWindowSize from "~/view/_shared/miscellaneous/hooks/use-window-size";
import SierpinskiShape, { getSizeWithMargins } from "~/view/_shared/sierpinski-shape/sierpinski-shape";
import {
  DEFAULT_COLOR,
  DEFAULT_ITERATIONS,
  DEFAULT_ROTATIONS,
  MAX_ITERATIONS,
} from "~/view/_shared/sierpinski-shape/sierpinski-utilities";

import { getRotations, useAllFourQuadrantInputProps } from "~/view/create/quadrant-input";
import useAnimation from "~/view/create/use-animation";
import TouchableSierpinskiShape from "~/view/create/touchable-sierpinski-shape";
import useHistoryReplaceState from "~/view/create/use-history-replace-state";
import ShapeToolbar from "~/view/create/shape-toolbar";
import ControlPanel from "~/view/create/control-panel";

export const meta = RouteUtilities.getMeta("Create", "Create your own Sierpinski Shape!");

export default function CreateRoute() {
  //
  const PRIMARY_SVG_ID = "create";

  // screen math...
  const windowSize = useWindowSize();
  const maxSizeWithMargins = getSizeWithMargins(512);
  const size = Math.min(maxSizeWithMargins, Math.min(windowSize.width, windowSize.height)); // * 0.9);
  const fullScreenSize = Math.min(windowSize.width, windowSize.height);

  // core control panel state...
  const initialValues = useLoaderData<typeof loader>();
  const maxIterations = Math.min(MAX_ITERATIONS, Math.ceil(Math.log2(size)) - 2);
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

  return (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", columnGap: "3rem" }}>
      <div style={{ width: size }}>
        <TouchableSierpinskiShape
          id={PRIMARY_SVG_ID}
          size={size}
          quadrantsProps={quadrantProps}
          maxIterations={maxIterations}
          iterations={iterations}
          setIterations={setIterations}
          color={color}
        />
        <ShapeToolbar
          thisSvgId={PRIMARY_SVG_ID}
          rotations={getRotations(quadrantProps)}
          iterations={iterations}
          color={color}
          isAnimating={isAnimating}
        />
      </div>
      <div style={{ width: size }}>
        <ControlPanel
          quadrantProps={quadrantProps}
          maxIterations={maxIterations}
          iterations={iterations}
          setIterations={setIterations}
          color={color}
          setColor={setColor}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
        />
        <div style={{ position: "relative", top: "12%", width: "100%", textAlign: "center", marginBottom: "12rem" }}>
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
          id={"full-screen"}
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
    topLeft: RouteUtilities.getParameterIntOrNull(searchParams, "tl", DEFAULT_ROTATIONS.topLeft),
    topRight: RouteUtilities.getParameterIntOrNull(searchParams, "tr", DEFAULT_ROTATIONS.topRight),
    bottomLeft: RouteUtilities.getParameterIntOrNull(searchParams, "bl", DEFAULT_ROTATIONS.bottomLeft),
    bottomRight: RouteUtilities.getParameterIntOrNull(searchParams, "br", DEFAULT_ROTATIONS.bottomRight),
  };
  const iterations = RouteUtilities.getParameterInt(searchParams, "i", DEFAULT_ITERATIONS);
  const unhashedColor = searchParams.get("c") ?? DEFAULT_COLOR;
  const color = unhashedColor.match(/^[0-9a-fA-F]{6}$/) ? "#" + unhashedColor : unhashedColor;

  return { rotations, iterations, color };
}
