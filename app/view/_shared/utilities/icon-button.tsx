import { MouseEventHandler } from "react";

type Props = Readonly<{
  buttonText: string;
  hoverText?: string;
  iconImage?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
}>;

export default function IconButton({ buttonText, hoverText, iconImage, onClick, isDisabled, style, className }: Props) {
  //
  const image = iconImage ? <img src={iconImage} alt={hoverText} /> : null;

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{ margin: 0, flexBasis: "100%", ...style }}
      className={className}
      title={hoverText}
    >
      {image}
      {buttonText}
    </button>
  );
}
