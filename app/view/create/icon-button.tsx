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
      <img src={iconImage} alt={hoverText} />
      {buttonText}
    </button>
  );
}
