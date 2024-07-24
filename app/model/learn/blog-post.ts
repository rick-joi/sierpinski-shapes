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
  readonly imageCreditName?: string | undefined;
  readonly imageCreditUrl?: string | undefined;
  readonly readtime?: number | undefined;
  readonly publishDate?: string | undefined;

  constructor(
    id: number,
    title: string,
    description: string,
    hyphenatedName: string,
    splashImageFormat: string,
    imageCreditName?: string,
    imageCreditUrl?: string,
    readtime?: number,
    publishDate?: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.hyphenatedName = hyphenatedName;
    this.splashImageFileName = hyphenatedName + "." + splashImageFormat;
    this.imageCreditName = imageCreditName;
    this.imageCreditUrl = imageCreditUrl;
    this.readtime = readtime;
    this.publishDate = publishDate;
  }
}

const blogPosts: readonly BlogPost[] = [
  new BlogPost(
    1,
    "Welcome to sierpinski‑shapes.com!",
    "We’re glad you here — this post shares an overview of what this site is about",
    "welcome",
    "jpg",
    "Belinda Fewings",
    "https://unsplash.com/@bel2000a",
    1,
    "July 24, 2024"
  ),
  new BlogPost(
    2,
    "What’s a Sierpinski Shape?",
    "Learn about the math behind Sierpinski Shapes and how they’re made",
    "whats-a-sierpinski-shape",
    "png",
    "Rick Joi",
    "https://www.workiversary.com/rick-joi-media-kit"
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
    "This website — sierpinski‑shapes.com — is so much more than it appears at first",
    "top-5-features",
    "jpg",
    "Edward Cordoba Bastidas",
    "https://unsplash.com/@edwardcordoba"
  ),
  new BlogPost(
    5,
    "Why are fractals important?",
    "“Fractal” might be an unfamiliar word, but they’re everywhere — once you know what you’re looking for",
    "why-are-fractals-important",
    "jpg",
    "Jennifer Uppendahl",
    "https://unsplash.com/@jennifer_uppendahl"
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
    "jpg",
    "Filip Filkovic Philatz",
    "https://unsplash.com/@philatz"
  ),
  new BlogPost(
    8,
    "How many Sierpinski Shapes are there?",
    "Learn about the infinite variations of Sierpinski Shapes",
    "how-many-sierpinski-shapes-are-there",
    "jpg",
    "Alex Shuper",
    "https://unsplash.com/@alexshuperart"
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
    "jpg",
    "Daniil Silantev",
    "https://unsplash.com/@betagamma"
  ),
  new BlogPost(
    11,
    "Top 10 things you can do with a Sierpinski Shape image",
    "This site lets you create and download Sierpinski Shapes — what can you do with them?",
    "top-10-things-you-can-do-with-a-sierpinski-shape-image",
    "jpg",
    "Adrian Curiel",
    "https://unsplash.com/@hencetheboom"
  ),
  new BlogPost(
    12,
    "Your blog post here",
    "We love posting blog posts from Sierpinski Shapes enthusiasts — let us know if that’s you",
    "your-blog-post",
    "jpg",
    "Austin Chan",
    "https://unsplash.com/@austinchan",
    1,
    "July 24, 2024"
  ),
];
