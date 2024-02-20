import { getUserAnswers } from "@/lib/actions/answer.action";
import React from "react";
import { AnswerCard } from "../card";
import { FullAnswerType } from "@/types/primitive";
import {SearchParamsType} from "@/types";
import PaginationComp from "@/components/shared/Pagination";

type UserAnswersProps = {
  userId: string;
  searchParams: SearchParamsType;
};

const UserAnswers = async ({ userId,searchParams }: UserAnswersProps) => {
  const userAnswers = await getUserAnswers({ userId, pageSize: 5, page: Number(searchParams?.top_a_page)});

  return (
    <section>
      {userAnswers?.answersList?.map((ans) => (
        <AnswerCard key={ans?._id} answer={ans as FullAnswerType} />
      ))}

      <PaginationComp

        className="mt-10"
        totalItems={userAnswers?.totalAnswers}
        customQueryName="top_a_page"
        itemsPerPage={5}
      />
    </section>
  );
};

export default UserAnswers;
