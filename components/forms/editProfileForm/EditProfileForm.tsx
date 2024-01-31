"use client";

import { IUser } from "@/database/user.model";
import { editProfileFormSchema } from "@/lib/validations";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Form from "./Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateUserParams } from "@/lib/actions/shared.types";
import { updateUser } from "@/lib/actions/user.action";
import { useRouter } from "next/navigation";

type EditProfileFormProps = {
  user: string;
};

type editProfileFormType = z.infer<typeof editProfileFormSchema>;

const EditProfileForm = ({ user }: EditProfileFormProps) => {
  const [isFormLoading, setIsFormLoading] = useState(false);
  const router = useRouter();

  const currentUser = JSON.parse(user) as IUser;

  const editProfileFormMethods = useForm<editProfileFormType>({
    defaultValues: {
      name: currentUser?.name ?? "",
      userName: currentUser?.userName ?? "",
      bio: currentUser?.bio ?? "",
      location: currentUser?.location ?? "",
      portfolioWebsite: currentUser?.portfolioWebsite ?? "",
      clerkId: currentUser?.clerkId ?? "",
      path: `/profile/${currentUser?._id}`,
    },
    reValidateMode: "onBlur",
    mode: "all",
    resolver: zodResolver(editProfileFormSchema),
  });

  const handleFormSubmit = (vals: editProfileFormType) => {
    setIsFormLoading(true);

    const valsCopy: Record<string, any> = { ...vals };

    delete valsCopy.clerkId;
    delete valsCopy.path;

    const payload: UpdateUserParams = {
      clerkId: vals.clerkId,
      path: vals.path,
      updateData: valsCopy,
    };

    updateUser(payload)
      .then(() => {
        router.replace(`/profile/${currentUser?._id}`);
      })
      .catch(() => {})
      .finally(() => {
        setIsFormLoading(false);
      });
  };

  return (
    <Form
      editProfileFormMethods={editProfileFormMethods}
      isLoading={isFormLoading}
      onSubmit={handleFormSubmit}
    />
  );
};

export default EditProfileForm;
