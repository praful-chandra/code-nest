import React from "react";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { answerFormSchema } from "@/lib/validations";
import { UseFormReturn } from "react-hook-form";
import { WYSWYGInput } from "@/components/shared/formFields";
import { Button } from "@/components/ui/button";

type answerFormType = z.infer<typeof answerFormSchema>;

type FormPropsType = {
  answerFormMethods: UseFormReturn<answerFormType>;
  onSubmit: (vals: answerFormType) => void;
};

const AnswerForm = ({ answerFormMethods, onSubmit }: FormPropsType) => {
  return (
    <Form {...answerFormMethods}>
      <form
        onSubmit={answerFormMethods.handleSubmit(onSubmit)}
        className="space-y-8"
      >
        <p className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </p>

        <WYSWYGInput label="" name="answer" />

        <div className="flex w-full items-center justify-end">
          <Button
            className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900 "
            type="submit"
          >
            Post Answer
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AnswerForm;
