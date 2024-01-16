"use server";

import Answer from "@/database/answer.model";
import Question from "@/database/question.model";
import userModel from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { answerFormSchema } from "../validations";
import { GetUserItemsWithPagination } from "./shared.types";

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
      data: { answerContent, author, path, questionId },
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

export const fetchAllAnswersToAQuestion = async (questionId: string) => {
  try {
    connectToDatabase();

    const currentQuestion = await Question.findById(questionId);

    if (!currentQuestion) {
      throw new Error("Invalid question");
    }

    const allAnswers = await Answer.find({ question: questionId })
      .sort({
        createdAt: -1,
      })
      .populate({
        path: "author",
        model: userModel,
        select: "_id clerkId name avatar isDeleted deletedOn",
      });

    return { answers: allAnswers };
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
      query.$pull = { downVotes: userId };
      query.$addToSet = { upVotes: userId };
    } else if (hasUpvoted) {
      query.$pull = { upVotes: userId };
    } else {
      query.$addToSet = { upVotes: userId };
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
      query.$pull = { upVotes: userId };
      query.$addToSet = { downVotes: userId };
    } else if (hasDownvoted) {
      query.$pull = { downVotes: userId };
    } else {
      query.$addToSet = { downVotes: userId };
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

    const { userId, page = 1, pageSize = 10 } = params;

    const totalAnswers = await Answer.countDocuments({ author: userId });
    const answersList = await Answer.find({
      author: userId,
    })
      .sort({ upVotes: -1 })
      .populate("question", "_id, title")
      .populate("author", "_id name avatar")
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    return { totalAnswers, answersList };
  } catch (err) {
    console.log("ERROR_GET_USER_ANSWERS:", err);
    throw err;
  }
};
