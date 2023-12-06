import tagModel from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { FetchAllTagsProps, FetchUserTagsProps } from "./shared.types";

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
