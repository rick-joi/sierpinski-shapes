import { Rotations } from "~/model/_shared/rotations";
import IconButton from "../_shared/utilities/icon-button";

type ImageFormat = "png" | "svg";

type Props = Readonly<{
  svgId: string;
  imageFormat: ImageFormat;
  rotations: Rotations;
  iterations: number;
  color: string;
  isDisabled: boolean;
}>;

export default function DownloadButton({ svgId, imageFormat, rotations, iterations, color, isDisabled }: Props) {
  //
  const hiddenCanvasId = `svg-to-png-canvas-${svgId}`;
  const hiddenCanvas =
    "svg" === imageFormat ? <canvas id={hiddenCanvasId} style={{ display: "none" }}></canvas> : undefined;
  return (
    <>
      <IconButton
        buttonText={`Download .${imageFormat}`}
        iconImage={"/download-icon.png"}
        hoverText={`Download this Sierpinski Shape as an .${imageFormat} image file`}
        isDisabled={isDisabled}
        onClick={buttonOnClick}
      />
      {hiddenCanvas}
    </>
  );

  function buttonOnClick() {
    //
    const { svgImage, svgUrl } = getSvgImage(svgId);
    svgImage.onload = function () {
      const imageUrl = "svg" === imageFormat ? svgUrl : getPngImageUrl(hiddenCanvasId, svgImage, svgUrl);
      const downloadFileName = getFileName(imageFormat, rotations, iterations, color);
      triggerDownload(imageUrl, downloadFileName);
    };
  }
}

function getSvgImage(svgId: string): { svgImage: HTMLImageElement; svgUrl: string } {
  //
  const svgElement = getSvgElement(svgId);
  const svgString = new XMLSerializer().serializeToString(svgElement);
  const svgBlob = new Blob([svgString], {
    type: "image/svg+xml;charset=utf-8",
  });
  const svgUrl = window.URL.createObjectURL(svgBlob);

  const svgImage = new Image();
  svgImage.width = svgElement.width.baseVal.value;
  svgImage.height = svgElement.height.baseVal.value;
  svgImage.src = svgUrl;
  return { svgImage, svgUrl };
}

function getSvgElement(svgParentId: string): SVGSVGElement {
  const svgElement = document.querySelector(`#${svgParentId}`) as SVGSVGElement | null;
  if (svgElement === null) {
    throw new Error(`SVG element under parent ID #${svgParentId} not found`);
  }
  return svgElement;
}

function getPngImageUrl(hiddenCanvasId: string, svgImage: HTMLImageElement, svgUrl: string): string {
  //
  const canvas = getHiddenCanvas(hiddenCanvasId);
  canvas.width = svgImage.width;
  canvas.height = svgImage.height;

  const context = getCanvasContext(canvas);
  context.drawImage(svgImage, 0, 0);
  window.URL.revokeObjectURL(svgUrl);
  //todo: figure out why TypeScript doesn't think context.isContextLost() exists...
  //if (context.isContextLost()) {
  //  alert("This image is too large for your browser to download.");
  //} else {
  //}
  return canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
}

function getHiddenCanvas(hiddenCanvasId: string): HTMLCanvasElement {
  const canvas = document.getElementById(hiddenCanvasId) as HTMLCanvasElement | null;
  if (canvas === null) {
    throw new Error(`Hidden canvas ${hiddenCanvasId} not found`);
  }
  return canvas;
}

function getCanvasContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const context = canvas.getContext("2d");
  if (context === null) {
    throw new Error("Canvas context not found");
  }
  return context;
}

function triggerDownload(imageUrl: string, downloadFileName: string) {
  //
  const a = document.createElement("a");
  a.download = downloadFileName;
  a.target = "_blank";
  a.href = imageUrl;

  a.dispatchEvent(
    new MouseEvent("click", {
      view: window,
      bubbles: false,
      cancelable: true,
    })
  );
}

function getFileName(imageFormat: ImageFormat, rotations: Rotations, iterations: number, color: string) {
  //
  const hashlessColor = color.replace("#", "");
  return (
    "sierpinski_" +
    iterations +
    "x_" +
    formatRotationForFileName(rotations.topLeft) +
    "-" +
    formatRotationForFileName(rotations.topRight) +
    "-" +
    formatRotationForFileName(rotations.bottomLeft) +
    "-" +
    formatRotationForFileName(rotations.bottomRight) +
    "_" +
    hashlessColor +
    "." +
    imageFormat
  );
}

function formatRotationForFileName(rotation: number | null): string {
  return rotation === null ? "off" : Math.round(rotation).toString();
}
