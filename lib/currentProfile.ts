"use server";

import { auth } from "@clerk/nextjs";
import { getUserById } from "./actions/user.action";
import { IUser } from "@/database/user.model";

export const getCurrentProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    return null;
  }

  const userProfile = (await getUserById({ userId })) as IUser;

  return userProfile;
};
