import { Dispatch, SetStateAction } from "react";

type Props = Readonly<{
  top: number;
  left: number;
  size: number;
  setRotation: Dispatch<SetStateAction<number>>;
}>;

export default function TouchableSierpinskiShapeQuadrant({ top, left, size, setRotation }: Props) {
  //
  return (
    <button
      style={{
        background: "transparent",
        border: "none",
        position: "absolute",
        top: top,
        left: left,
        height: size,
        width: size,
      }}
      onClick={() => {
        setRotation((previous) => previous + 15);
      }}
    />
  );
}
