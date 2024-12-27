import { decrypt } from "../../lib/session";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req) {
  const session = cookies().get("session")?.value;
  const user = await decrypt(session);
  const isLoggedIn = Boolean(user?.userId);

  const response = NextResponse.json({ isLoggedIn, user });

  response.cookies.set("isLoggedIn", isLoggedIn.toString(), {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return response;
}
