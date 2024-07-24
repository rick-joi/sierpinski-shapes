import { LoaderFunctionArgs } from "@remix-run/node";
import { MetaFunction, useLoaderData } from "@remix-run/react";
import BlogPost from "~/model/learn/blog-post";
import LessonPlans from "~/view/learn/posts/lesson-plans";
import NotYet from "~/view/learn/posts/not-yet";
import Welcome from "~/view/learn/posts/welcome";
import YourBlogPostHere from "~/view/learn/posts/your-post";

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return [
    {
      name: "description",
      content: data?.description,
    },
    { title: `${data?.title} | Learn | sierpinski-shapes.com` },
  ];
};

export default function LearnArticleRoute() {
  //
  const blogPost = useLoaderData<typeof loader>();

  if (blogPost.id === 1) {
    return <Welcome blogPost={blogPost} />;
  } else if (blogPost.id === 2) {
    return <NotYet blogPost={blogPost} />;
  } else if (blogPost.id === 3) {
    return <NotYet blogPost={blogPost} />;
  } else if (blogPost.id === 4) {
    return <NotYet blogPost={blogPost} />;
  } else if (blogPost.id === 5) {
    return <NotYet blogPost={blogPost} />;
  } else if (blogPost.id === 6) {
    return <LessonPlans blogPost={blogPost} />;
  } else if (blogPost.id === 7) {
    return <NotYet blogPost={blogPost} />;
  } else if (blogPost.id === 8) {
    return <NotYet blogPost={blogPost} />;
  } else if (blogPost.id === 9) {
    return <NotYet blogPost={blogPost} />;
  } else if (blogPost.id === 10) {
    return <NotYet blogPost={blogPost} />;
  } else if (blogPost.id === 11) {
    return <NotYet blogPost={blogPost} />;
  } else if (blogPost.id === 12) {
    return <YourBlogPostHere blogPost={blogPost} />;
  } else {
    return `Content for post not found: ${JSON.stringify(blogPost, undefined, 2)}`;
  }
}

export async function loader({ params }: LoaderFunctionArgs) {
  //
  const hyphenatedName = params["post"];
  if (hyphenatedName === undefined) {
    throw new Error("Post name not found in URL");
  }
  return BlogPost.getBlogPost(hyphenatedName);
}
