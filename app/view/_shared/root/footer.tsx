import { Link } from "@remix-run/react";
import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer>
      Copyright &copy; {new Date().getFullYear()} <a href="https://www.workiversary.com/rick-joi-media-kit">Rick Joi</a>{" "}
      <span className={styles["link-separator"]}>|</span>
      <Link to="/about">About</Link>
      <span className={styles["link-separator"]}>|</span>
      <Link to="/privacy">Privacy</Link>
    </footer>
  );
}
