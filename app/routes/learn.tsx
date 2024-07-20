import { getMeta } from "~/view/_shared/miscellaneous/route-utilities";

export const meta = getMeta("Learn", "Learn the math, beauty, and history of Sierpinski Shapes!");

export default function LearnRoute() {
  //
  return (
    <article>
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
      <h2>Planned articles</h2>
      <p>Do you love Sierpinsi Shapes? Have something to say about them? Write a guest article!</p>
      <ul>
        <li>What&rsquo;s a Sierpinski Shape?</li>
        <li>Who was Wacław Sierpiński?</li>
        <li>How many Sierpinski Shapes are there?</li>
        <li>Why is the simple triangle the best simple shape?</li>
        <li>When is Evan Maletsky Day and how do you celebrate it?</li>
      </ul>
      <h2>Planned lesson plans for teachers</h2>
      <p>Are you a teacher? Do you love Sierpinski Shapes? Help us write lesson plans...</p>
      <ul>
        <li>Kindergarden</li>
        <li>Elementary school</li>
        <li>Middle school</li>
        <li>High school</li>
        <li>College</li>
      </ul>
    </article>
  );
}
