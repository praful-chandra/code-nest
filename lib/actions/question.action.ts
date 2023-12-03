"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { questionFormSchema } from "../validations";
import tagModel from "@/database/tag.model";
import { GetQuestionsParams } from "./shared.types";
import userModel from "@/database/user.model";
import { revalidatePath } from "next/cache";

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
