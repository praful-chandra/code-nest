import ProfileContent from "@/components/profile/ProfileContent";
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
            bronze: 234,
            gold: 23423,
            silver: 54523,
          },
        }}
      />
      <ProfileContent className="mt-10" user={JSON.stringify(profile)} />
    </div>
  );
};

export default Page;
