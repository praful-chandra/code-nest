import { getQuestionById } from "@/lib/actions/question.action";
import { getCurrentProfile } from "@/lib/currentProfile";
import { SignedIn } from "@clerk/nextjs";
import React from "react";
import Question from "@/components/forms/askAQuestionForm";
import { QuestionType } from "@/types/primitive";
import NoResult from "@/components/shared/NoResult";

type ParamsType = {
  id: string;
};
const page = async ({ params }: { params: ParamsType }) => {
  const { id: questionId } = params;
  const currentProfile = await getCurrentProfile();

  const questionData: QuestionType = await getQuestionById({ questionId });

  if (
    !questionData ||
    String(questionData?.author?._id) !== String(currentProfile?._id)
  ) {
    return (
      <div className="flex-center h-[70vh] w-full">
        <NoResult
          title="You shouldn't be here"
          content="This Question cannot be edited."
          linkText="Go home"
          link="/"
        />
      </div>
    );
  }

  return (
    <SignedIn>
      <div>
        <h1 className="h1-bold text-dark100_light900 ">Edit Question</h1>
        <div className="mt-9">
          <Question
            currentProfile={JSON.stringify(currentProfile)}
            existingData={JSON.stringify(questionData)}
            editMode
          />
        </div>
      </div>
    </SignedIn>
  );
};

export default page;
