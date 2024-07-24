import BlogPost from "../blog-post";
import BlogPostModel from "~/model/learn/blog-post";

type Props = Readonly<{
  blogPost: BlogPostModel;
}>;

export default function LessonPlans({ blogPost }: Props) {
  //
  return (
    <BlogPost blogPost={blogPost}>
      <p>Are you a teacher? Do you love Sierpinski Shapes? Help us write lesson plans...</p>
      <ul>
        <li>Kindergarden</li>
        <li>Elementary school</li>
        <li>Middle school</li>
        <li>High school</li>
        <li>College</li>
      </ul>{" "}
    </BlogPost>
  );
}
