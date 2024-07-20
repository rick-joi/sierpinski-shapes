import classes from "./touchable-help-message.module.css";

type Props = Readonly<{
  top: number;
  left: number;
  size: number;
  hasTapped: boolean;
  hasSwiped: boolean;
  maxIterations: number;
  iterations: number;
}>;

export default function TouchableHelpMessage({
  top,
  left,
  size,
  hasTapped,
  hasSwiped,
  maxIterations,
  iterations,
}: Props) {
  //
  const topMargin = size / 5;
  const rightMargin = size / 10;

  const swipeMessage = iterations < 5 ? "swipe left" : iterations === maxIterations ? "swipe right" : "swipe";

  return (
    <div
      className="touch-screen-only"
      style={{
        color: "orange",
        fontSize: "smaller",
        position: "absolute",
        top: top + topMargin,
        left: left,
        width: size - rightMargin,
        textAlign: "center",
      }}
    >
      <div className={hasTapped ? classes["fade-out"] : ""}>☞ tap to rotate triangles</div> <br />
      <div className={hasSwiped ? classes["fade-out"] : ""}>☞ {swipeMessage} to&nbsp;iterate</div>
    </div>
  );
}
