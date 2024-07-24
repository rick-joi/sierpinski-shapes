import { getMeta } from "~/view/_shared/miscellaneous/utilities/route-utilities";
import BlogPostPreview from "~/view/learn/blog-post-preview";

export const meta = getMeta("Learn", "Learn the math, beauty, and history of Sierpinski Shapes!");

type BlogPostPreview = {
  id: number;
  title: string;
  imageName: string;
  description: string;
};

export default function LearnRoute() {
  //
  const blogPostPreviews: BlogPostPreview[] = [];
  blogPostPreviews.push({
    id: 11,
    title: "Welcome to sierpinski-shapes.com!",
    imageName: "welcome.jpg",
    description: "We’re glad you here — this post shares an overview of what this site is about",
  });
  blogPostPreviews.push({
    id: 1,
    title: "What’s a Sierpinski Shape?",
    imageName: "whats-a-sierpinski-shape.png",
    description: "Learn about the math behind Sierpinski Shapes and how they’re made",
  });
  blogPostPreviews.push({
    id: 2,
    title: "Who was Wacław Sierpiński?",
    imageName: "waclaw-sierpinski-polish-stamp.jpg",
    description: "Learn about the mathematician who discovered the Sierpinski Triangle",
  });
  blogPostPreviews.push({
    id: 7,
    title: "Top 5 sierpinski-shapes.com features you didn’t know about",
    imageName: "five.jpg",
    description: "sierpinski-shapes.com is so much more than it appears at first",
  });
  blogPostPreviews.push({
    id: 8,
    title: "Why are fractals important?",
    imageName: "fractals-are-important.jpg",
    description: "sierpinski-shapes.com is so much more than it appears at first",
  });
  blogPostPreviews.push({
    id: 12,
    title: "Lesson plans for teachers",
    imageName: "lesson-plans.jpg",
    description: "From kindergarden to college — Sierpinski Shapes make learning fun",
  });
  blogPostPreviews.push({
    id: 4,
    title: "Why are triangles the best?",
    imageName: "triangles.jpg",
    description: "The foundation of Sierpinski Shapes is the triangle — a sturdy foundation indeed",
  });
  blogPostPreviews.push({
    id: 3,
    title: "How many Sierpinski Shapes are there?",
    imageName: "question-mark.jpg",
    description: "Learn about the infinite variations of Sierpinski Shapes",
  });
  blogPostPreviews.push({
    id: 5,
    title: "June 9th is Evan Maletsky Day",
    imageName: "evan-maletsky.jpg",
    description:
      "Learn about the holiday that celebrates the grandfather of Sierpinski Shapes — and most importantly, how to celebrate it",
  });
  blogPostPreviews.push({
    id: 9,
    title: "Tips on creating especially beautiful Sierpinski Shapes",
    imageName: "beauty.jpg",
    description: "Ready to take your Sierpinski game to the next level?",
  });
  blogPostPreviews.push({
    id: 6,
    title: "Top 10 things you can do with a Sierpinski Shape image",
    imageName: "ten.jpg",
    description: "This site lets you create and download Sierpinski Shapes — what can you do with them?",
  });
  blogPostPreviews.push({
    id: 10,
    title: "Your blog post here",
    imageName: "your-blog-post.jpg",
    description: "We love posting blog posts from Sierpinski Shapes enthusiasts — let us know if that’s you",
  });

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
      {blogPostPreviews.map((preview) => (
        <BlogPostPreview
          key={preview.id}
          title={preview.title}
          imageName={preview.imageName}
          description={preview.description}
        />
      ))}
      <p style={{ fontStyle: "italic" }}>
        Apologies... these aren&rsquo;t actually clickable yet, because the content hasn&rsquo;t been written yet —
        check back later
      </p>
    </div>
  );
}
