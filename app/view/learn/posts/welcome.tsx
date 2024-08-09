import { Link } from "@remix-run/react";
import BlogPost from "../blog-post";
import BlogPostModel from "~/model/blog-posts/blog-post";

type Props = Readonly<{
  blogPost: BlogPostModel;
}>;

export default function Welcome({ blogPost }: Props) {
  //
  //todo: rewrite this to mention in passing (and link to) all of the other blog posts
  return (
    <BlogPost blogPost={blogPost}>
      <p>
        Welcome to the <strong>beautiful</strong> <strong>math</strong> of Sierpinski Shapes!
      </p>
      <p>
        The <strong>math</strong> is so simple, it&rsquo;s not really even math — you can create Sierpinski Shapes with
        squares of paper and a pair of scissors
      </p>
      <p>
        The <strong>beauty</strong> comes from from the infinite variations and the way in which they mimic how the{" "}
        <Link to="/learn/why-are-fractals-important">patterns in nature</Link> form — like plants and shorelines and
        clouds
      </p>
      <p>
        The well known Sierpinski Triangle is just one of over{" "}
        <Link to="/learn/how-many-sierpinski-shapes-are-there">16 billion</Link> Sierpinski Shapes —{" "}
        <strong>intrigued?</strong>
      </p>
      <p>What&rsquo;s next?</p>
      <ul>
        <li>
          <Link to="/gallery">Check out Sierpinski Shapes others have discovered</Link>
        </li>
        <li>
          <Link to="/create">Create your own favorite Sierpinski Shapes</Link>
        </li>
        <li>
          <Link to="/shop">Buy a print or t-shirt with one of the designs you created!</Link>
        </li>
      </ul>
      <p>And if you like this site, consider spreading the word to your friends</p>
    </BlogPost>
  );
}
