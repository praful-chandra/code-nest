"use client";

import React from "react";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { SignedOut } from "@clerk/nextjs";
import { useGetNavContent, NavSignInBtn, NavSignUpBtn } from "./NavContent";

export const MobileNav = () => {
  const navContent = useGetNavContent({ isDesktopMode: false });
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Image
          src="/assets/icons/hamburger.svg"
          width={26}
          height={26}
          alt="Menu"
          className="invert-colors sm:hidden"
        />
      </SheetTrigger>
      <SheetContent
        side="left"
        className="background-light900_dark200 overflow-scroll  border-none"
      >
        <Link href="/" className="flex items-center gap-1">
          <Image
            src="/assets/images/logo.png"
            width={25}
            height={25}
            alt="Code Nest"
          />

          <p className="h2-bold  text-dark100_light900 font-spaceGrotesk">
            Code
            <span className="text-primary-500"> Nest</span>
          </p>
        </Link>
        <div className="">
          <SheetClose asChild className="mb-4">
            <section className="flex h-full flex-col gap-6 pt-16">
              {navContent.map((navItem) => (
                <SheetClose asChild key={navItem.key}>
                  {navItem.component}
                </SheetClose>
              ))}
            </section>
          </SheetClose>

          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <NavSignInBtn />
              </SheetClose>

              <SheetClose asChild>
                <NavSignUpBtn />
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};
