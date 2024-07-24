import { useLoaderData } from "@remix-run/react";
import BlogPost from "~/model/learn/blog-post";
import { getMeta } from "~/view/_shared/miscellaneous/utilities/route-utilities";
import BlogPostPreview from "~/view/learn/blog-post-preview";

export const meta = getMeta("Learn", "Learn the math, beauty, and history of Sierpinski Shapes!");

export default function LearnRoute() {
  //
  const blogPosts = useLoaderData<typeof loader>();

  return (
    <div
      style={{
        display: "flex",
        gap: "var(--space-md)",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: "var(--space-xl)",
        marginBottom: "var(--space-3xl)",
      }}
    >
      {blogPosts.map((blogPost) => (
        <BlogPostPreview key={blogPost.id} blogPost={blogPost} />
      ))}
    </div>
  );
}

export async function loader() {
  return BlogPost.getAllBlogPosts();
}
