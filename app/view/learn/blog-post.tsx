import { Link } from "@remix-run/react";
import { ReactNode } from "react";

import BlogPostModel from "~/model/blog-posts/blog-post";

type Props = Readonly<{
  blogPost: BlogPostModel;
  children: ReactNode;
}>;

export default function BlogPost({ blogPost, children }: Props) {
  //
  //todo: get a local profile image

  return (
    <article>
      <div
        style={{
          paddingTop: "var(--space-sm)",
          paddingBottom: "var(--space-lg)",
          marginBottom: "var(--space-xl)",
          borderTop: "1px solid var(--color-gray-lighter)",
          borderBottom: "1px solid var(--color-gray-lighter)",
        }}
      >
        <h1 style={{ color: "var(--color-black-light)" }}>{blogPost.title}</h1>
        <div style={{ color: "var(--color-gray)" }}>{blogPost.description}</div>
        <div
          style={{
            marginTop: "var(--space-ml)",
          }}
        >
          <img
            src="/learn/rick-joi.jpg"
            style={{
              borderRadius: "50%",
              width: "48px",
              height: "48px",
              float: "left",
              marginRight: "var(--space-md)",
            }}
            alt="Rick Joi"
          />
          <div>Rick Joi</div>
          <div style={{ fontSize: "small", color: "var(--color-gray)" }}>
            Published under <Link to="\learn">Learn</Link> &nbsp; &bull; &nbsp; {blogPost.readtime ?? "tbd"} min read
            &nbsp; &bull; &nbsp; {blogPost.publishDate ?? "publish date tbd"}
          </div>
        </div>
      </div>
      <figure
        style={{
          float: "right",
          marginLeft: "var(--space-lg)",
          marginBottom: "var(--space-lg)",
        }}
      >
        <img
          src={`/learn/blog/preview/low-res/${blogPost.splashImageFileName}`}
          alt={blogPost.title}
          style={{
            width: "min(244px, 36.5vw)",
            height: "min(200px, 30vw)",
            objectFit: "cover",
            borderRadius: "var(--radius-md)",
            boxShadow: "var(--shadow-shallow)",
          }}
        />
        <figcaption
          style={{
            color: "var(--color-gray)",
            fontSize: "x-small",
            textAlign: "right",
            width: "min(244px, 36.5vw)",
            whiteSpace: "pretty",
          }}
        >
          image by {getImageCredit(blogPost)}
        </figcaption>
      </figure>
      {children}
      <div
        style={{
          textAlign: "center",
          marginTop: "var(--space-2xl)",
          paddingTop: "var(--space-xl)",
          borderTop: "1px solid var(--color-gray-lighter)",
        }}
      >
        &gt;{" "}
        <Link to={"/learn"}>
          Return to the list of <i>Learn</i> posts
        </Link>
      </div>
    </article>
  );
}

function getImageCredit(blogPost: BlogPostModel): ReactNode {
  //
  if (!blogPost.imageCreditName) {
    return "unknown";
  } else if (!blogPost.imageCreditUrl) {
    return blogPost.imageCreditName;
  } else {
    return (
      <Link to={blogPost.imageCreditUrl} target="_blank" rel="noreferrer">
        {blogPost.imageCreditName}
      </Link>
    );
  }
}
