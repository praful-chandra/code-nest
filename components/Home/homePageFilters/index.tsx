"use client";

import React from "react";
import { homePageFilters } from "@/constants/filters";
import Tag from "@/components/shared/Tag";
import { getUrlQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

export const DesktopFilters = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterQuery = searchParams.get("filter");

  const getNewUrl = (value: string) => {
    return getUrlQuery({
      searchParams: searchParams.toString(),
      key: "filter",
      value,
    });
  };

  const handleFilterClick = (key: string) => {
    const newUrl = getNewUrl(key);
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex gap-3">
      {homePageFilters.map((filter) => (
        <Tag
          href={`/?filter=${filter.value}`}
          key={filter.value}
          text={filter.label}
          size="large"
          uppercase={false}
          active={filter.value === (filterQuery ?? "recommended")}
          handleOnClick={(e) => {
            e.preventDefault();
            handleFilterClick(filter?.value);
          }}
        />
      ))}
    </div>
  );
};
