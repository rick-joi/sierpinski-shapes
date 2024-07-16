import { redirect, useLocation } from "@remix-run/react";
import { useEffect, useRef } from "react";

const MESSAGE_BANNER_COOKIE_NAME = "messageBanner";

export function HydrateFallback() {
  return <div>Loading...</div>;
}

export default function MessageBanner() {
  //
  const location = useLocation();
  const messageDiv = useRef<HTMLDivElement>(null);
  let ignore = false;

  useEffect(() => {
    const element = messageDiv.current;
    if (!element) {
      throw new Error("Message banner div reference failed");
    }
    const message = getCookie(MESSAGE_BANNER_COOKIE_NAME);
    if (message) {
      element.innerHTML = message;
      element.style.display = "inline-block";
      if (!ignore) {
        document.cookie = MESSAGE_BANNER_COOKIE_NAME + "= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
      }
    } else if (!ignore) {
      element.innerHTML = "";
      element.style.display = "none";
    }
    return () => {
      // This hack is because useEffect() runs twice in development mode
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ignore = true;
    };
  }, [location]);
  return (
    <div style={{ textAlign: "center" }}>
      <div
        ref={messageDiv}
        style={{
          display: "none",
          backgroundColor: "orange",
          fontSize: "125%",
          padding: "0.5rem 1rem",
          marginTop: "0.5rem",
          borderRadius: "0.5rem",
        }}
      ></div>
    </div>
  );
}

function getCookie(name: string): string | null {
  //
  const fullCookie = `; ${document.cookie}`;
  const parts = fullCookie.split(`; ${name}=`);
  if (parts.length === 2) {
    const secondPart = parts.pop() ?? ""; // ?? "" is a TS workaround
    const value = secondPart.split(";").shift() ?? ""; // ?? "" is a TS workaround
    return decodeURIComponent(value);
  } else {
    return null;
  }
}

function getCookieHeader(message: string) {
  //
  const encodedMessage = encodeURIComponent(message);
  return {
    "Set-Cookie": `${MESSAGE_BANNER_COOKIE_NAME}=${encodedMessage}; Path=/;`,
  };
}

export function redirectWithMessage(url: string, message: string) {
  return redirect(url, { headers: getCookieHeader(message) });
}
