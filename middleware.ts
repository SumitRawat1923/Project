import { auth as middleware } from "@/auth"; 
import { NextResponse } from "next/server";

export default middleware((req) => {
  const { pathname } = req.nextUrl;

  if (req.auth && pathname === "/admin-login") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  console.log(pathname);

  if (!req.auth && pathname !== "/admin-login" && !pathname.startsWith("/api/resources")) {
    return NextResponse.redirect(new URL("/admin-login", req.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
