import { Link } from "@remix-run/react";
import styles from "./footer.module.css";

export function Footer() {
  return (
    <footer>
      Copyright &copy; {new Date().getFullYear()} <span className={styles["link-separator"]}>|</span>
      <Link to="/privacy-policy">Privacy policy</Link>
    </footer>
  );
}
