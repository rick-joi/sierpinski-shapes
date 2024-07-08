import { NavLink } from "@remix-run/react";

import styles from "./header.module.css";

// todo: https://dev.to/devggaurav/let-s-build-a-responsive-navbar-and-hamburger-menu-using-html-css-and-javascript-4gci
export function Header() {
  return (
    <header>
      <img src="/logo.png" alt="Sierpinski Shapes Logo" />
      <div>
        welcome, <a href="/my-profile">Friend #243</a> &nbsp;
        <span style={{ fontSize: "smaller" }}>
          (<a href="/sign-out">not&nbsp;you?</a>)
        </span>
      </div>
      <nav>
        <menu>
          <li>
            <NavLink to="/create" onClick={closeMenu}>
              Create
            </NavLink>
          </li>
          <li>
            <NavLink to="/gallery" onClick={closeMenu}>
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink to="/learn" onClick={closeMenu}>
              Learn
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" onClick={closeMenu}>
              Shop
            </NavLink>
          </li>
        </menu>
        <button className={styles.hamburger} onClick={hamburgerOnClick}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </nav>
    </header>
  );
}

function hamburgerOnClick() {
  const hamburger = querySelector(`.${styles.hamburger}`);
  const navMenu = querySelector("menu");
  hamburger.classList.toggle(styles.active);
  navMenu.classList.toggle(styles.active);
}

function closeMenu() {
  const hamburger = querySelector(`.${styles.hamburger}`);
  const navMenu = querySelector("menu");
  hamburger.classList.remove(styles.active);
  navMenu.classList.remove(styles.active);
}

function querySelector(selector: string): Element {
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Element not found for selector: ${selector}`);
  }
  return element;
}
