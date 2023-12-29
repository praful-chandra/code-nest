"use client";

import React from "react";
import { Button } from "../ui/button";
import { toggleDownvote, toggleUpvote } from "@/lib/actions/question.action";
import { usePathname } from "next/navigation";
import { downVoteAnswer, upvoteAnswer } from "@/lib/actions/answer.action";
import NotSignedInDialog from "./dialogs/NotSignedInDialog";
import { SignedIn, SignedOut } from "@clerk/nextjs";

type VotingCompProps = {
  type: "question" | "answer";
  typeId: string;
  currentUserId: string;
  upvotes: string;
  downvotes: string;
};

const UpVote = ({
  isFilled = false,
  handleClick,
}: {
  isFilled?: boolean;
  handleClick: () => void;
}) => {
  return (
    <Button className="mr-1 p-0" onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M9.5862 1.78135C9.30045 1.4251 8.70045 1.4251 8.4147 1.78135L2.4147 9.28135C2.32668 9.39175 2.27158 9.52475 2.25572 9.66505C2.23987 9.80536 2.26391 9.9473 2.32507 10.0746C2.38624 10.2018 2.48205 10.3093 2.60152 10.3845C2.72098 10.4598 2.85925 10.4999 3.00045 10.5001H6.00045V15.7501C6.00045 15.949 6.07947 16.1398 6.22012 16.2804C6.36077 16.4211 6.55154 16.5001 6.75045 16.5001H11.2505C11.4494 16.5001 11.6401 16.4211 11.7808 16.2804C11.9214 16.1398 12.0005 15.949 12.0005 15.7501V10.5001H15.0005C15.1417 10.4999 15.2799 10.4598 15.3994 10.3845C15.5188 10.3093 15.6147 10.2018 15.6758 10.0746C15.737 9.9473 15.761 9.80536 15.7452 9.66505C15.7293 9.52475 15.6742 9.39175 15.5862 9.28135L9.5862 1.78135ZM11.2505 9.0001H10.5005V15.0001H7.50045V9.0001H4.5612L9.00045 3.45085L13.4397 9.0001H11.2505Z"
          fill={isFilled ? "#6DFF8D" : "#7B8EC8"}
        />
        {isFilled && (
          <path
            d="M10.9163 15.113H6.87727L6.76811 9.32746L4.03906 9.10914L9.16967 3.10524L13.9728 9.32746H10.9163V15.113Z"
            fill="#6DFF8D"
          />
        )}
      </svg>
    </Button>
  );
};

const DownVote = ({
  isFilled = false,
  handleClick,
}: {
  isFilled?: boolean;
  handleClick: () => void;
}) => {
  return (
    <Button className="mr-1 p-0" onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <path
          d="M9.5862 16.2188C9.30045 16.575 8.70045 16.575 8.4147 16.2188L2.4147 8.71877C2.32668 8.60837 2.27158 8.47538 2.25572 8.33507C2.23987 8.19476 2.26391 8.05283 2.32507 7.92556C2.38624 7.7983 2.48205 7.69086 2.60152 7.61559C2.72098 7.54032 2.85925 7.50027 3.00045 7.50002H6.00045V2.25002C6.00045 2.05111 6.07947 1.86035 6.22012 1.71969C6.36077 1.57904 6.55154 1.50002 6.75045 1.50002H11.2505C11.4494 1.50002 11.6401 1.57904 11.7808 1.71969C11.9214 1.86035 12.0005 2.05111 12.0005 2.25002V7.50002H15.0005C15.1417 7.50027 15.2799 7.54032 15.3994 7.61559C15.5188 7.69086 15.6147 7.7983 15.6758 7.92556C15.737 8.05283 15.761 8.19476 15.7452 8.33507C15.7293 8.47538 15.6742 8.60837 15.5862 8.71877L9.5862 16.2188ZM11.2505 9.00002H10.5005V3.00002H7.50045V9.00002H4.5612L9.00045 14.5493L13.4397 9.00002H11.2505Z"
          fill={isFilled ? "#FF6D6D" : "#7B8EC8"}
        />

        {isFilled && (
          <path
            d="M10.9163 2.88693H6.87727L6.76811 8.67251L4.03906 8.89083L9.16967 14.8947L13.9728 8.67251H10.9163V2.88693Z"
            fill="#FF6D6D"
          />
        )}
      </svg>
    </Button>
  );
};

