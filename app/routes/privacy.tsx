import { getMeta } from "~/view/_shared/miscellaneous/route-utilities";

export const meta = getMeta("Privacy", "The sierpinski-shapes.com privacy policy");

export default function PrivacyRoute() {
  return (
    <article>
      <h2>Privacy</h2>
      <p>
        As of the writing of this privacy page on July 17<sup>th</sup>, 2024, this site has no database
      </p>
      <p>
        The only thing that will be tracked is the web requests made with whatever information your browser sends along
        to us, but quite candidly, we don&rsquo;t have a very good way to look at the web logs at this point
      </p>
      <p>We will not sell your personal data</p>
      <p>
        We intend to improve the site quite a bit — including hooking up a database that will start providng
        functionality and tracking stuff — so <em>check back for updates</em>
      </p>
    </article>
  );
}
