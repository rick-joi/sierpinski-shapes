import BlogPost from "../blog-post";
import BlogPostModel from "~/model/learn/blog-post";

type Props = Readonly<{
  blogPost: BlogPostModel;
}>;

export default function Welcome({ blogPost }: Props) {
  //
  return (
    <BlogPost blogPost={blogPost}>
      <p>
        Welcome to the <strong>beautiful</strong> <strong>math</strong> of Sierpinski Shapes!
      </p>
      <p>
        The <strong>math</strong> is so simple, it&rsquo;s not really even math — you can create Sierpinski Shapes with
        squares of paper and a pair of scissors.
      </p>
      <p>
        The <strong>beauty</strong> comes from from the infinite variations and the way in which they mimic how the
        patterns in nature form — like plants and shorelines and clouds.
      </p>
      <p>
        The well known Sierpinski Triangle is just one of over 16 billion Sierpinski Shapes —{" "}
        <strong>intrigued?</strong>
      </p>
    </BlogPost>
  );
}
