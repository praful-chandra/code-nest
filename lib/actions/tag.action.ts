import tagModel from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import {
  FetchAllTagsProps,
  FetchTagByIdProps,
  FetchUserTagsProps,
} from "./shared.types";
import { FilterQuery } from "mongoose";

export const fetchUserTags = async (props: FetchUserTagsProps) => {
  try {
    connectToDatabase();

    const userTags = await tagModel.find().limit(3);

    return userTags;
  } catch (err) {
    console.log("ERROR_FETCH_ALL_USER_TAG_ACTION", err);
    throw err;
  }
};

export const fetchAllTags = async (props: FetchAllTagsProps) => {
  try {
    connectToDatabase();

    const { pageSize = 10, searchQuery } = props;

    const query: FilterQuery<typeof tagModel> = {};

    if (searchQuery) {
      query.$or = [
        {
          name: { $regex: new RegExp(searchQuery, "i") },
        },
      ];
    }

    const allTags = await tagModel.find(query).limit(pageSize);

    return allTags;
  } catch (err) {
    console.log("ERROR_FETCH_ALL_TAGS_ACTION", err);
    throw err;
  }
};

export const fetchTagById = async (props: FetchTagByIdProps) => {
  try {
    connectToDatabase();

    const { tagId } = props;

    const tag = await tagModel.findById(tagId).populate({
      path: "questions",
      options: {
        sort: { createdAt: -1 },
        populate: [{ path: "author" }, { path: "tags" }],
      },
    });

    return tag;
  } catch (err) {
    console.log("ERROR_FETCH_TAG_BY_ID_ACTION", err);
    throw err;
  }
};

export const fetchTagByPartialName = async (partialTagName: string) => {
  try {
    connectToDatabase();

    const tags = await tagModel.find({
      name: { $regex: new RegExp(`^${partialTagName}`, "i") },
    });

    return tags ?? [];
  } catch (err) {
    console.log("ERROR_FETCH_TAG_BY_PARTIAL_NAME_ACTION", err);
    throw err;
  }
};

export const getTopTags = async () => {
  try {
    connectToDatabase();

    const topTags = await tagModel.aggregate([
      {
        $project: { name: 1, numberOfQuestions: { $size: "$questions" } },
      },
      {
        $sort: { numberOfQuestions: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    return topTags;
  } catch (err) {
    console.log("ERROR_FETCH_TOP_TAG_ACTION", err);
    throw err;
  }
};
