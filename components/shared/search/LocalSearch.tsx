"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";

import React from "react";

type LocalSearchProp = {
  name: string;
  placeHolder: string;
  className?: string;
  iconPosition?: "left" | "right";
};

const LocalSearch = ({
  name,
  placeHolder,
  className,
  iconPosition = "left",
}: LocalSearchProp) => {
  return (
    <div
      className={cn(
        "background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-1 rounded-xl px-4 ",
        className ?? ""
      )}
    >
      {iconPosition !== "right" && (
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
      <Input
        name={name}
        type="text"
        placeholder={placeHolder}
        className="paragraph-regular no-focus placeholder background-light800_darkgradient border-none shadow-none outline-none"
      />
      {iconPosition === "right" && (
        <Image
          src="/assets/icons/search.svg"
          alt="search"
          width={24}
          height={24}
          className="cursor-pointer"
        />
      )}
    </div>
  );
};

export default LocalSearch;
