import { useState } from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import * as RouteUtilities from "~/view/_shared/miscellaneous/utilities/route-utilities";
import useWindowSize from "~/view/_shared/miscellaneous/hooks/use-window-size";
import SierpinskiShape, { getSizeWithMargins } from "~/view/_shared/sierpinski-shape/sierpinski-shape";
import { BackgroundColorType, DEFAULTS, MAX_ITERATIONS } from "~/view/_shared/sierpinski-shape/sierpinski-utilities";

import { getRotations, useAllFourQuadrantInputProps } from "~/view/create/quadrant-input";
import useAnimation from "~/view/create/use-animation";
import TouchableSierpinskiShape from "~/view/create/touchable-sierpinski-shape";
import useHistoryReplaceState from "~/view/create/use-history-replace-state";
import ShapeToolbar from "~/view/create/shape-toolbar";
import ControlPanel from "~/view/create/control-panel";
import {
  rgbToGrayScale,
  adjustBrightness,
  isCloseToGray,
} from "~/view/_shared/miscellaneous/utilities/color-utilities";

export const meta = RouteUtilities.getMeta("Create", "Create your own Sierpinski Shape!");

export default function CreateRoute() {
  //
  const PRIMARY_SVG_ID = "create";

  // screen math...
  const windowSize = useWindowSize();
  const maxSizeWithMargins = getSizeWithMargins(512);
  const size = Math.min(maxSizeWithMargins, Math.min(windowSize.width, windowSize.height) * 0.9);
  const fullScreenSize = Math.min(windowSize.width, windowSize.height);

  // core control panel state...
  const initialValues = useLoaderData<typeof loader>();
  const maxIterations = Math.min(MAX_ITERATIONS, Math.ceil(Math.log2(size)) - 2);
  const [iterations, setIterations] = useState(initialValues.iterations);
  if (iterations > maxIterations) {
    setIterations(maxIterations);
  }
  const [color, setColor] = useState(initialValues.color);
  const [backgroundColorType, setBackgroundColorType] = useState(initialValues.backgroundColorType);
  const [backgroundColor, setBackgroundColor] = useState(initialValues.backgroundColor);
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
    quadrantProps.bottomRight.setRotation,
    setColor
  );

  // update URL when created shape changes...
  const currentUrl =
    "https://www.sierpinski-shapes.com" + useHistoryReplaceState(quadrantProps, iterations, color, isAnimating);

  return (
    <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", columnGap: "var(--space-xl)" }}>
      <div style={{ width: size }}>
        <TouchableSierpinskiShape
          id={PRIMARY_SVG_ID}
          size={size}
          quadrantsProps={quadrantProps}
          maxIterations={maxIterations}
          iterations={iterations}
          setIterations={setIterations}
          color={color}
          backgroundColor={calculateBackgroundColor(backgroundColorType, backgroundColor, color)}
        />
        <ShapeToolbar
          thisSvgId={PRIMARY_SVG_ID}
          rotations={getRotations(quadrantProps)}
          iterations={iterations}
          color={color}
          createUrl={currentUrl}
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
          backgroundColorType={backgroundColorType}
          setBackgroundColorType={setBackgroundColorType}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          isAnimating={isAnimating}
          setIsAnimating={setIsAnimating}
        />
        <div
          style={{
            position: "relative",
            top: "12%",
            width: "100%",
            textAlign: "center",
            marginBottom: "var(--space-3xl)",
          }}
        >
          <h2>
            Welcome to <em>sierpinski</em>
            &#8209;<em>shapes</em>.<em>com</em>!
          </h2>
          <p>
            We&rsquo;re glad you&rsquo;re here to share our love of <em>fractals</em>
          </p>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "var(--color-white)",
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
          backgroundColor={calculateBackgroundColor(backgroundColorType, backgroundColor, color)}
        />
      </div>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  //
  const { searchParams } = new URL(request.url);
  const rotations = {
    topLeft: RouteUtilities.getParameterIntOrNull(searchParams, "tl", DEFAULTS.ROTATIONS.topLeft),
    topRight: RouteUtilities.getParameterIntOrNull(searchParams, "tr", DEFAULTS.ROTATIONS.topRight),
    bottomLeft: RouteUtilities.getParameterIntOrNull(searchParams, "bl", DEFAULTS.ROTATIONS.bottomLeft),
    bottomRight: RouteUtilities.getParameterIntOrNull(searchParams, "br", DEFAULTS.ROTATIONS.bottomRight),
  };
  const iterations = RouteUtilities.getParameterInt(searchParams, "i", DEFAULTS.ITERATIONS);
  const color = getQueryStringColor(searchParams, "c", DEFAULTS.COLOR);
  const backgroundColorType = getBackgroundColorType(searchParams);
  const backgroundColor = getQueryStringColor(searchParams, "bc", DEFAULTS.BACKGROUND_COLOR);

  return { rotations, iterations, color, backgroundColorType, backgroundColor };
}

function getQueryStringColor(searchParams: URLSearchParams, variableName: string, defaultColor: string) {
  const unhashedColor = searchParams.get(variableName) ?? defaultColor;
  return unhashedColor.match(/^[0-9a-fA-F]{6}$/) ? "#" + unhashedColor : unhashedColor;
}

function getBackgroundColorType(searchParams: URLSearchParams): BackgroundColorType {
  const value = searchParams.get("bct");
  return value === "transparent" || value === "custom" ? value : DEFAULTS.BACKGROUND_COLOR_TYPE;
}

function calculateBackgroundColor(
  backgroundColorType: string,
  backgroundColor: string,
  color: string
): string | undefined {
  if (backgroundColorType === "custom") {
    return backgroundColor;
  } else if (backgroundColorType === "transparent") {
    return undefined;
  } else {
    const MIDPOINT = 160;
    const grayscale = rgbToGrayScale(color);
    const isGray = isCloseToGray(color);
    if (grayscale === undefined || isGray === undefined || (grayscale < MIDPOINT && isGray)) {
      // dark gray...
      return "#ffffff";
    } else if (grayscale < MIDPOINT) {
      // dark...
      const distanceFromMidpoint = MIDPOINT - grayscale;
      return adjustBrightness(color, 255 - grayscale - distanceFromMidpoint + 64);
    } else {
      // light...
      const distanceFromMidpoint = grayscale - MIDPOINT;
      return adjustBrightness(color, distanceFromMidpoint - grayscale);
    }
  }
}
