type Props = Readonly<{
  label: string;
  parenthetical?: string;
  isDisabled: boolean;
  id: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}>;

export default function ControlWithLabelLayout({ label, parenthetical, isDisabled, id, style, children }: Props) {
  return (
    <div
      style={{
        display: "inline-block",
        marginBottom: "var(--space-md)",
        ...style,
      }}
    >
      <label
        htmlFor={id}
        style={{
          fontSize: "small",
          color: isDisabled ? "var(--color-gray-light)" : undefined,
          display: "inline-block",
          paddingBottom: "var(--space-2xs)",
        }}
      >
        {label}
        <span>&nbsp; </span>
        <span style={{ color: "var(--color-gray)", whiteSpace: "nowrap" }}>{parenthetical}</span>
      </label>
      <br />
      <div style={{ display: "flex", alignItems: "stretch", alignContent: "stretch", gap: "var(--space-2xs)" }}>
        {children}
      </div>
    </div>
  );
}
