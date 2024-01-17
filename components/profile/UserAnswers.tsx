import { getUserAnswers } from "@/lib/actions/answer.action";
import React from "react";
import { AnswerCard } from "../card";
import { FullAnswerType } from "@/types/primitive";

type UserAnswersProps = {
  userId: string;
};

const UserAnswers = async ({ userId }: UserAnswersProps) => {
  const userAnswers = await getUserAnswers({ userId });

  return (
    <section>
      {userAnswers?.answersList?.map((ans) => (
        <AnswerCard key={ans?._id} answer={ans as FullAnswerType} />
      ))}
    </section>
  );
};

export default UserAnswers;
