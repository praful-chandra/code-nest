import React from "react";
import { homePageFilters } from "@/constants/filters";
import Tag from "@/components/shared/Tag";

export const DesktopFilters = () => {
  return (
    <div className="flex gap-3">
      {homePageFilters.map((filter) => (
        <Tag
          href={`/?filter=${filter.value}`}
          key={filter.value}
          text={filter.label}
          size="large"
          uppercase={false}
          active={filter.value === "recommended"}
        />
      ))}
    </div>
  );
};
