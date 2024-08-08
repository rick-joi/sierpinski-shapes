import { useState } from "react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";

import * as RouteUtilities from "~/view/_shared/miscellaneous/utilities/route-utilities";
import useWindowSize from "~/view/_shared/miscellaneous/hooks/use-window-size";
import { getSizeWithMargins } from "~/view/_shared/sierpinski-shape/sierpinski-shape";
import { BackgroundColorType, DEFAULTS, MAX_ITERATIONS } from "~/view/_shared/sierpinski-shape/sierpinski-utilities";

import { getRotations, useAllFourQuadrantInputProps } from "~/view/create/quadrant-input";
import useAnimation from "~/view/create/use-animation";
import TouchableSierpinskiShape from "~/view/create/touchable-sierpinski-shape";
import useHistoryReplaceState from "~/view/create/use-history-replace-state";
import ButtonBar from "~/view/create/button-bar";
import ControlPanel from "~/view/create/control-panel";
import useColors from "~/view/create/use-colors";
import WelcomeHints from "~/view/create/welcome-hints";

export const meta = RouteUtilities.getMeta("Create", "Create your own Sierpinski Shape!");

export default function CreateRoute() {
  //
  const PRIMARY_SVG_ID = "create";

  // screen math...
  const windowSize = useWindowSize();
  const maxSizeWithMargins = getSizeWithMargins(512);
  const size = Math.min(maxSizeWithMargins, Math.min(windowSize.width, windowSize.height) * 0.9);
  //const fullScreenSize = Math.min(windowSize.width, windowSize.height);

  // core control panel state...
  const initialValues = useLoaderData<typeof loader>();
  const maxIterations = Math.min(MAX_ITERATIONS, Math.ceil(Math.log2(size)) - 2);
  const [iterations, setIterations] = useState(initialValues.iterations);
  if (iterations > maxIterations) {
    setIterations(maxIterations);
  }
  const quadrantProps = useAllFourQuadrantInputProps(initialValues.rotations);

  const [color, backgroundColorType, backgroundColor, setColor, setBackgroundColorType, setBackgroundColor] = useColors(
    initialValues.color,
    initialValues.backgroundColorType,
    initialValues.backgroundColor
  );

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
  const setMostRecentCreateUrl = useOutletContext<React.Dispatch<React.SetStateAction<string>>>();
  const currentUrl =
    "https://www.sierpinski-shapes.com" +
    useHistoryReplaceState(
      quadrantProps,
      iterations,
      color,
      backgroundColorType,
      backgroundColor,
      isAnimating,
      setMostRecentCreateUrl
    );

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
          backgroundColorType={backgroundColorType}
          backgroundColor={backgroundColor}
        />
        <ButtonBar
          thisSvgId={PRIMARY_SVG_ID}
          rotations={getRotations(quadrantProps)}
          iterations={iterations}
          color={color}
          createUrl={currentUrl}
          setIsAnimating={setIsAnimating}
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
        <WelcomeHints />
      </div>
      {/* <div
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
          backgroundColor={backgroundColor}
        />
      </div> */}
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
