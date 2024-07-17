type Props = Readonly<{
  label: string;
  parenthetical?: string;
  isDisabled: boolean;
  id: string;
  children: React.ReactNode;
}>;

export default function ControlWithLabelLayout({ label, parenthetical, isDisabled, id, children }: Props) {
  return (
    <div
      style={{
        display: "inline-block",
        width: "100%",
        margin: "0.5rem 0",
      }}
    >
      <label
        htmlFor={id}
        style={{
          fontSize: "small",
          color: isDisabled ? "lightgray" : undefined,
          display: "inline-block",
          paddingBottom: "0.25rem",
        }}
      >
        {label}
        <span>&nbsp; </span>
        <span style={{ color: "#999999", whiteSpace: "nowrap" }}>{parenthetical}</span>
      </label>
      <br />
      <div style={{ display: "flex", alignItems: "stretch", alignContent: "stretch", gap: "0.25rem" }}>{children}</div>
    </div>
  );
}
