import React from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { questionFormSchema } from "@/lib/validations";
import { UseFormReturn } from "react-hook-form";
import {
  TextInput,
  WYSWYGInput,
  MultiSelect,
} from "@/components/shared/formFields";

type Props = {
  formMethods: UseFormReturn<
    z.infer<typeof questionFormSchema>,
    any,
    undefined
  >;
  onSubmit: (vals: z.infer<typeof questionFormSchema>) => void;
};

const QuestionForm = ({ formMethods, onSubmit }: Props) => {
  return (
    <Form {...formMethods}>
      <form onSubmit={formMethods.handleSubmit(onSubmit)} className="space-y-8">
        <TextInput
          label="Question Title"
          name="title"
          description="Be specific and imagine you’re asking a question to another person."
          required
        />
        <WYSWYGInput
          label="Detailed explanation of your problem?"
          name="description"
          description="Introduce the problem and expand on what you put in the title. Minimum 20 characters."
          required
        />
        <MultiSelect
          label="Tags"
          name="tags"
          description="Add up to 5 tags to describe what your question is about. Start typing to see suggestions."
          required
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
