"use server";

import { FilterQuery } from "mongoose";
import { connectToDatabase } from "../mongoose";
import User from "@/database/user.model";
import {
  CreateUserParams,
  FetchAllUserProps,
  FetchAllUserSavedQuestionsProps,
  GetProfileByIdProps,
  SaveQuestionProps,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import Question from "@/database/question.model";
import tagModel from "@/database/tag.model";
import Answer from "@/database/answer.model";
import {
  CommunityFiltersEnums,
  HomePageFiltersEnums,
} from "@/constants/filters";
import console from "console";

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

    const { pageSize = 6, page = 1, searchQuery, filter } = props;

    const query: FilterQuery<typeof User> = {};

    if (searchQuery) {
      query.$or = [
        {
          name: { $regex: new RegExp(searchQuery, "i") },
          userName: { $regex: new RegExp(searchQuery, "i") },
        },
      ];
    }

    query.$and = [
      {
        isDeleted: false,
      },
    ];

    let sortOptions = {};

    switch (filter) {
      case CommunityFiltersEnums.new_users:
        sortOptions = { joinedDate: -1 };
        break;
      case CommunityFiltersEnums.old_users:
        sortOptions = { joinedDate: 1 };
        break;
      case CommunityFiltersEnums.top_contributors:
        sortOptions = { reputation: -1 };
        break;
      default:
        break;
    }

    const allUsers = await User.find(query)
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .sort(sortOptions);

    const totalCountUser = await User.countDocuments(query);

    return { allUsers, totalCountUser };
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

export const fetchAllUserSavedQuestions = async (
  params: FetchAllUserSavedQuestionsProps
) => {
  try {
    connectToDatabase();

    const { userId, searchQuery, filter, pageSize = 5, page = 1 } = params;

    const query: FilterQuery<typeof Question> = {};

    if (searchQuery) {
      query.$or = [
        {
          title: { $regex: new RegExp(searchQuery, "i") },
          content: { $regex: new RegExp(searchQuery, "i") },
        },
      ];
    }

    query.$and = [
      {
        isDeleted: false,
      },
    ];

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

    const currentUser = await User.findById(userId).populate({
      path: "questions",
      match: query,
      options: {
        limit: pageSize,
        skip: (page - 1) * pageSize,
        sort: sortOptions,
      },
      populate: [
        { path: "tags", model: tagModel, select: "_id name" },
        {
          path: "author",
          model: User,
          select: "_id clerkId name avatar",
        },
      ],
    });

    const totalQuestions = await User.findById(userId).countDocuments({
      path: "questions",
    });

    if (!currentUser) {
      throw new Error("Some error occured!.");
    }

    const savedQuestions = currentUser.questions;

    return { questions: savedQuestions, totalQuestions };
  } catch (err) {
    console.log("ERROR_FETCH_ALL_USER_SAVED_QUESTION_ACTION", err);
    throw err;
  }
};

export const getProfileById = async (props: GetProfileByIdProps) => {
  try {
    connectToDatabase();
    const { userId } = props;

    const profile = await User.findById(userId);
    const totalQuestions = await Question.countDocuments({
      author: profile._id,
      isDeleted: false,
    });
    const totalAnswers = await Answer.countDocuments({
      author: profile._id,
      isDeleted: false,
    });

    profile.clerkId = null;
    profile.email = null;

    return { profile, totalAnswers, totalQuestions };
  } catch (err) {
    console.log("ERROR_GET_PROFILE_BY_ID_ACTION", err);
    throw err;
  }
};
