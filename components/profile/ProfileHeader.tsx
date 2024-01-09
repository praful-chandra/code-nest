import React from "react";
import Image from "next/image";
import Information from "../shared/Information";
import { Button } from "../ui/button";

const ProfileHeader = () => {
  return (
    <div className="flex flex-wrap">
      <div className="">
        <Image
          src="/assets/images/defaultUser.png"
          width="140"
          height="140"
          alt="user avatar"
          className="aspect-square"
        />
      </div>
      <div className="ml-5 mt-3 flex-1">
        <h1 className="h1-bold">JavaScript Mastery</h1>
        <p className="paragraph-regular">@jsmasterypro</p>
        <div className="mt-5 flex flex-wrap [&>div]:mr-5">
          <Information
            image="/assets/icons/link.svg"
            text="https://jsmastery.pro"
            linkText="jsmastery.pro"
            type="link"
          />
          <Information
            image="/assets/icons/location.svg"
            text="Mumbai, India"
          />
          <Information
            image="/assets/icons/callender.svg"
            text="Joined May 2023"
          />
        </div>
        <p className="mt-5">
          Launch your development career with project-based coaching - showcase
          your skills with practical development experience and land the coding
          career of your dreams. Check out jsmastery.pro
        </p>
      </div>
      <div className="ml-3 mt-3">
        <Button className="paragraph-medium bg-light-800 px-10 py-3">
          Edit Profile
        </Button>
      </div>
    </div>
  );
};

export default ProfileHeader;
