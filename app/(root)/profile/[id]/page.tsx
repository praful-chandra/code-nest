import ProfileHeader from "@/components/profile/ProfileHeader";
import { getUserById } from "@/lib/actions/user.action";
import React from "react";

type ParamsType = {
  id: string;
};

const Page = async ({ params }: { params: ParamsType }) => {
  const { id: profileId } = params;

  const currentUser = await getUserById({ userId: profileId });

  console.log(JSON.stringify(currentUser));

  return (
    <div>
      <ProfileHeader />
    </div>
  );
};

export default Page;
