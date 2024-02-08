"use client";

import { Input } from "@/components/ui/input";
import { cn, getUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import React, { useEffect, useState } from "react";

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
  const router = useRouter();
  const searchParams = useSearchParams();

  const searchQuery = searchParams.get("query");

  const [searchVal, setSetsearchVal] = useState(searchQuery || "");

  useEffect(() => {
    const debouncedUpdate = setTimeout(() => {
      if (searchVal) {
        const newUrl = getUrlQuery({
          searchParams: searchParams.toString(),
          key: "query",
          value: searchVal,
        });

        router.push(newUrl, { scroll: false });
      } else if (searchVal === "") {
        const newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 400);

    return () => clearTimeout(debouncedUpdate);
  }, [router, searchParams, searchVal]);

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
        value={searchVal}
        onChange={(e) => {
          setSetsearchVal(e.target.value);
        }}
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
