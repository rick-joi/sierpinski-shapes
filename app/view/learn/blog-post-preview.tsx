type Props = Readonly<{
  title: string;
  description: string;
  imageName: string;
}>;

export default function BlogPostPreview({ title, description, imageName }: Props) {
  //
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        paddingTop: "min(var(--space-lg), 5vw)",
        paddingLeft: "min(var(--space-lg), 5vw)",
        paddingRight: "min(var(--space-lg), 5vw)",
        paddingBottom: "0",
        backgroundColor: "var(--color-gray-lightest)",
        boxShadow: "var(--shadow)",
        borderRadius: "var(--radius-md)",
        maxWidth: "432px",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "365", height: "300" }}>
        <img
          src={`/learn/blog/preview/low-res/${imageName}`}
          alt={title}
          width={"365"}
          height={"300"}
          style={{
            objectFit: "cover",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-shallow)",
          }}
        />
      </div>

      <div style={{ margin: "var(--space-lg) 0" }}>
        <h2 style={{ marginTop: 0 }}>{title}</h2>
        <p style={{ whiteSpace: "pretty" }}>{description}</p>
      </div>
    </div>
  );
}
