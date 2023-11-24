import React from "react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import * as z from "zod";
import { questionFormSchema } from "@/lib/validations";
import { UseFormReturn } from "react-hook-form";
import {
  TextInput,
  WYSWYGInput,
  AsyncSelect,
} from "@/components/shared/formFields";
import { DropdownOption } from "@/types";

type Props = {
  formMethods: UseFormReturn<
    z.infer<typeof questionFormSchema>,
    any,
    undefined
  >;
  onSubmit: (vals: z.infer<typeof questionFormSchema>) => void;
};

const QuestionForm = ({ formMethods, onSubmit }: Props) => {
  const onTagInputChange = async (
    inputVal: string,
    callback: (options: DropdownOption[]) => void
  ) => {
    if (inputVal?.length >= 3) {
      if (inputVal === "dnd") {
        return [];
      }
      // TODO: call API and return the values
      return [{ label: inputVal, value: inputVal }];
    }

    return [];
  };

  const noTagComponent = (inp: { inputValue: string }) => {
    return inp?.inputValue?.length >= 3 ? (
      <Button
        onClick={(e) => {
          e.preventDefault();
          const existingTags = formMethods.getValues("tags");
          formMethods.setValue("tags", [
            ...existingTags,
            { value: "dnd", label: "dnd" },
          ]);
        }}
      >
        {" "}
        {`+ Add ${inp.inputValue}`}{" "}
      </Button>
    ) : (
      "---"
    );
  };

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
        <AsyncSelect
          isMulti
          label="Tags"
          name="tags"
          description="Add up to 5 tags to describe what your question is about. Start typing to see suggestions."
          required
          placeholder="Enter 3 or more characters to search"
          onInputChange={onTagInputChange}
          noOptionComp={noTagComponent}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default QuestionForm;
