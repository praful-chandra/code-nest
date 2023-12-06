import Filters from "@/components/shared/Filters";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { communityFilters } from "@/constants/filters";
import React from "react";

const Page = () => {
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Community</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          name="searchQuestions"
          placeHolder="Search for Questions"
        />
        <div className="">
          <Filters
            filterOptions={communityFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
        </div>
      </div>
    </>
  );
};

export default Page;
