import Link from "next/link";
import Image from "next/image";
import React from "react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Theme from "./Theme";
import { MobileNav } from "./MobileNav";
import GlobalSearch from "../search/GlobalSearch";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 sm:px-12 dark:shadow-none">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/assets/images/logo.png"
          width={25}
          height={25}
          alt="Code Nest"
          // className="invert-colors"
        />

        <p className="h2-bold font-spaceGrotesk text-dark-100 max-sm:hidden dark:text-light-900">
          Code
          <span className="text-primary-500"> Nest</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <Theme />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;
