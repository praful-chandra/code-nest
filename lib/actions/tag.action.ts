import tagModel from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import { FetchUserTagsProps } from "./shared.types";

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
