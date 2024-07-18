import { MouseEventHandler } from "react";

type Props = Readonly<{
  buttonText: string;
  hoverText?: string;
  iconImage: string;
  isDisabled: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
  style?: React.CSSProperties;
  className?: string;
}>;

export default function IconButton({ buttonText, hoverText, iconImage, isDisabled, onClick, style, className }: Props) {
  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{ margin: 0, flexBasis: "100%", ...style }}
      className={className}
      title={hoverText}
    >
      <img src={iconImage} alt={hoverText} />
      {buttonText}
    </button>
  );
}
