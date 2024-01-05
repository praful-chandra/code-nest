"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export async function viewQuestion(params: ViewQuestionParams) {
  try {
    connectToDatabase();

    const { questionId, userId } = params;

    await Question.findByIdAndUpdate(questionId, {
      $inc: { views: 1 },
    });

    if (userId) {
      const query = {
        userId,
        question: questionId,
        actionType: "view",
      };

      const existingInteraction = await Interaction.findOne(query);
      if (!existingInteraction) {
        await Interaction.create(query);
      }
    }
  } catch (err) {
    console.log("ERROR_VIEW_QUESTION__:", err);
    throw err;
  }
}
