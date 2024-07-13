type Props = Readonly<{
  label: string;
  id: string;
  children: React.ReactNode;
}>;

export default function ControlWithLabelLayout({ label, id, children }: Props) {
  return (
    <div style={{ display: "inline-block", width: "100%", whiteSpace: "nowrap" }}>
      <label htmlFor={id} style={{ fontSize: "small" }}>
        {label}
      </label>
      <br />
      <div style={{ display: "flex", alignItems: "stretch", alignContent: "stretch", gap: "0.25rem" }}>{children}</div>
    </div>
  );
}
