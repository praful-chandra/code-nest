"use client";

import { DropdownOption } from "@/types";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { useSearchParams, useRouter } from "next/navigation";
import { getUrlQuery } from "@/lib/utils";

type FiltersProps = {
  filterOptions: DropdownOption[];
  otherClasses?: string;
  containerClasses?: string;
};

const Filters = ({
  filterOptions,
  containerClasses,
  otherClasses,
}: FiltersProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterQuery = searchParams.get("filter");

  const handleFilterChange = (value: string) => {
    const newUrl = getUrlQuery({
      searchParams: searchParams.toString(),
      key: "filter",
      value,
    });
    router.push(newUrl, { scroll: false });
  };

  return (
    <div className={`relative ${containerClasses}`}>
      <Select
        value={filterQuery ?? undefined}
        onValueChange={handleFilterChange}
      >
        <SelectTrigger
          className={`${otherClasses} body-regular light-border background-light800_dark300 text-dark500_light700 border px-5 py-2.5`}
        >
          <div className="line-clamp-1 flex-1 text-left">
            <SelectValue placeholder="Select a Filter" />
          </div>
        </SelectTrigger>
        <SelectContent className="background-light800_dark300 text-dark500_light700">
          <SelectGroup>
            {filterOptions.map((item) => (
              <SelectItem
                key={item.value}
                value={item.value}
                className="text-dark500_light700"
              >
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Filters;
