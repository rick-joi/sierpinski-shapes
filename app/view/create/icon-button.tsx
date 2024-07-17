import { MouseEventHandler } from "react";

type Props = Readonly<{
  buttonText: string;
  hoverText: string;
  iconImage: string;
  isDisabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}>;

export default function IconButton({ buttonText, hoverText, iconImage, isDisabled, onClick }: Props) {
  return (
    <button onClick={onClick} disabled={isDisabled} style={{ margin: 0, flexBasis: "100%" }} title={hoverText}>
      <img
        src={iconImage}
        alt={hoverText}
        style={{
          position: "relative",
          top: "0.1em",
          height: "1em",
          paddingRight: "0.5em",
          filter: "invert(42%) sepia(64%) saturate(3505%) hue-rotate(163deg) brightness(94%) contrast(99%)",
        }}
      />
      {buttonText}
    </button>
  );
}
