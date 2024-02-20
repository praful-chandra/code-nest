import React from "react";
import {fetchAllAnswersToAQuestion} from "@/lib/actions/answer.action";
import {AnswerType} from "@/types/primitive";
import Filters from "@/components/shared/Filters";
import {AnswerFilters} from "@/constants/filters";
import SingleAnswer from "./SingleAnswer";
import PaginationComp from "@/components/shared/Pagination";

type AllAnswersProps = {
    questionId: string;
    sortParam?: string;
    pageParam?: string;
};

const AllAnswers = async ({questionId, sortParam, pageParam}: AllAnswersProps) => {
    console.log({sortParam});

    const allAnswers = (await fetchAllAnswersToAQuestion({
        questionId,
        filter: sortParam,
        pageSize: 5,
        page: Number(pageParam),
    })) as {
        answers: AnswerType[];
        totalAnswers: number;
    };

    return (
        <section>
            <div className="my-8 flex items-center justify-between">
                <p className="paragraph-medium text-gradient">
                    {allAnswers.totalAnswers} Answers
                </p>
                <Filters filterOptions={AnswerFilters}/>
            </div>
            {allAnswers?.answers?.map((ans) => (
                <SingleAnswer key={`${ans._id}`} answer={ans}/>
            ))}

            <PaginationComp className="mt-10" itemsPerPage={5} totalItems={allAnswers.totalAnswers} />
        </section>
    );
};

export default AllAnswers;
