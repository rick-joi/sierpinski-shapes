import { getMeta } from "~/view/_shared/miscellaneous/route-utilities";

export const meta = getMeta("About", "Find out the who and why behind sierpinski-shapes.com");

export default function AboutRoute() {
  return (
    <article>
      <h1 style={{ marginTop: "3rem" }}>
        About <em>sierpinski-shapes.com</em>
      </h1>
      <p>
        This website is a side project undertaken by <a href="https://www.linkedin.com/in/rickjoi/">Rick Joi</a>{" "}
        inspired by his involvement in the{" "}
        <a href="https://www.meetup.com/crushyoursideprojects/">Crush Your Side Projects</a> meetup in Lancaster, PA
      </p>
      <h2>Of all the possible side projects, why this one?</h2>
      <p>Prior to the summer of 2024, the last time Rick seriously coded was in 2013 🙀</p>
      <p>
        A lot has changed in web application technology since then — most notably, the appearance and widespread
        adoption of React 🤯
      </p>
      <p>
        As his day job at <a href="https://www.workiversary.com">The Workiversary Group</a>, Rick is building a
        React-based web application which is a{" "}
        <a href="https://www.workiversary.com/product">very unique and special way of celebrating work anniversaries</a>{" "}
        🎉
      </p>
      <p>
        However, that project isn&rsquo;t especially &ldquo;reactive&rdquo;, and so Rick thought he could jumpstart his
        mastery of React by leaning into a project that required{" "}
        <a href="/create">
          <em>
            <i>a lot</i> of reactivity
          </em>
        </a>
      </p>
      <p>
        The thought was that in doing this project, Rick would become more aware of opportunities to better use React in
        the workiversary project 💡
      </p>
      <h2>How can you help?</h2>
      <p>
        The code for this site is in a{" "}
        <a href="https://github.com/rick-joi/sierpinski-shapes">public GitHub repository</a> — if you&rsquo;re a coder,
        then feel free to offer feedback to help Rick become a better React developer 🙏
      </p>
      <p>
        If you&rsquo;re not a coder, then you can either just <a href="/gallery">enjoy the shapes</a> and share the site
        with your friends, or you can celebrate a colleague&rsquo;s work anniversary using{" "}
        <a href="https://www.workiversary.com/product">Rick&rsquo;s primary project</a> 🤗
      </p>
    </article>
  );
}
