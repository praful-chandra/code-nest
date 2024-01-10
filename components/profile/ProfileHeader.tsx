import React from "react";
import Image from "next/image";
import Information from "../shared/Information";
import { Button } from "../ui/button";
import { UserType } from "@/types/primitive";
import { getMonthAndYear } from "@/lib/utils";
import { getCurrentProfile } from "@/lib/currentProfile";

type ProfileHeaderProps = {
  user: string;
};

const ProfileHeader = async ({ user }: ProfileHeaderProps) => {
  const currentProfile = await getCurrentProfile();
  const thisUser: UserType = JSON.parse(user).profile;

  return (
    <div className="flex flex-wrap">
      <div className="">
        <Image
          src={
            thisUser?.avatar && !thisUser?.isDeleted
              ? thisUser?.avatar
              : "/assets/images/defaultUser.png"
          }
          width="140"
          height="140"
          alt="user avatar"
          className="rounded-full"
        />
      </div>
      <div className="ml-5 mt-3 flex-1">
        <h1 className="h1-bold">{thisUser?.name}</h1>
        <p className="paragraph-regular">@{thisUser?.userName}</p>
        <div className="mt-5 flex flex-wrap [&>div]:mr-5">
          {thisUser?.portfolioWebsite && (
            <Information
              image="/assets/icons/link.svg"
              text={`https://${thisUser?.portfolioWebsite}`}
              linkText={thisUser?.portfolioWebsite}
              type="link"
            />
          )}
          {thisUser?.location && (
            <Information
              image="/assets/icons/location.svg"
              text={thisUser?.location}
            />
          )}
          <Information
            image="/assets/icons/callender.svg"
            text={`Joined ${getMonthAndYear(new Date(thisUser?.joinedDate))}`}
          />
        </div>
        {thisUser?.bio && <p className="mt-5">{thisUser?.bio}</p>}
      </div>
      {thisUser?._id === String(currentProfile?._id) && (
        <div className="ml-3 mt-3">
          <Button className="paragraph-medium bg-light-800 px-10 py-3">
            Edit Profile
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProfileHeader;
