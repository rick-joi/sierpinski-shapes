import { Rotations } from "~/model/sierpinski-shapes/rotations";
import IconButton from "../_shared/forms/icon-button";

type ImageFormat = "png" | "svg";

type Props = Readonly<{
  svgId: string;
  imageFormat: ImageFormat;
  rotations: Rotations;
  iterations: number;
  color: string;
  shareText: string;
  isDisabled?: boolean;
}>;

export default function DownloadButton({
  svgId,
  imageFormat,
  rotations,
  iterations,
  color,
  shareText,
  isDisabled,
}: Props) {
  //
  const hiddenCanvasId = `svg-to-png-canvas-${svgId}`;
  const hiddenCanvas =
    "svg" === imageFormat ? <canvas id={hiddenCanvasId} style={{ display: "none" }}></canvas> : undefined;
  const isHiddenOnNarrowScreens = "svg" === imageFormat;
  const buttonText = isSharePreferredOverDownload() ? "Share" : `Download .${imageFormat}`;
  return (
    <>
      <IconButton
        buttonText={buttonText}
        iconImage={"/download-icon.png"}
        hoverText={`Download this Sierpinski Shape as an .${imageFormat} image file`}
        isDisabled={isDisabled}
        onClick={buttonOnClick}
        isHiddenOnNarrowScreens={isHiddenOnNarrowScreens}
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
      downloadImage(imageUrl, downloadFileName, shareText);
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
  const RESOLUTION_MULTIPLIER = 8;

  const canvas = getHiddenCanvas(hiddenCanvasId);
  canvas.width = svgImage.width * RESOLUTION_MULTIPLIER;
  canvas.height = svgImage.height * RESOLUTION_MULTIPLIER;

  const context = getCanvasContext(canvas);
  context.drawImage(svgImage, 0, 0, canvas.width, canvas.height);
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

export function isSharePreferredOverDownload(): boolean {
  return /iPad|iPhone|iPod/.test(navigator.userAgent) && !!navigator.canShare;
}

async function downloadImage(imageUrl: string, fileName: string, shareText: string) {
  try {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const file = new File([blob], fileName, {
      type: blob.type,
    });

    if (isSharePreferredOverDownload() && navigator.canShare({ files: [file] })) {
      await navigator.share({
        files: [file],
        title: "Share Sierpinski Shape",
        text: shareText,
      });
    } else {
      // Fallback method for devices that do not support Web Share API
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    }
  } catch (error) {
    console.error("Download failed:", error);
  }
}
