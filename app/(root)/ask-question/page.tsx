import Question from "@/components/forms/askAQuestionForm";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import console from "console";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/signin");
  }

  const mongoUser = await getUserById({ userId });
  console.log({ mongoUser });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900 ">Ask a Question</h1>
      <div className="mt-9">
        <Question />
      </div>
    </div>
  );
};

export default Page;
