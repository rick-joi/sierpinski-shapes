import { MouseEventHandler } from "react";

type Props = Readonly<{
  buttonText: string;
  hoverText?: string;
  iconImage: string;
  isDisabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  style: React.CSSProperties;
}>;

export default function IconButton({ buttonText, hoverText, iconImage, isDisabled, onClick, style }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{ margin: 0, flexBasis: "100%", ...style }}
      title={hoverText}
    >
      <img src={iconImage} alt={hoverText} />
      {buttonText}
    </button>
  );
}
