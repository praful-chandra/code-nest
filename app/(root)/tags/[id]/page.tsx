import { DesktopFilters } from "@/components/Home/homePageFilters";
import { QuestionCard } from "@/components/card";
import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { homePageFilters } from "@/constants/filters";
import { fetchTagById } from "@/lib/actions/tag.action";
import { SearchParamsType } from "@/types";
import { QuestionType, TagType } from "@/types/primitive";
import React from "react";
import PaginationComp from "@/components/shared/Pagination";

type ParamsType = {
  id: string;
};

const Page = async ({
  params,
  searchParams,
}: {
  params: ParamsType;
  searchParams: SearchParamsType;
}) => {
  const { id: tagId } = params;

  const {tag,totalTags} = (await fetchTagById({
    tagId,
    searchQuery: searchParams?.query,
      pageSize: 5,
      page: Number( searchParams?.page),
  })) as {
      tag: TagType,
      totalTags: number;
  };

  return (
    <div>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">{tag?.name}</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          name="searchQuestions"
          placeHolder={`Search Questions in ${tag?.name} `}
        />
        <div className="hidden max-md:block">
          <Filters
            filterOptions={homePageFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
            containerClasses="hidden max-md:flex"
          />
        </div>
      </div>
      <div className="mt-7 flex max-md:hidden">
        <DesktopFilters />
      </div>
      <div className="mt-10">
        {tag?.questions?.length ? (
          (tag?.questions as unknown as QuestionType[]).map(
            (que: QuestionType) => <QuestionCard question={que} key={que._id} />
          )
        ) : (
          <NoResult
            title="There’s no question to show"
            content="Be the first to break the silence! 🚀 Ask a Question and kickstart the
            discussion. our query could be the next big thing others learn from. Get
            involved! 💡"
            link="/ask-question"
            linkText="Ask a Question"
          />
        )}
      </div>
        <PaginationComp
            className="mt-10"
            itemsPerPage={5}
            totalItems={totalTags}

        />
    </div>
  );
};

export default Page;
