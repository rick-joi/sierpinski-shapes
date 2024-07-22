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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Roboto+Flex:opsz,wght@8..144,100..1000&display=swap"
          rel="stylesheet"
        />
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

//todo: if this doesn't work, try this: https://github.com/pinadesign/overscroll/blob/master/overscroll.js
function preventOverScroll() {
  //
  document.addEventListener("touchmove", function (e) {
    e.preventDefault();
  });
}
