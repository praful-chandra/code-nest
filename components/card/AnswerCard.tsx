import { getTimestamp } from "@/lib/utils";
import { FullAnswerType } from "@/types/primitive";
import Link from "next/link";
import Image from "next/image";
import React from "react";

type AnswerCardProps = {
  answer: FullAnswerType;
};

const AnswerCard = ({ answer }: AnswerCardProps) => {
  return (
    <div className="card-wrapper text-dark100_light900 mb-6 w-full rounded-xl p-11 font-inter last:mb-0">
      {/* MOBILE TIME  */}
      <p className="subtle-regular text-dark400_light700 line-clamp-1 sm:hidden">
        {getTimestamp(answer?.createdAt)}
      </p>
      {/* TITLE */}
      <Link href={`/question/${answer?.question?._id}/#${answer?._id}`}>
        <h3 className="h3-semibold line-clamp-1">{answer?.question?.title}</h3>
      </Link>
      {/* INFO */}
      <div className="text-dark400_light800 mt-8 flex w-full flex-wrap items-center justify-between">
        {/* PROFILE */}
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
          <p className="body-medium mx-1">
            {answer?.author?.name}{" "}
            {answer?.author?.isDeleted && (
              <span className="small-regular">(Deleted)</span>
            )}{" "}
          </p>
          <p className="small-regular max-sm:hidden">
            {" "}
            &#9679; answered {getTimestamp(answer?.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnswerCard;
