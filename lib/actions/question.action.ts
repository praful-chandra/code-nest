"use server";

import Question from "@/database/question.model";
import tagModel from "@/database/tag.model";
import userModel from "@/database/user.model";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";
import { questionFormSchema } from "../validations";
import {
  DeleteQuestionProps,
  EditQuestionProps,
  GetQuestionByIdParams,
  GetQuestionsParams,
  GetUserItemsWithPagination,
} from "./shared.types";
import Answer from "@/database/answer.model";
import { FilterQuery } from "mongoose";
import { HomePageFiltersEnums } from "@/constants/filters";

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

    const { searchQuery, filter } = params;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        {
          title: { $regex: new RegExp(searchQuery, "i") },
          content: { $regex: new RegExp(searchQuery, "i") },
        },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case HomePageFiltersEnums.newest:
        sortOptions = { createdAt: -1 };
        break;
      case HomePageFiltersEnums.frequent:
        sortOptions = { views: -1 };
        break;
      case HomePageFiltersEnums.unanswered:
        query.answers = { $size: 0 };
        break;

      default:
        break;
    }

    query.$and = [
      ...(query?.$and ?? []),
      {
        isDeleted: false,
      },
    ];

    const questions = await Question.find(query)
      .populate({
        path: "tags",
        model: tagModel,
      })
      .populate({ path: "author", model: userModel })
      .sort(sortOptions);

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

    if (question.isDeleted === false) {
      return question;
    }

    return null;
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

export const getUserQuestions = async (params: GetUserItemsWithPagination) => {
  try {
    connectToDatabase();

    const { userId, page = 1, pageSize = 10 } = params;

    const totalQuestions = await Question.countDocuments({
      author: userId,
      isDeleted: false,
    });
    const questionsList = await Question.find({
      author: userId,
      isDeleted: false,
    })
      .sort({ views: -1 })
      .populate({
        path: "tags",
        model: tagModel,
      })
      .populate({ path: "author", model: userModel })
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    return { totalQuestions, questionsList };
  } catch (err) {
    console.log("ERROR_GET_USER_QUESTIONS:", err);
    throw err;
  }
};

export const deleteQuestion = async (params: DeleteQuestionProps) => {
  try {
    connectToDatabase();

    const { questionId, path } = params;

    await Question.findByIdAndUpdate(
      questionId,
      {
        isDeleted: true,
        deletedAt: Date.now(),
      },
      { new: true }
    );

    await Answer.updateMany(
      { question: questionId },
      { isDeleted: true, deletedAt: Date.now() }
    );

    revalidatePath(path);
  } catch (err) {
    console.log("ERROR_DELETE_QUESTION:", err);
    throw err;
  }
};

export const editQuestion = async (params: EditQuestionProps) => {
  try {
    connectToDatabase();

    const { questionId, thisAuthor, content, title, newTags, oldTags } = params;

    const deletedTags = oldTags.filter((ot) => !newTags.includes(ot));

    for (const dTags of deletedTags) {
      await tagModel.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${dTags}$`, "i") } },
        { $pull: { questions: questionId } },
        { new: true }
      );
    }

    const tagDocuments = [];

    // create or get existing tag
    for (const tag of newTags) {
      const existingTag = await tagModel.findOneAndUpdate(
        { name: { $regex: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $addToSet: { questions: questionId } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findOneAndUpdate(
      { _id: questionId, author: thisAuthor },
      {
        title,
        content,
        tags: tagDocuments,
        isEdited: true,
        editedAt: Date.now(),
      }
    );
  } catch (err) {
    console.log("ERROR_DELETE_QUESTION:", err);
    throw err;
  }
};

export const getTopQuestions = async () => {
  try {
    connectToDatabase();

    const topQuestions = await Question.find({})
      .sort({
        views: -1,
        upVotes: -1,
      })
      .limit(5);

    return topQuestions;
  } catch (err) {
    console.log("ERROR_FETCH_TOP_QUESTIONS:", err);
    throw err;
  }
};
