import { DesktopFilters } from "@/components/Home/homePageFilters";
import { QuestionCard } from "@/components/card";
import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { homePageFilters } from "@/constants/filters";
import { ITag } from "@/database/tag.model";
import { fetchTagById } from "@/lib/actions/tag.action";
import { QuestionType } from "@/types/primitive";
import React from "react";

type ParamsType = {
  id: string;
};

const Page = async ({ params }: { params: ParamsType }) => {
  const { id: tagId } = params;

  const currentTag = (await fetchTagById({ tagId })) as ITag;
  console.log({ currentTag });

  return (
    <div>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">{currentTag?.name}</h1>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          name="searchQuestions"
          placeHolder={`Search Questions in ${currentTag?.name} `}
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
        {currentTag?.questions?.length ? (
          currentTag?.questions.map((que: QuestionType) => (
            <QuestionCard question={que} key={que._id} />
          ))
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
    </div>
  );
};

export default Page;
