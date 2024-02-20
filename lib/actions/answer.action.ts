"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import userModel from "@/database/user.model";
import {revalidatePath} from "next/cache";
import {connectToDatabase} from "../mongoose";
import {answerFormSchema} from "../validations";
import {
    DeleteAnswerParams,
    FetchAllAnswersToAQuestionProps,
    GetUserItemsWithPagination,
} from "./shared.types";
import {AnswerFiltersEnums} from "@/constants/filters";
import mongoose from "mongoose";

export const answerQuestion = async (answerQuestionData: unknown) => {
    try {
        connectToDatabase();

        const validationResult = answerFormSchema.safeParse(answerQuestionData);

        if (!validationResult.success) {
            let errorMessage = "";

            validationResult.error.issues.forEach((issue) => {
                errorMessage = `${errorMessage} ${issue.path[0]} : ${issue.message}. `;
            });
            return {
                error: errorMessage,
            };
        }

        const {
            data: {answerContent, author, path, questionId},
        } = validationResult;

        const newAnswer = await Answer.create({
            question: questionId,
            author,
            answerContent,
        });

        await Question.findByIdAndUpdate(questionId, {
            $push: {
                answers: newAnswer._id,
            },
        });

        revalidatePath(path);
    } catch (err) {
        console.log("ERROR_ANSWER_QUESTION__:", err);
        throw err;
    }
};

export const fetchAllAnswersToAQuestion = async (
    props: FetchAllAnswersToAQuestionProps
) => {
    try {
        connectToDatabase();

        const {questionId, filter, page = 1, pageSize = 5} = props;

        const currentQuestion = await Question.findById(questionId);

        if (!currentQuestion) {
            throw new Error("Invalid question");
        }

        let sortOptions = {};

        switch (filter) {
            case AnswerFiltersEnums.highestUpvotes:
                sortOptions = {upVotes: -1};
                break;
            case AnswerFiltersEnums.lowestUpvotes:
                sortOptions = {upVotes: 1};
                break;
            case AnswerFiltersEnums.recent:
                sortOptions = {createdAt: -1};
                break;
            case AnswerFiltersEnums.old:
                sortOptions = {createdAt: 1};
                break;

            default:
                sortOptions = {createdAt: -1};
                break;
        }

        const allAnswers = await Answer.find({
            question: questionId,
            isDeleted: false,
        })
            .sort(sortOptions)
            .populate({
                path: "author",
                model: userModel,
                select: "_id clerkId name avatar isDeleted deletedOn"
            }).limit(pageSize).skip((page - 1) * pageSize);


        const totalAnswers = await Answer.countDocuments({question: questionId});

        return {answers: allAnswers, totalAnswers};
    } catch (err) {
        console.log("ERROR_FETCH_ALL_ANSWER_TO_QUESTION__:", err);
        throw err;
    }
};

export const upvoteAnswer = async (
    answerId: string,
    userId: string,
    path: string
) => {
    try {
        connectToDatabase();

        const answer = await Answer.findById(answerId);
        const hasDownvoted = !!answer.downVotes.find((dv: any) =>
            dv.equals(userId)
        );
        const hasUpvoted = !!answer.upVotes.find((up: any) => up.equals(userId));

        const query = {
            $pull: {},
            $addToSet: {},
        };

        if (hasDownvoted) {
            query.$pull = {downVotes: userId};
            query.$addToSet = {upVotes: userId};
        } else if (hasUpvoted) {
            query.$pull = {upVotes: userId};
        } else {
            query.$addToSet = {upVotes: userId};
        }

        await Answer.findByIdAndUpdate(answerId, query);

        revalidatePath(path);
    } catch (err) {
        console.log("ERROR_UPVOTE_ANSWER__:", err);
        throw err;
    }
};

export const downVoteAnswer = async (
    answerId: string,
    userId: string,
    path: string
) => {
    try {
        connectToDatabase();

        const answer = await Answer.findById(answerId);
        const hasDownvoted = !!answer.downVotes.find((dv: any) =>
            dv.equals(userId)
        );
        const hasUpvoted = !!answer.upVotes.find((up: any) => up.equals(userId));

        const query = {
            $pull: {},
            $addToSet: {},
        };

        if (hasUpvoted) {
            query.$pull = {upVotes: userId};
            query.$addToSet = {downVotes: userId};
        } else if (hasDownvoted) {
            query.$pull = {downVotes: userId};
        } else {
            query.$addToSet = {downVotes: userId};
        }

        await Answer.findByIdAndUpdate(answerId, query);

        revalidatePath(path);
    } catch (err) {
        console.log("ERROR_UPVOTE_ANSWER__:", err);
        throw err;
    }
};

export const getUserAnswers = async (params: GetUserItemsWithPagination) => {
    try {
        connectToDatabase();

        const {userId, page = 1, pageSize = 10} = params;

        const totalAnswers = await Answer.countDocuments({
            author: userId,
            isDeleted: false,
        });
        const answersList = await Answer.find({
            author: userId,
            isDeleted: false,
        })
            .sort({upVotes: -1})
            .populate("question", "_id, title")
            .populate("author", "_id name avatar")
            .limit(pageSize)
            .skip((page - 1) * pageSize);

        return {totalAnswers, answersList};
    } catch (err) {
        console.log("ERROR_GET_USER_ANSWERS:", err);
        throw err;
    }
};

export const deleteAnswer = async (params: DeleteAnswerParams) => {
    try {
        connectToDatabase();

        const {answerId, path} = params;

        await Answer.findByIdAndUpdate(answerId, {
            isDeleted: true,
            deletedAt: Date.now(),
        });

        revalidatePath(path);
    } catch (err) {
        console.log("ERROR_DELETE_ANSWER:", err);
        throw err;
    }
};
