type Props = Readonly<{
  clickText: string;
  tapText: string;
}>;
export default function ClickVsTapText({ clickText, tapText }: Props) {
  //
  return (
    <>
      <span className="non-touch-screen-only">{clickText}</span>
      <span className="touch-screen-only">{tapText}</span>
    </>
  );
}
