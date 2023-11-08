import React from "react";
import Image from "next/image";
import Tag from "../shared/Tag";
import { CardTagList } from "@/types";
import Link from "next/link";
import { getTimestamp } from "@/lib/utils";

type QuestionCardProps = {
  question: {
    id: string;
    title: string;
    tags: CardTagList[];
    votes: number;
    answers: number;
    views: number;
    time: Date;
    profile: {
      photo: string;
      name: string;
    };
  };
};

const QuestionCard = ({ question }: QuestionCardProps) => {
  const { id, answers, profile, tags, time, title, views, votes } = question;
  return (
    <div className="card-wrapper text-dark100_light900 mb-6 w-full rounded-xl p-11 font-inter last:mb-0">
      {/* MOBILE TIME  */}
      <p className="subtle-regular text-dark400_light700 line-clamp-1 sm:hidden">
        {getTimestamp(time)}
      </p>
      {/* TITLE */}
      <Link href={`/question/${id}`}>
        <h3 className="h3-semibold line-clamp-1">{title}</h3>
      </Link>
      {/* TAGS */}
      <div className="mt-3 flex flex-wrap gap-2">
        {tags.map((t) => (
          <Tag href={t.url} key={t.url} text={t.label} variant="soft" />
        ))}
      </div>
      {/* INFO */}
      <div className="text-dark400_light800 mt-8 flex w-full flex-wrap items-center justify-between">
        {/* PROFILE */}
        <div className="flex  items-center justify-start ">
          <Image
            src={profile?.photo}
            width={20}
            height={20}
            className="rounded-full"
            alt="display pic"
          />
          <p className="body-medium mx-1">{profile?.name} </p>
          <p className="small-regular max-sm:hidden">
            {" "}
            &#9679; asked {getTimestamp(time)}
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
              <span className="small-medium mr-1">{votes}</span>
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
              <span className="small-medium mr-1">{answers}</span>
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
              <span className="small-medium mr-1">{views}</span>
              <span className="small-regular">Views</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
