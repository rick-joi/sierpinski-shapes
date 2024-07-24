import { Dispatch, SetStateAction } from "react";

type Props = Readonly<{
  top: number;
  left: number;
  size: number;
  isDisabled: boolean;
  setRotation: Dispatch<SetStateAction<number>>;
  setIsOverQuadrant: Dispatch<SetStateAction<boolean>>;
}>;

export default function TouchableRotationOverlay({
  top,
  left,
  size,
  isDisabled,
  setRotation,
  setIsOverQuadrant,
}: Props) {
  //
  return (
    <button
      style={{
        display: isDisabled ? "none" : "block",
        background: "transparent",
        boxShadow: "none",
        border: "none",
        position: "absolute",
        top: top,
        left: left,
        height: size,
        width: size,
        margin: 0,
        padding: 0,
      }}
      onClick={() => {
        setRotation((previous) => (previous + 15) % 360);
      }}
      onMouseEnter={() => {
        setIsOverQuadrant(true);
      }}
      onMouseLeave={() => {
        setIsOverQuadrant(false);
      }}
    />
  );
}
