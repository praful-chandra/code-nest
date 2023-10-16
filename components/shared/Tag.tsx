import { cn } from "@/lib/utils";
import React from "react";
import { Button } from "../ui/button";

interface TagProps {
  text: string;
  size?: "small" | "large";
  uppercase?: boolean;
  active?: boolean;
  variant?: "regular" | "soft";
}

const Tag = ({
  text,
  size = "small",
  uppercase = true,
  active = false,
  variant = "regular",
}: TagProps) => {
  return (
    <Button
      className={cn(
        "rounded-md",
        size === "large" ? "px-6 py-3 body-medium" : "subtle-medium px-4 py-2",
        uppercase ? "uppercase" : "",
        variant === "soft" && "text-light400_light500",
        variant === "regular" && "text-dark400_light500",
        active
          ? "bg-primary-100 dark:bg-dark-400 text-primary-500"
          : "background-light800_dark300"
      )}
    >
      {text}
    </Button>
  );
};

export default Tag;
