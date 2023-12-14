import AnswerAQuestionForm from "@/components/forms/answerAQuestionForm";
import Metric from "@/components/shared/Metric";
import ParseHtml from "@/components/shared/ParseHtml";
import Tag from "@/components/shared/Tag";
import { getQuestionById } from "@/lib/actions/question.action";
import { getCurrentProfile } from "@/lib/currentProfile";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import { QuestionType } from "@/types/primitive";
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

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
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

        <div className="flex justify-end">VOTES</div>
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
        <AnswerAQuestionForm
          questionId={questionId}
          currentProfile={JSON.stringify(currentProfile)}
        />
      </div>
    </>
  );
};

export default Page;
