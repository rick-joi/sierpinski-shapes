import { Link } from "@remix-run/react";
import BlogPost from "~/model/learn/blog-post";

type Props = Readonly<{
  blogPost: BlogPost;
}>;

export default function BlogPostPreview({ blogPost }: Props) {
  //
  return (
    <Link
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
        alignContent: "start",
      }}
      className="transparent"
      to={`/learn/${blogPost.hyphenatedName}`}
    >
      <div style={{ width: "365", height: "300" }}>
        <img
          src={`/learn/blog/preview/low-res/${blogPost.splashImageFileName}`}
          alt={blogPost.title}
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
        <h2 style={{ marginTop: 0 }}>{blogPost.title}</h2>
        <p style={{ whiteSpace: "pretty" }}>{blogPost.description}</p>
      </div>
    </Link>
  );
}
