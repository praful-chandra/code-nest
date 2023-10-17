import React from "react";
import { homePageFilters } from "@/constants/filters";
import Tag from "@/components/shared/Tag";

export const DesktopFilters = () => {
  return (
    <div className="flex gap-3">
      {homePageFilters.map((filter) => (
        <Tag
          key={filter.value}
          text={filter.name}
          size="large"
          uppercase={false}
          active={filter.value === "recommended"}
        />
      ))}
    </div>
  );
};
