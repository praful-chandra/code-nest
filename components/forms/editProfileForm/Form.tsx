import { editProfileFormSchema } from "@/lib/validations";
import React from "react";
import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { Form } from "@/components/ui/form";
import { TextArea, TextInput } from "@/components/shared/formFields";
import { Button } from "@/components/ui/button";

type editProfileFormType = z.infer<typeof editProfileFormSchema>;

type FormPropsType = {
  editProfileFormMethods: UseFormReturn<editProfileFormType>;
  onSubmit: (vals: editProfileFormType) => void;
  isLoading: boolean;
};

const EditForm = ({
  editProfileFormMethods,
  isLoading,
  onSubmit,
}: FormPropsType) => {
  return (
    <Form {...editProfileFormMethods}>
      <form
        onSubmit={editProfileFormMethods.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <TextInput name="name" label="Your Name" required />
        <TextInput name="userName" label="Your UserName" required />
        <TextInput name="portfolioWebsite" label="Your Portfolio Link" />
        <TextInput name="location" label="Your Location" />
        <TextArea name="bio" label="Your Bio" />

        <div className="flex w-full items-center justify-start">
          <Button
            className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 "
            type="submit"
            disabled={isLoading || !editProfileFormMethods.formState.isValid}
          >
            {isLoading ? "Saving...." : "Save Profile"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default EditForm;
