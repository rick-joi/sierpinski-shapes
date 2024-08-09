import { Link } from "@remix-run/react";
import BlogPost from "../blog-post";
import BlogPostModel from "~/model/blog-posts/blog-post";

type Props = Readonly<{
  blogPost: BlogPostModel;
}>;

export default function YourBlogPostHere({ blogPost }: Props) {
  //
  return (
    <BlogPost blogPost={blogPost}>
      <p>Do you love Sierpinski Shapes?</p>
      <p>Do you have something to say about them?</p>
      <p>Write a guest article!</p>
      <p>
        You could write any of the articles listed on the <Link to="/learn">Learn</Link> page, or you can come up with
        any other topic you&rsquo;re interested in related to Sierpinski Shapes or even fractals in general.
      </p>
      <p>If you&rsquo;re interested, please contact Rick Joi.</p>
      <p>Thanks for considering it!</p>
    </BlogPost>
  );
}
