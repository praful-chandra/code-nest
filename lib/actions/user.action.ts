"use server";

import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";
import {
  CreateUserParams,
  FetchAllUserProps,
  SaveQuestionProps,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";

export async function getUserById(params: { userId: string }) {
  try {
    connectToDatabase();

    const { userId } = params;

    const currentUser = await User.findOne({
      clerkId: userId,
      isDeleted: false,
    });

    return currentUser;
  } catch (err) {
    console.log("ERROR_GET_USER_BY_ID_ACTION", err);
    throw err;
  }
}

export async function createUser(params: CreateUserParams) {
  try {
    connectToDatabase();

    const newUser = await User.create(params);

    return newUser;
  } catch (err) {
    console.log("ERROR_CREATE_USER_ACTION", err);
    throw err;
  }
}

export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, path, updateData } = params;

    const updatedUser = await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });

    revalidatePath(path);

    return updatedUser;
  } catch (err) {
    console.log("ERROR_UPDATE_USER_ACTION", err);
    throw err;
  }
}
export async function deleteUser(clerkId: string) {
  try {
    connectToDatabase();

    const deletedUser = await User.findOneAndUpdate(
      { clerkId },
      {
        isDeleted: true,
        deletedOn: Date.now(),
        avatar: "/assets/images/defaultUser.png",
      },
      {
        new: true,
      }
    );

    if (!deletedUser) {
      throw new Error("User not found");
    }
    return deletedUser;
  } catch (err) {
    console.log("ERROR_DELETE_USER_ACTION", err);
    throw err;
  }
}

export const fetchAllUser = async (props: FetchAllUserProps) => {
  try {
    connectToDatabase();

    const { pageSize = 10 } = props;

    const allUsers = await User.find({ createdAt: -1, isDeleted: false }).limit(
      pageSize
    );

    return allUsers;
  } catch (err) {
    console.log("ERROR_FETCH_ALL_USER_ACTION", err);
    throw err;
  }
};

export const saveQuestion = async (props: SaveQuestionProps) => {
  try {
    connectToDatabase();

    const { path, questionId, userId } = props;

    const question = await Question.findById(questionId);
    const user = await User.findById(userId);

    if (!question) {
      throw new Error("Invalid Question Id");
    }

    if (!user) {
      throw new Error("Error Occured!");
    }

    const isQuestionAlreadySaved = !!user.questions.find((q: any) =>
      q.equals(questionId)
    );

    const query = {
      $pull: {},
      $addToSet: {},
    };

    if (isQuestionAlreadySaved) {
      query.$pull = {
        questions: questionId,
      };
    } else {
      query.$addToSet = {
        questions: questionId,
      };
    }
    await User.findByIdAndUpdate(userId, query);

    revalidatePath(path);
  } catch (err) {
    console.log("ERROR_FETCH_ALL_USER_ACTION", err);
    throw err;
  }
};
