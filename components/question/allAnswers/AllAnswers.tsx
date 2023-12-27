import React from "react";
import { fetchAllAnswersToAQuestion } from "@/lib/actions/question.action";
import { AnswerType } from "@/types/primitive";
import Filters from "@/components/shared/Filters";
import { AnswerFilters } from "@/constants/filters";
import SingleAnswer from "./SingleAnswer";

type AllAnswersProps = {
  questionId: string;
};

const AllAnswers = async ({ questionId }: AllAnswersProps) => {
  const allAnswers = (await fetchAllAnswersToAQuestion(questionId)) as {
    answers: AnswerType[];
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <p className="paragraph-medium text-gradient">
          {allAnswers?.answers?.length} Answers
        </p>
        <Filters filterOptions={AnswerFilters} />
      </div>
      {allAnswers?.answers?.map((ans) => (
        <SingleAnswer key={`${ans._id}`} answer={ans} />
      ))}
    </section>
  );
};

export default AllAnswers;
