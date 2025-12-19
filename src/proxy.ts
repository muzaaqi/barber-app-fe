import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getProfile } from "./actions/auth/get-profile";

export async function proxy(req: NextRequest) {
  const { nextUrl } = req;
  const token = req.cookies.get("token")?.value;
  const user = await getProfile();

  const pathname = nextUrl.pathname;

  const protectedRoutes = ["/my-todos"];

  const authPath = ["/login", "/signup"];

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route),
  );

  if (isProtected && (!token || !user)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (authPath.some((route) => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (pathname.startsWith("/dashboard") && user?.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}
