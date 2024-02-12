import { cn } from "@/lib/utils";
import React from "react";
import Link from "next/link";

interface TagProps {
  text: string;
  href: string;
  size?: "small" | "large";
  uppercase?: boolean;
  active?: boolean;
  variant?: "regular" | "soft";
  disabled?: boolean;
  handleOnClick?: (e: React.MouseEvent) => void;
}

const Tag = ({
  text,
  href,
  size = "small",
  uppercase = true,
  active = false,
  variant = "regular",
  disabled = false,
  handleOnClick,
}: TagProps) => {
  return (
    <Link
      href={href ?? ""}
      className={cn(
        "rounded-md w-fit",
        size === "large" ? "px-6 py-3 body-medium" : "subtle-medium px-4 py-2",
        uppercase ? "uppercase" : "",
        variant === "soft" && "text-light400_light500",
        variant === "regular" && "text-dark400_light500",
        active
          ? "bg-primary-100 dark:bg-dark-400 text-primary-500"
          : "background-light800_dark300"
      )}
      aria-disabled={disabled}
      onClick={handleOnClick}
    >
      {text}
    </Link>
  );
};

export default Tag;
