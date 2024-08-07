import { Link } from "@remix-run/react";
import ClickVsTapText from "../_shared/miscellaneous/components/click-vs-tap-text";

export default function WelcomeHints() {
  //
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        textAlign: "center",
        marginBottom: "var(--space-2xl)",
      }}
    >
      <h2 style={{ marginTop: "var(--space-2xl)" }}>
        Welcome to <em>sierpinski</em>
        &#8209;<em>shapes</em>.<em>com</em>!
      </h2>
      <ul
        style={{
          textAlign: "left",
          marginTop: "var(--space-sm)",
          marginBottom: 0,
          marginLeft: "auto",
          marginRight: "auto",
          display: "inline-block",
        }}
      >
        <li style={{ marginTop: 0 }}>
          <ClickVsTapText clickText={"Click"} tapText={"Tap"} /> on the triangles to rotate them
        </li>
        <li style={{}}>
          <ClickVsTapText
            clickText={"Click on the left and right edges"}
            tapText={"Swipe to the left or to the right"}
          />{" "}
          to
          <br />
          change the number of iterations
        </li>
        <li style={{}}>
          Learn more about Sierpinski Shapes
          <br />
          on <Link to="/learn">the learn page</Link>
        </li>
      </ul>
      <p style={{ marginTop: "var(--space-sm)", fontStyle: "italic" }}>
        We&rsquo;re glad you&rsquo;re here to share our love of <em style={{ fontStyle: "italic" }}>fractals</em>
      </p>
    </div>
  );
}
