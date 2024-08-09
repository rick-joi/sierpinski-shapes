import BlogPost from "../blog-post";
import BlogPostModel from "~/model/blog-posts/blog-post";

type Props = Readonly<{
  blogPost: BlogPostModel;
}>;

export default function NotYet({ blogPost }: Props) {
  //
  return (
    <BlogPost blogPost={blogPost}>
      <p style={{ color: "var(--color-gray-light)" }}>
        This content hasn&rsquo;t been written yet, but it will be soon. Check back later!
      </p>
      <p style={{ color: "var(--color-gray-light)" }}>
        Or, if you have a passion for this topic, let Rick Joi know, and he&rsquo;d be love for you to be a guest blog
        post writer!
      </p>
    </BlogPost>
  );
}
