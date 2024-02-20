import {getUserQuestions} from "@/lib/actions/question.action";
import React from "react";
import {QuestionCard} from "@/components/card";
import {QuestionType} from "@/types/primitive";
import PaginationComp from "@/components/shared/Pagination";
import {SearchParamsType} from "@/types";

type TopPostsProps = {
    userId: string;
    searchParams?: SearchParamsType;
};

const TopPosts = async ({userId, searchParams}: TopPostsProps) => {
    const userQuestions = await getUserQuestions({userId, page: Number(searchParams?.top_q_page), pageSize: 5});

    return (
        <section>
            {userQuestions?.questionsList?.map((que) => {
                return <QuestionCard question={que as QuestionType} key={que._id}/>;
            })}

            <PaginationComp
                className="mt-10"
                totalItems={userQuestions?.totalQuestions}
                itemsPerPage={5}
                customQueryName="top_q_page"
            />
        </section>
    );
};

export default TopPosts;
