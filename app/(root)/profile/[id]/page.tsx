import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileStats from "@/components/profile/ProfileStats";
import { getProfileById } from "@/lib/actions/user.action";
import React from "react";

type ParamsType = {
  id: string;
};

const Page = async ({ params }: { params: ParamsType }) => {
  const { id: profileId } = params;

  const { profile, totalAnswers, totalQuestions } = await getProfileById({
    userId: profileId,
  });

  return (
    <div>
      <ProfileHeader user={JSON.stringify(profile)} />
      <ProfileStats
        wrapperClassName="mt-10"
        stats={{
          totalAnswers,
          totalQuestions,
          badges: {
            bronze: 0,
            gold: 0,
            silver: 0,
          },
        }}
      />
    </div>
  );
};

export default Page;
