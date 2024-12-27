import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { decrypt } from "./app/lib/session";

const protectedRoutes = ["/"];
const publicRoutes = ["/login"];

export default async function middleware(req) {
  const path = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = await cookies();
  const cookieStore = cookie.get("session")?.value;

  const session = cookieStore ? await decrypt(cookie) : null;

  const isLoggedIn = Boolean(session?.userId);

  const response = NextResponse.next();
  response.cookies.set("isLoggedIn", isLoggedIn.toString());

  if (isPublicRoute && isLoggedIn) {
    console.log("Redirecting to / (Public route, user already logged in)");
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }
  return response;
}

export const config = {
  matcher: ["/", "/login"],
};
