import Image from "next/image";
import { AnswerType } from "@/types/primitive";
import React from "react";
import { getTimestamp } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import ParseHtml from "@/components/shared/ParseHtml";

type SingleAnswerProps = {
  answer: AnswerType;
};

const SingleAnswer = ({ answer }: SingleAnswerProps) => {
  return (
    <article>
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
        <div className="flex items-center">Votes</div>
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
