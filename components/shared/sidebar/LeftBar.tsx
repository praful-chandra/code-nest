"use client";

import React from "react";
import {
  NavSignInBtnDesktop,
  NavSignUpBtnDesktop,
  useGetNavContent,
} from "../navbar/NavContent";
import { SignedOut } from "@clerk/nextjs";

const LeftBar = () => {
  const navContent = useGetNavContent({ isDesktopMode: true });
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0 flex h-screen w-fit flex-col justify-between  overflow-y-auto border-r p-6 pt-36 shadow-light-300 dark:shadow-none max-sm:hidden lg:w-[266px]">
      <div className="flex  w-fit flex-1 flex-col gap-6">
        {navContent.map((navItem) => navItem.component)}
      </div>

      <SignedOut>
        <div className="mt-6 flex flex-col gap-3">
          <NavSignInBtnDesktop />
          <NavSignUpBtnDesktop />
        </div>
      </SignedOut>
    </section>
  );
};

export default LeftBar;
