import ProfileHeader from "@/components/profile/ProfileHeader";
import { getProfileById } from "@/lib/actions/user.action";
import React from "react";

type ParamsType = {
  id: string;
};

const Page = async ({ params }: { params: ParamsType }) => {
  const { id: profileId } = params;

  const ThisUser = await getProfileById({ userId: profileId });

  return (
    <div>
      <ProfileHeader user={JSON.stringify(ThisUser)} />
    </div>
  );
};

export default Page;
