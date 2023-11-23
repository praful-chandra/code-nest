"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { questionFormSchema } from "../validations";
import tagModel from "@/database/tag.model";

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
      data: { description, tags, title, author },
    } = validationResult;

    const newQuestion = await Question.create({
      title,
      content: description,
      author,
    });

    const tagDocuments = [];

    // create or get existing tag
    for (const tag of tags) {
      const existingTag = await tagModel.findOneAndUpdate(
        { name: { $regx: new RegExp(`^${tag}$`, "i") } },
        { $setOnInsert: { name: tag }, $push: { question: newQuestion._id } },
        { upsert: true, new: true }
      );
      tagDocuments.push(existingTag._id);
    }

    await Question.findByIdAndUpdate(newQuestion._id, {
      $push: {
        tags: { $each: tagDocuments },
      },
    });
  } catch (err) {
    console.log("ERROR_CREATE_QUESTION__:", err);
  }
}
