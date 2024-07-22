import { NavLink } from "@remix-run/react";

import SierpinskiShape from "../sierpinski-shape/sierpinski-shape";

import { Rotations } from "~/model/_shared/rotations";

import classes from "./header.module.css";
import { getCreateShapeUrl } from "../sierpinski-shape/sierpinski-utilities";

// inpsired by: https://dev.to/devggaurav/let-s-build-a-responsive-navbar-and-hamburger-menu-using-html-css-and-javascript-4gci
export default function Header() {
  //
  const rotations = getRandomRotations();

  return (
    <header>
      <a href={getCreateShapeUrl(rotations, 7)} id={classes["logo-link"]}>
        <SierpinskiShape id={"logo"} size={64} iterations={5} rotations={rotations} color={"var(--color-white)"} />
      </a>
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
        <button className={classes.hamburger} onClick={hamburgerOnClick}>
          <span className={classes.bar}></span>
          <span className={classes.bar}></span>
          <span className={classes.bar}></span>
        </button>
      </nav>
    </header>
  );
}

function getRandomRotations(): Rotations {
  //
  const zeroToThree = Math.floor(Math.random() * 4);

  return {
    topLeft: zeroToThree === 0 ? null : 359 * Math.random(),
    topRight: zeroToThree === 1 ? null : 359 * Math.random(),
    bottomLeft: zeroToThree === 2 ? null : 359 * Math.random(),
    bottomRight: zeroToThree === 3 ? null : 359 * Math.random(),
  };
}

function hamburgerOnClick() {
  //
  const hamburger = querySelector(`.${classes.hamburger}`);
  const navMenu = querySelector("menu");
  hamburger.classList.toggle(classes.active);
  navMenu.classList.toggle(classes.active);
}

function closeMenu() {
  //
  const hamburger = querySelector(`.${classes.hamburger}`);
  const navMenu = querySelector("menu");
  hamburger.classList.remove(classes.active);
  navMenu.classList.remove(classes.active);
}

function querySelector(selector: string): Element {
  //
  const element = document.querySelector(selector);
  if (!element) {
    throw new Error(`Element not found for selector: ${selector}`);
  }
  return element;
}
