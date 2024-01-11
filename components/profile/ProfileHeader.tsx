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
  const thisUser: UserType = JSON.parse(user);

  return (
    <div className="flex-center flex-col flex-wrap md:flex-row md:items-start">
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
      <div className="flex-center ml-5 mt-3 flex-1 flex-col md:flex-row md:items-start">
        <div className="flex-1">
          <h1 className="h1-bold text-dark100_light900 text-center md:text-left">
            {thisUser?.name}
          </h1>
          <p className="paragraph-regular text-dark200_light800 text-center md:text-left">
            @{thisUser?.userName}
          </p>
          <div className="flex-center mt-5 flex-wrap md:items-start md:justify-start [&>div]:mr-5">
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
          {thisUser?.bio && (
            <p className="text-dark300_light800 mt-5 text-center md:text-left">
              {thisUser?.bio}
            </p>
          )}
        </div>
        {thisUser?._id === String(currentProfile?._id) && (
          <div className="mt-5 md:mt-0">
            <Button className="paragraph-medium background-light800_dark400 text-dark300_light900 px-10 py-3">
              Edit Profile
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileHeader;
