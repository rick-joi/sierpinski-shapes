export default class BlogPost {
  //
  static getAllBlogPosts(): readonly BlogPost[] {
    return blogPosts;
  }

  static getBlogPost(hyphenatedName: string): BlogPost {
    //
    const blogPost = blogPosts.find((blogPost) => blogPost.hyphenatedName === hyphenatedName);
    if (blogPost === undefined) {
      throw new Error(`Blog post not found: ${hyphenatedName}`);
    }
    return blogPost;
  }

  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly hyphenatedName: string;
  readonly splashImageFileName: string;

  constructor(id: number, title: string, description: string, hyphenatedName: string, splashImageFormat: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.hyphenatedName = hyphenatedName;
    this.splashImageFileName = hyphenatedName + "." + splashImageFormat;
  }
}

const blogPosts: readonly BlogPost[] = [
  new BlogPost(
    1,
    "Welcome to sierpinski‑shapes.com!",
    "We’re glad you here — this post shares an overview of what this site is about",
    "welcome",
    "jpg"
  ),
  new BlogPost(
    2,
    "What’s a Sierpinski Shape?",
    "Learn about the math behind Sierpinski Shapes and how they’re made",
    "whats-a-sierpinski-shape",
    "png"
  ),
  new BlogPost(
    3,
    "Who was Wacław Sierpiński?",
    "Learn about the mathematician who discovered the Sierpinski Triangle",
    "who-was-waclaw-sierpinski",
    "jpg"
  ),
  new BlogPost(
    4,
    "Top 5 features of this website you didn’t know about",
    "sierpinski-shapes.com is so much more than it appears at first",
    "top-5-features",
    "jpg"
  ),
  new BlogPost(
    5,
    "Why are fractals important?",
    "sierpinski‑shapes.com is so much more than it appears at first",
    "why-are-fractals-important",
    "jpg"
  ),
  new BlogPost(
    6,
    "Lesson plans for teachers",
    "From kindergarden to college — Sierpinski Shapes make learning fun",
    "lesson-plans",
    "jpg"
  ),
  new BlogPost(
    7,
    "Why are triangles the best?",
    "The foundation of Sierpinski Shapes is the triangle — a sturdy foundation indeed",
    "why-are-triangles-the-best",
    "jpg"
  ),
  new BlogPost(
    8,
    "How many Sierpinski Shapes are there?",
    "Learn about the infinite variations of Sierpinski Shapes",
    "how-many-sierpinski-shapes-are-there",
    "jpg"
  ),
  new BlogPost(
    9,
    "June 9th is Evan Maletsky Day",
    "Learn about the holiday that celebrates the grandfather of Sierpinski Shapes — and most importantly, how to celebrate it",
    "june-9th-is-evan-maletsky-day",
    "jpg"
  ),
  new BlogPost(
    10,
    "Tips on creating especially beautiful Sierpinski Shapes",
    "Ready to take your Sierpinski game to the next level?",
    "tips-on-creating-especially-beautiful-sierpinski-shapes",
    "jpg"
  ),
  new BlogPost(
    11,
    "Top 10 things you can do with a Sierpinski Shape image",
    "This site lets you create and download Sierpinski Shapes — what can you do with them?",
    "top-10-things-you-can-do-with-a-sierpinski-shape-image",
    "jpg"
  ),
  new BlogPost(
    12,
    "Your blog post here",
    "We love posting blog posts from Sierpinski Shapes enthusiasts — let us know if that’s you",
    "your-blog-post",
    "jpg"
  ),
];
