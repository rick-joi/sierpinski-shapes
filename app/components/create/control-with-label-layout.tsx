type Props = Readonly<{
  label: string;
  isDisabled: boolean;
  id: string;
  children: React.ReactNode;
}>;

export default function ControlWithLabelLayout({ label, isDisabled, id, children }: Props) {
  return (
    <div
      style={{
        display: "inline-block",
        width: "100%",
        whiteSpace: "nowrap",
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
      </label>
      <br />
      <div style={{ display: "flex", alignItems: "stretch", alignContent: "stretch", gap: "0.25rem" }}>{children}</div>
    </div>
  );
}
