import AnswerAQuestionForm from "@/components/forms/answerAQuestionForm";
import AllAnswers from "@/components/question/allAnswers";
import Metric from "@/components/shared/Metric";
import NoResult from "@/components/shared/NoResult";
import ParseHtml from "@/components/shared/ParseHtml";
import Tag from "@/components/shared/Tag";
import VotingComp from "@/components/shared/VotingComp";
import { getQuestionById } from "@/lib/actions/question.action";
import { getCurrentProfile } from "@/lib/currentProfile";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { QuestionType } from "@/types/primitive";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ParamsType = {
  id: string;
};

const Page = async ({ params }: { params: ParamsType }) => {
  const { id: questionId } = params;
  const currentProfile = await getCurrentProfile();

  const questionData: QuestionType = await getQuestionById({ questionId });

  if (!questionData) {
    return (
      <div className="flex-center h-[70vh] w-full">
        <NoResult
          title="Question not found"
          content="The question you are searching for have been deleted."
          linkText="Go home"
          link="/"
        />
      </div>
    );
  }

  return (
    <div className=" w-full max-w-[90dvw] overflow-hidden break-normal">
      <div className="flex flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <Link
          href={`/profile/${questionData?.author?._id}`}
          className="flex justify-start gap-3"
        >
          <Image
            src={questionData?.author?.avatar}
            width={22}
            height={22}
            alt="user avatar"
            className="rounded-full"
          />
          <p className="paragraph-semibold text-dark300_light700 capitalize">
            {questionData?.author?.name}
          </p>
        </Link>

        <div className="flex justify-end">
          <VotingComp
            type="question"
            typeId={questionId}
            currentUserId={String(currentProfile?._id)}
            downvotes={JSON.stringify(questionData?.downVotes)}
            upvotes={JSON.stringify(questionData?.upVotes)}
            savedQuestions={JSON.stringify(currentProfile?.questions)}
          />
        </div>
      </div>

      <div className="mt-4">
        <h2 className="h2-semibold text-dark200_light900">
          {questionData?.title}
        </h2>
      </div>

      <div className="mt-5">
        <div className="flex flex-wrap items-center justify-start gap-3 max-sm:mt-2">
          <Metric
            image="/assets/icons/clock.svg"
            text={`Asked ${getTimestamp(questionData?.createdAt)}`}
            value=""
          />
          <Metric
            image="/assets/icons/cardComments.svg"
            text="Answers"
            value={formatAndDivideNumber(questionData?.answers?.length)}
          />
          <Metric
            image="/assets/icons/cardViews.svg"
            text="Views"
            value={formatAndDivideNumber(questionData?.views)}
          />
        </div>
      </div>

      <div className="mt-8">
        <ParseHtml content={questionData?.content} />
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        {questionData?.tags?.map((qtag) => (
          <Tag
            key={qtag?._id}
            href={`/tag/${qtag?._id}`}
            text={qtag?.name}
            size="large"
            variant="soft"
          />
        ))}
      </div>

      <div className="mt-8">
        <AllAnswers questionId={questionId} />
      </div>

      <div className="mt-8">
        <SignedIn>
          <AnswerAQuestionForm
            questionId={questionId}
            currentProfile={JSON.stringify(currentProfile)}
          />
        </SignedIn>

        <SignedOut>
          <p className="h3-bold text-gradient text-center">
            You must be logged in to answer this query.
          </p>
        </SignedOut>
      </div>
    </div>
  );
};

export default Page;
