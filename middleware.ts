import { auth as middlware } from "@/auth";
import { NextResponse } from "next/server";

export default middlware((req) => {
  const { pathname } = req.nextUrl;

  if (req.auth && pathname === "/admin-login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!req.auth && pathname !== "/admin-login") {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
