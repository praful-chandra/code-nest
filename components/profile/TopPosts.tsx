// import { getUserQuestions } from "@/lib/actions/question.action";
import React from "react";

type TopPostsProps = {
  userId: string;
};

const TopPosts = async ({ userId }: TopPostsProps) => {
  //   const userQuestions = await getUserQuestions({ userId });

  return <div>TopPosts</div>;
};

export default TopPosts;
