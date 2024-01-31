import { EditProfileForm } from "@/components/forms/editProfileForm";
import { getCurrentProfile } from "@/lib/currentProfile";
import React from "react";

const ProfileEditPage = async () => {
  const currentProfile = await getCurrentProfile();

  return (
    <>
      <EditProfileForm user={JSON.stringify(currentProfile)} />
    </>
  );
};

export default ProfileEditPage;
