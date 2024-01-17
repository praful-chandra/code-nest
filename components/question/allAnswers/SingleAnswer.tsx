import Image from "next/image";
import { AnswerType } from "@/types/primitive";
import React from "react";
import { getTimestamp } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import ParseHtml from "@/components/shared/ParseHtml";
import VotingComp from "@/components/shared/VotingComp";
import { getCurrentProfile } from "@/lib/currentProfile";

type SingleAnswerProps = {
  answer: AnswerType;
};

const SingleAnswer = async ({ answer }: SingleAnswerProps) => {
  const currentProfile = await getCurrentProfile();

  return (
    <article>
      <span id={`&quot;${answer?._id}&quot;`} className="hash-span" />
      <div className="flex items-center justify-between">
        <div className="flex  items-center justify-start ">
          <Image
            src={
              answer?.author?.isDeleted
                ? "/assets/images/defaultUser.png"
                : answer?.author?.avatar
            }
            width={20}
            height={20}
            className="rounded-full"
            alt="display pic"
          />
          <p className="body-medium text-dark300_light700 mx-1">
            {answer?.author?.name}{" "}
            {answer?.author?.isDeleted && (
              <span className="small-regular">(Deleted)</span>
            )}{" "}
          </p>
          <p className="small-regular text-light400_light500">
            {" "}
            &#9679; answered {getTimestamp(answer?.createdAt)}
          </p>
        </div>
        <div className="flex items-center">
          <VotingComp
            type="answer"
            typeId={String(answer._id)}
            currentUserId={String(currentProfile?._id)}
            downvotes={JSON.stringify(answer.downVotes)}
            upvotes={JSON.stringify(answer.upVotes)}
          />
        </div>
      </div>

      <div className="mt-6">
        <ParseHtml content={answer?.answerContent} />
      </div>
      <div className="my-9">
        <Separator className="background-light800_dark300 h-1 rounded-md" />
      </div>
    </article>
  );
};

export default SingleAnswer;
