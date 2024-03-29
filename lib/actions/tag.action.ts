import tagModel from "@/database/tag.model";
import { connectToDatabase } from "../mongoose";
import {
  FetchAllTagsProps,
  FetchTagByIdProps,
  FetchUserTagsProps,
} from "./shared.types";
import mongoose, { FilterQuery } from "mongoose";
import Question from "@/database/question.model";
import { TagFiltersEnums } from "@/constants/filters";

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

    const { pageSize = 9, page = 1, searchQuery, filter } = props;

    const query: FilterQuery<typeof tagModel> = {};

    if (searchQuery) {
      query.$or = [
        {
          name: { $regex: new RegExp(searchQuery, "i") },
        },
      ];
    }

    let sortOptions = {};

    switch (filter) {
      case TagFiltersEnums.popular:
        sortOptions = { questions: -1 };
        break;
      case TagFiltersEnums.name:
        sortOptions = { name: 1 };
        break;
      case TagFiltersEnums.old:
        sortOptions = { createdAt: 1 };
        break;
      case TagFiltersEnums.recent:
        sortOptions = { createdAt: -1 };
        break;
      default:
        break;
    }

    const allTags = await tagModel
      .find(query)
      .limit(pageSize)
      .skip((page - 1) * pageSize)
      .sort(sortOptions);

    const totalCountTags = await tagModel.countDocuments(query);

    return { allTags, totalCountTags };
  } catch (err) {
    console.log("ERROR_FETCH_ALL_TAGS_ACTION", err);
    throw err;
  }
};

export const fetchTagById = async (props: FetchTagByIdProps) => {
  try {
    connectToDatabase();

    const { tagId, searchQuery,page = 1,pageSize = 5 } = props;

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

    const tag = await tagModel.findById(tagId).populate({
      path: "questions",
      match: query,
      options: {
        sort: { createdAt: -1 },
        populate: [{ path: "author" }, { path: "tags" }],
        limit: pageSize,
        skip: (page - 1) * pageSize,
      },
    });

    const totalTags = await tagModel.aggregate([
      {
        $match: {_id: new mongoose.Types.ObjectId(tagId)},

      },
      {
        $project: {
          numberOfQuestions: {$size: '$questions',}
        }
      }
    ])

    return {tag, totalTags: totalTags[0].numberOfQuestions};
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
