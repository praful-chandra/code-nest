import { IUser } from "@/database/user.model";

export interface GetQuestionsParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
}

export interface CreateUserParams {
  clerkId: string;
  name: string;
  userName: string;
  email: string;
  avatar: string;
}

export interface UpdateUserParams {
  clerkId: string;
  updateData: Partial<IUser>;
  path: string;
}

export interface FetchAllUserProps {
  page?: number;
  pageSize?: number;
  flter?: string;
  searchQuery?: string;
}
export interface FetchAllTagsProps {
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface FetchUserTagsProps {
  userId?: string;
}

export interface GetQuestionByIdParams {
  questionId: string;
}

export interface SaveQuestionProps {
  userId: string;
  questionId: string;
  path: string;
}

export interface FetchAllUserSavedQuestionsProps {
  userId: string;
  page?: number;
  pageSize?: number;
  filter?: string;
  searchQuery?: string;
}

export interface ViewQuestionParams {
  userId: string | undefined;
  questionId: string;
}

export interface FetchTagByIdProps {
  tagId: string;
  searchQuery?: string;
}

export interface GetProfileByIdProps {
  userId: string;
}

export interface GetUserItemsWithPagination {
  userId: string;
  page?: number;
  pageSize?: number;
}

export interface DeleteAnswerParams {
  answerId: string;
  path: string;
}
export interface DeleteQuestionProps {
  questionId: string;
  path: string;
}

export interface EditQuestionProps {
  questionId: string;
  thisAuthor: string;
  title: string;
  content: string;
  newTags: string[];
  oldTags: string[];
}
