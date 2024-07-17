import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import "~/view/shared/root/root.css";
import { Footer } from "./view/shared/root/footer";
import { Header } from "./view/shared/root/header";
import MessageBanner from "./view/shared/utilities/message-banner";

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
  return <Outlet />;
}
