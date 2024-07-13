import { Link } from "@remix-run/react";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer>
      Copyright &copy; {new Date().getFullYear()} <a href="https://www.workiversary.com">Quintriple, LLC</a>{" "}
      <span className={styles["link-separator"]}>|</span>
      <Link to="/privacy-policy">Privacy policy</Link>
    </footer>
  );
}
