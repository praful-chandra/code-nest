"use client";

import React from "react";
import Image from "next/image";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";

import { useTheme } from "@/context/ThemeProvider";
import { themes } from "@/constants";
import { cn } from "@/lib/utils";

const Theme = () => {
  const { mode, setMode } = useTheme();

  console.log({ mode });

  return (
    <Menubar className="relative border-none bg-transparent shadow-none">
      <MenubarMenu>
        <MenubarTrigger className="focus:bg-light-900 data-[state=open]:bg-light-900 dark:focus:bg-dark-200 dark:data-[state=open]:bg-dark-200">
          {mode === "light" ? (
            <Image
              src="/assets/icons/lightModeIcon.svg"
              alt="dark mode"
              width={20}
              height={20}
              className="active-theme"
            />
          ) : (
            <Image
              src="/assets/icons/darkModeIcon.svg"
              alt="light mode"
              width={20}
              height={20}
              className="active-theme"
            />
          )}
        </MenubarTrigger>
        <MenubarContent className="absolute right-[-3rem] mt-3 min-w-[120px] rounded border py-2 dark:border-dark-400 dark:bg-dark-300 ">
          {themes?.map((themeItem) => (
            <MenubarItem
              key={themeItem.value}
              onClick={(e) => {
                e.preventDefault();
                setMode(themeItem.value as "light" | "dark" | "system");

                if (themeItem.value !== "system") {
                  localStorage.theme = themeItem.value;
                } else {
                  localStorage.removeItem("theme");
                }
              }}
            >
              <Image
                src={themeItem.icon}
                alt={themeItem.value}
                width={16}
                height={16}
                className={mode === themeItem.value ? "active-theme" : ""}
              />
              <p
                className={cn(
                  "body-semibold text-light-500 ml-2",
                  mode === themeItem.value
                    ? "text-primary-500"
                    : "text-dark100_light900"
                )}
              >
                {themeItem.label}
              </p>
            </MenubarItem>
          ))}
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default Theme;
