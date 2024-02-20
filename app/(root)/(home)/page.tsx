import { DesktopFilters } from "@/components/Home/homePageFilters";
import Filters from "@/components/shared/Filters";
import { QuestionCard } from "@/components/card";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { homePageFilters } from "@/constants/filters";
import Link from "next/link";
import NoResult from "@/components/shared/NoResult";
import { getQuestions } from "@/lib/actions/question.action";
import { QuestionType } from "@/types/primitive";
import { SearchParamsProps } from "@/types";
import PaginationComp from "@/components/shared/Pagination";

const HomePage = async ({ searchParams }: SearchParamsProps) => {
  const questions = (await getQuestions({
    searchQuery: searchParams?.query,
    filter: searchParams?.filter,
    page: Number(searchParams?.page),
    pageSize: 5,
  })) as unknown as {
    questions: QuestionType[];
    totalQuestions: number;
  };

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask a Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          name="searchQuestions"
          placeHolder="Search for Questions"
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
        {questions?.questions?.length ? (
          questions?.questions.map((que) => (
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
      <PaginationComp
        className="mt-10"
        totalItems={questions.totalQuestions}
        itemsPerPage={5}
      />
    </>
  );
};

export default HomePage;
