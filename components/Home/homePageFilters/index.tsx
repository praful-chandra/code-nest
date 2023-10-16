import React from "react";
import { homePageFilters } from "@/constants/filters";
import Tag from "@/components/shared/Tag";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

export const MobileFilters = () => {
  return (
    <div className="">
      <Select>
        <SelectTrigger className="background-light800_dark300 text-dark500_light700 body-regular light-border relative flex min-h-[56px] w-full border px-5 py-2.5 outline-none">
          <SelectValue placeholder="Select Filter" />
        </SelectTrigger>
        <SelectContent>
          {homePageFilters?.map((filter) => (
            <SelectItem
              className="text-dark500_light700"
              key={filter.value}
              value={filter.value}
            >
              {filter.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