const VoteCount = ({ count }: { count: number }) => {
  return (
    <div className="flex-center background-light700_dark400 subtle-medium text-dark400_light900 h-[20px] w-[20px] rounded-sm">
      {count}
    </div>
  );
};

const Bookmark = ({ isFilled = false }: { isFilled?: boolean }) => {
  return (
    <Button className="p-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
      >
        <g clip-path="url(#clip0_543_4157)">
          <path
            d="M8.9444 14.0956L3.42005 17.0001L4.47533 10.8483L0 6.49198L6.17596 5.59691L8.93814 6.10352e-05L11.7003 5.59691L17.8763 6.49198L13.4009 10.8483L14.4562 17.0001L8.9444 14.0956Z"
            stroke="url(#paint0_linear_543_4157)"
            stroke-width="1.2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_543_4157"
            x1="-2.63494"
            y1="6.48951e-05"
            x2="18.7198"
            y2="1.26341"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#FF7000" />
            <stop offset="1" stop-color="#E2995F" />
          </linearGradient>
          <clipPath id="clip0_543_4157">
            <rect width="18" height="18" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Button>
  );
};

const VotingComp = ({
  type,
  currentUserId,
  downvotes,
  typeId,
  upvotes,
}: VotingCompProps) => {
  const pathName = usePathname();
  const resolvedUpvotes = upvotes ? (JSON.parse(upvotes) as string[]) : [];
  const resolvedDownvotes = downvotes
    ? (JSON.parse(downvotes) as string[])
    : [];

  const handleUpvoteClick = () => {
    if (!currentUserId || currentUserId === "undefined") {
      return;
    }
    if (type === "question") {
      toggleUpvote(typeId, currentUserId, pathName);
    }
    if (type === "answer") {
      upvoteAnswer(typeId, currentUserId, pathName);
    }
  };

  const handleDownvoteClick = () => {
    if (!currentUserId || currentUserId === "undefined") {
      return;
    }
    if (type === "question") {
      toggleDownvote(typeId, currentUserId, pathName);
    }
    if (type === "answer") {
      downVoteAnswer(typeId, currentUserId, pathName);
    }
  };

  return (
    <div className="flex">
      <div className="mr-3 flex items-center">
        <SignedIn>
          <UpVote
            isFilled={
              type === "question" ||
              !!resolvedUpvotes.find((up) => up === currentUserId)
            }
            handleClick={handleUpvoteClick}
          />
        </SignedIn>
        <SignedOut>
          <NotSignedInDialog>
            <UpVote
              isFilled={
                type === "question" ||
                !!resolvedUpvotes.find((up) => up === currentUserId)
              }
              handleClick={handleUpvoteClick}
            />
          </NotSignedInDialog>
        </SignedOut>
        <VoteCount count={resolvedUpvotes?.length ?? 0} />
      </div>
      <div className="mr-5 flex items-center">
        <SignedIn>
          <DownVote
            isFilled={
              type === "question" ||
              !!resolvedDownvotes.find((dv) => dv === currentUserId)
            }
            handleClick={handleDownvoteClick}
          />
        </SignedIn>

        <SignedOut>
          <NotSignedInDialog>
            <DownVote
              isFilled={
                type === "question" ||
                !!resolvedDownvotes.find((dv) => dv === currentUserId)
              }
              handleClick={handleDownvoteClick}
            />
          </NotSignedInDialog>
        </SignedOut>

        <VoteCount count={(resolvedDownvotes?.length ?? 0) * -1} />
      </div>
      {type === "question" && (
        <div className="flex items-center">
          <Bookmark />
        </div>
      )}
    </div>
  );
};

export default VotingComp;
