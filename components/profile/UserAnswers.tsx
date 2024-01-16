import { getUserAnswers } from "@/lib/actions/answer.action";
import React from "react";

type UserAnswersProps = {
  userId: string;
};

const UserAnswers = async ({ userId }: UserAnswersProps) => {
  const userAnswers = await getUserAnswers({ userId });

  return <div>UserAnswers</div>;
};

export default UserAnswers;
