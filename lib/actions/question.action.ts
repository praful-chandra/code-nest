"use server";

import { connectToDatabase } from "../mongoose";

export async function createQuestion() {
  try {
    connectToDatabase();
  } catch (err) {
    console.log("ERROR_CREATE_QUESTION__:", err);
  }
}
