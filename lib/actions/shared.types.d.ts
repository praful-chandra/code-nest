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
