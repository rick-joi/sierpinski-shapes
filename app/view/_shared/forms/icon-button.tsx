import { MouseEventHandler } from "react";

import classes from "./icon-button.module.css";

type Props = Readonly<{
  buttonText: string;
  hoverText?: string;
  iconImage?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
  isDisabled?: boolean;
  style?: React.CSSProperties;
  isCallToAction?: boolean;
  isHiddenOnNarrowScreens?: boolean;
}>;

export default function IconButton({
  buttonText,
  hoverText,
  iconImage,
  onClick,
  isDisabled,
  style,
  isCallToAction,
  isHiddenOnNarrowScreens,
}: Props) {
  //
  const image = iconImage ? <img src={iconImage} alt={hoverText} /> : null;
  const classNames =
    (isCallToAction ? classes["cta"] + " " : "") +
    classes["icon-button"] +
    (isHiddenOnNarrowScreens ? " hide-on-narrow-screens" : "");

  return (
    <button
      onClick={onClick}
      disabled={isDisabled}
      style={{ margin: 0, flexBasis: "100%", ...style }}
      title={hoverText}
      className={classNames}
    >
      {image}
      {buttonText}
    </button>
  );
}
