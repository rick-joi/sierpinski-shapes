import { redirect } from "@remix-run/react";
import { getCookieHeader } from "../../root/message-banner";

// This might seem to make more sense in MessageBanner, but it doesn't work when it's there
export function redirectWithMessage(url: string, message: string) {
  return redirect(url, { headers: getCookieHeader(message) });
}
