import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { useEffect } from "react";

import Footer from "~/view/_shared/root/footer";
import Header from "~/view/_shared/root/header";
import MessageBanner from "~/view/_shared/root/message-banner";

import "~/view/_shared/root/root.css";

export function Layout({ children }: { children: React.ReactNode }) {
  //
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div style={{ minHeight: "100%" }}>
          <Header />
          <MessageBanner />
          <main>{children}</main>
        </div>
        <Footer />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  //
  useEffect(() => {
    preventOverScroll();
  }, []);

  return <Outlet />;
}

function preventOverScroll() {
  //
  document.addEventListener("touchmove", function (e) {
    e.preventDefault();
  });
}
