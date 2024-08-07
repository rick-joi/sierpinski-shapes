import { ReactNode } from "react";

import classes from "./clickable.module.css";

type Props = Readonly<{
  onClick: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  children: ReactNode;
}>;

export default function Clickable({ onClick, disabled, style, children }: Props) {
  //
  if (disabled) {
    return <>{children}</>;
  } else {
    return (
      <button className={`transparent ${classes["clickable"]}`} onClick={onClick} style={{ ...style }}>
        {children}
      </button>
    );
  }
}
