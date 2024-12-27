import React from "react";
import Link from "next/link";
import CustomButton from "./CustomButton";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { cookies } from "next/headers";
import { decrypt } from "../lib/session";
import { logout } from "../(authentication)/login/actions";

const Navbar = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("session")?.value;
  const user = await decrypt(session);
  const isLoggedIn = Boolean(user);

  return (
    <header className="py-4 border-b border-b-gray-500 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-2xl font-semibold">
          Scripts Hub
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center space-x-4">
          {isLoggedIn ? (
            <form action={logout}>
              <CustomButton
                size="medium"
                className="w-full"
                type="submit"
                icon={<RiLogoutBoxRLine className="text-white" />}
              >
                Logout
              </CustomButton>
            </form>
          ) : (
            <Link
              href="/login"
              className="bg-black text-white px-4 py-2 rounded-sm hover:bg-gray-800 transition"
            >
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
