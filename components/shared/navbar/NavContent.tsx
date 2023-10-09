"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type UseGetNavContentProps = {
  isDesktopMode: boolean;
};

export const useGetNavContent = ({ isDesktopMode }: UseGetNavContentProps) => {
  const pathName = usePathname();
  return sidebarLinks?.map((sideItem) => {
    const isActive =
      (pathName.includes(sideItem.route) && sideItem?.route?.length > 1) ||
      pathName === sideItem.route;

    return {
      key: sideItem?.route,
      component: (
        <Link
          key={sideItem.route}
          href={sideItem.route}
          className={cn(
            isActive
              ? "primary-gradient  text-light-900"
              : "text-dark300_light900",
            "flex items-center rounded-lg justify-start gap-4 bg-transparent p-4"
          )}
        >
          <Image
            src={sideItem.imgURL}
            alt={sideItem.label}
            width={20}
            height={20}
            className={cn(isActive ? "" : "invert-colors")}
          />
          <p
            className={cn(
              isActive ? "base-bold" : "base-medium",
              isDesktopMode ? "max-lg:hidden" : ""
            )}
          >
            {sideItem.label}
          </p>
        </Link>
      ),
    };
  });
};

export const NavSignInBtn = () => {
  return (
    <Link href="/signin">
      <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
        <span className="primary-text-gradient">Sign In</span>
      </Button>
    </Link>
  );
};

export const NavSignUpBtn = () => {
  return (
    <Link href="/signup">
      <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
        Sign Up
      </Button>
    </Link>
  );
};

export const NavSignInBtnDesktop = () => {
  return (
    <Link href="/signin">
      <Button className="small-medium btn-secondary min-h-[41px] w-full rounded-lg px-4 py-3 shadow-none">
        <span className="primary-text-gradient max-lg:hidden">Sign In</span>
        <Image
          src="/assets/icons/account.svg"
          width={20}
          height={20}
          alt="SignIn"
          className="invert-colors hidden max-lg:block"
        />
      </Button>
    </Link>
  );
};

export const NavSignUpBtnDesktop = () => {
  return (
    <Link href="/signup">
      <Button className="small-medium light-border-2 btn-tertiary text-dark400_light900 inline-flex h-9 min-h-[41px] w-full items-center justify-center rounded-lg border bg-slate-900 px-4 py-3 text-sm font-medium shadow-none transition-colors hover:bg-slate-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 dark:focus-visible:ring-slate-300">
        <span className="max-lg:hidden">Sign Up</span>
        <Image
          src="/assets/icons/sign-up.svg"
          width={20}
          height={20}
          alt="SignUp"
          className="invert-colors hidden max-lg:block"
        />
      </Button>
    </Link>
  );
};
