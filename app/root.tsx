import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import "./styles/root.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <h1>Sierpinski Shapes</h1>
          <menu>
            <li>
              <a href="/">Create</a>
            </li>
            <li>
              <a href="/gallery">Gallery</a>
            </li>
            <li>
              <a href="/learn">Learn</a>
            </li>
            <li>
              <a href="/shop">Shop</a>
            </li>
          </menu>
        </header>
        <main>{children}</main>
        <footer>
          <span>copyright &copy; 2024</span> |{" "}
          <span>
            <a href="/">privacy policy</a>
          </span>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
