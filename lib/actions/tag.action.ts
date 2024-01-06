import tagModel from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import {
  FetchAllTagsProps,
  FetchTagByIdProps,
  FetchUserTagsProps,
} from "./shared.types";

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

    const { pageSize = 10 } = props;

    const allTags = await tagModel.find().limit(pageSize);

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
