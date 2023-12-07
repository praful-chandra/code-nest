import React from "react";
import Image from "next/image";
import Tag from "../shared/Tag";
import { QuestionType } from "@/types/primitive";
import Link from "next/link";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Metric from "../shared/Metric";

type QuestionCardProps = {
  question: QuestionType;
};

const QuestionCard = ({ question }: QuestionCardProps) => {
  const { _id, answers, author, tags, createdAt, title, views, upVotes } =
    question;
  return (
    <div className="card-wrapper text-dark100_light900 mb-6 w-full rounded-xl p-11 font-inter last:mb-0">
      {/* MOBILE TIME  */}
      <p className="subtle-regular text-dark400_light700 line-clamp-1 sm:hidden">
        {getTimestamp(createdAt)}
      </p>
      {/* TITLE */}
      <Link href={`/question/${_id}`}>
        <h3 className="h3-semibold line-clamp-1">{title}</h3>
      </Link>
      {/* TAGS */}
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Tag
            href={`/tags/${t._id}`}
            key={t.name}
            text={t.name}
            variant="soft"
          />
        ))}
      </div>
      {/* INFO */}
      <div className="text-dark400_light800 mt-8 flex w-full flex-wrap items-center justify-between">
        {/* PROFILE */}
        <div className="flex  items-center justify-start ">
          <Image
            src={
              author?.isDeleted
                ? "/assets/images/defaultUser.png"
                : author?.avatar
            }
            width={20}
            height={20}
            className="rounded-full"
            alt="display pic"
          />
          <p className="body-medium mx-1">
            {author?.name}{" "}
            {author?.isDeleted && (
              <span className="small-regular">(Deleted)</span>
            )}{" "}
          </p>
          <p className="small-regular max-sm:hidden">
            {" "}
            &#9679; asked {getTimestamp(createdAt)}
          </p>
        </div>
        {/* VOTES - ANSWRS - VIEWS */}
        <div className="flex flex-wrap items-center justify-start gap-3 max-sm:mt-2">
          <Metric
            image="/assets/icons/cardLikes.svg"
            text="Votes"
            value={formatAndDivideNumber(upVotes?.length)}
          />

          <Metric
            image="/assets/icons/cardComments.svg"
            text="Answers"
            value={formatAndDivideNumber(answers?.length)}
          />
          <Metric
            image="/assets/icons/cardViews.svg"
            text="Views"
            value={formatAndDivideNumber(views)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
