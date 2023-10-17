import { DesktopFilters } from "@/components/Home/homePageFilters";
import Filters from "@/components/shared/Filters";
import { QuestionCard } from "@/components/shared/card";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { homePageFilters } from "@/constants/filters";
import Link from "next/link";

const HomePage = () => {
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
        <QuestionCard
          question={{
            id: "2131239-123123-1231231",
            title:
              "The Lightning Component c:LWC_PizzaTracker generated invalid output for field status. Error How to solve this",
            tags: [
              { label: "Javascript", url: "/js" },
              { label: "next.js", url: "/nextjs" },
              { label: "react", url: "/reactjs" },
            ],
            profile: {
              name: "Shiva",
              photo: "/assets/images/logo.png",
            },
            time: "2 Days ago",
            views: "12k",
            answers: "900",
            votes: "5.2k",
          }}
        />
      </div>
    </>
  );
};

export default HomePage;
