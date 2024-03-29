import React from "react";
import Image from "next/image";
import Tag from "../shared/Tag";
import { QuestionType } from "@/types/primitive";
import Link from "next/link";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Metric from "../shared/Metric";
import { SignedIn } from "@clerk/nextjs";
import CardActions from "./CardActions";
import { getCurrentProfile } from "@/lib/currentProfile";

type QuestionCardProps = {
  question: QuestionType;
};

const QuestionCard = async ({ question }: QuestionCardProps) => {
  const { _id, answers, author, tags, createdAt, title, views, upVotes } =
    question;
  const signedInUser = await getCurrentProfile();

  return (
    <div className="card-wrapper text-dark100_light900 relative mb-6 w-full rounded-xl p-11 font-inter last:mb-0">
      <SignedIn>
        {String(signedInUser?._id) === String(question?.author?._id) && (
          <div className="absolute right-1 top-1">
            <CardActions
              type="question"
              typeId={String(question?._id)}
              authorId={String(question?.author?._id)}
              onEditRedirect={`/question/edit/${String(question?._id)}`}
            />
          </div>
        )}
      </SignedIn>
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
            className="h-[20px] w-[20px] rounded-full object-cover object-top"
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
