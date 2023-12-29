"use server";

import Question from "@/database/question.model";
import tagModel from "@/database/tag.model";
import userModel from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { questionFormSchema } from "../validations";
import { GetQuestionByIdParams, GetQuestionsParams } from "./shared.types";

export async function createQuestion(newQuestionData: unknown) {
  try {
    connectToDatabase();

    const validationResult = questionFormSchema.safeParse(newQuestionData);

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
      data: { description, tags, title, author, path },
    } = validationResult;

    const newQuestion = await Question.create({
      title,
      content: description,
      author,
    });

    await userModel.findByIdAndUpdate(author, {
      $push: { questions: newQuestion._id },
    });

    const tagDocuments = [];

    // create or get existing tag
    for (const tag of tags) {
      const t = tag.value;
      const existingTag = await tagModel.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${t}$`, "i") } },
        { $setOnInsert: { name: t }, $push: { questions: newQuestion._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(newQuestion._id, {
      $push: {
        tags: { $each: tagDocuments },
      },
    });

    revalidatePath(path);
  } catch (err) {
    console.log("ERROR_CREATE_QUESTION__:", err);
    throw err;
  }
}

export async function getQuestions(params: GetQuestionsParams) {
  try {
    connectToDatabase();

    const questions = await Question.find({})
      .populate({
        path: "tags",
        model: tagModel,
      })
      .populate({ path: "author", model: userModel })
      .sort({ createdAt: -1 });

    return { questions };
  } catch (err) {
    console.log("ERROR_GET_QUESTIONS:", err);
    throw err;
  }
}

export const getQuestionById = async (params: GetQuestionByIdParams) => {
  try {
    connectToDatabase();

    const question = await Question.findById(params.questionId)
      .populate("author")
      .populate("tags");

    return question;
  } catch (err) {
    console.log("ERROR_GET_QUESTION_BY_ID_ACTION", err);
    throw err;
  }
};

export const toggleUpvote = async (
  questionId: string,
  userId: string,
  path: string
) => {
  try {
    connectToDatabase();

    const question = await Question.findById(questionId);

    const hasDownvoted = !!question.downVotes.find((dv: any) =>
      dv.equals(userId)
    );
    const hasUpvoted = !!question.upVotes.find((up: any) => up.equals(userId));

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

    await Question.findByIdAndUpdate(questionId, query);

    revalidatePath(path);
  } catch (err) {
    console.log("ERROR_TOGGLE_UPVOTE_QUESTION__:", err);
    throw err;
  }
};

export const toggleDownvote = async (
  questionId: string,
  userId: string,
  path: string
) => {
  try {
    connectToDatabase();

    const question = await Question.findById(questionId);

    const hasDownvoted = !!question.downVotes.find((dv: any) =>
      dv.equals(userId)
    );
    const hasUpvoted = !!question.upVotes.find((up: any) => up.equals(userId));

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

    await Question.findByIdAndUpdate(questionId, query);

    revalidatePath(path);
  } catch (err) {
    console.log("ERROR_TOGGLE_UPVOTE_QUESTION__:", err);
    throw err;
  }
};
