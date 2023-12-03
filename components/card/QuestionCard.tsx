import React from "react";
import Image from "next/image";
import Tag from "../shared/Tag";
import { QuestionType } from "@/types/primitive";
import Link from "next/link";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";

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
            {author?.name}
            <span className="small-regular">
              {author?.isDeleted && `(Deleted)`}{" "}
            </span>
          </p>
          <p className="small-regular max-sm:hidden">
            {" "}
            &#9679; asked {getTimestamp(createdAt)}
          </p>
        </div>
        {/* VOTES - ANSWRS - VIEWS */}
        <div className="flex flex-wrap items-center justify-start gap-3 max-sm:mt-2">
          <div className="flex items-center">
            <Image
              src="/assets/icons/cardLikes.svg"
              width={16}
              height={16}
              alt="Likes"
            />
            <p>
              <span className="small-medium mr-1">
                {formatAndDivideNumber(upVotes?.length)}
              </span>
              <span className="small-regular">Votes</span>
            </p>
          </div>

          <div className="flex items-center">
            <Image
              src="/assets/icons/cardComments.svg"
              width={16}
              height={16}
              alt="Comments"
            />
            <p>
              <span className="small-medium mr-1">
                {formatAndDivideNumber(answers?.length)}
              </span>
              <span className="small-regular">Answers</span>
            </p>
          </div>

          <div className="flex items-center">
            <Image
              src="/assets/icons/cardViews.svg"
              width={16}
              height={16}
              alt="Views"
            />
            <p>
              <span className="small-medium mr-1">
                {formatAndDivideNumber(views)}
              </span>
              <span className="small-regular">Views</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
