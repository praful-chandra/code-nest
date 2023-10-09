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
import { Button } from "@/components/ui/button";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NavContent = () => {
  const pathName = usePathname();
  return (
    <section className="flex h-full flex-col gap-6 pt-16">
      {sidebarLinks?.map((sideItem) => {
        const isActive =
          (pathName.includes(sideItem.route) && sideItem?.route?.length > 1) ||
          pathName === sideItem.route;

        return (
          <SheetClose asChild key={sideItem.route}>
            <Link
              href={sideItem.route}
              className={cn(
                isActive
                  ? "primary-gradient rounded-lg text-light-900"
                  : "text-dark300_light900",
                "flex items-center justify-start gap-4 bg-transparent p-4"
              )}
            >
              <Image
                src={sideItem.imgURL}
                alt={sideItem.label}
                width={20}
                height={20}
                className={cn(isActive ? "" : "invert-colors")}
              />
              <p className={cn(isActive ? "base-bold" : "base-medium")}>
                {sideItem.label}
              </p>
            </Link>
          </SheetClose>
        );
      })}
    </section>
  );
};

export const MobileNav = () => {
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
          <SheetClose asChild>
            <NavContent />
          </SheetClose>

          <SignedOut>
            <div className="flex flex-col gap-3">
              <SheetClose asChild>
                <Link href="/signin">
                  <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    <span className="primary-text-gradient">Sign In</span>
                  </Button>
                </Link>
              </SheetClose>

              <SheetClose asChild>
                <Link href="/signup">
                  <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
                    Sign Up
                  </Button>
                </Link>
              </SheetClose>
            </div>
          </SignedOut>
        </div>
      </SheetContent>
    </Sheet>
  );
};
