import { getUserQuestions } from "@/lib/actions/question.action";
import React from "react";
import { QuestionCard } from "@/components/card";
import { QuestionType } from "@/types/primitive";

type TopPostsProps = {
  userId: string;
};

const TopPosts = async ({ userId }: TopPostsProps) => {
  const userQuestions = await getUserQuestions({ userId, page: 1 });

  return (
    <section>
      {userQuestions?.questionsList?.map((que) => {
        return <QuestionCard question={que as QuestionType} key={que._id} />;
      })}
    </section>
  );
};

export default TopPosts;
