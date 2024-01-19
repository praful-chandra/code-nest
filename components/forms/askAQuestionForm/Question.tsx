"use client";
import React, { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { questionFormSchema } from "@/lib/validations";
import QuestionForm from "./Form";
import { createQuestion, editQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";
import { QuestionType } from "@/types/primitive";
import { EditQuestionProps } from "@/lib/actions/shared.types";

type Props = {
  currentProfile: string;
  editMode?: boolean;
  existingData?: string;
};

const Question = ({
  currentProfile,
  editMode = false,
  existingData,
}: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const existingQuestionData: QuestionType = JSON.parse(existingData ?? "");

  const onSubmit = async (vals: z.infer<typeof questionFormSchema>) => {
    if (!editMode) {
      await createQuestion(vals);
      return router.push("/");
    }
    const editPayload: EditQuestionProps = {
      questionId: existingQuestionData?._id ?? "",
      title: vals?.title,
      content: vals?.description,
      thisAuthor: JSON.parse(currentProfile)?._id ?? "",
      newTags: vals?.tags?.map((t) => t.value),
      oldTags: existingQuestionData?.tags?.map((t) => t.name) ?? "",
    };

    await editQuestion(editPayload);
    return router.push("/");
  };

  const questionForm = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      author: JSON.parse(currentProfile),
      path: pathname,
    },
    reValidateMode: "onBlur",
    mode: "all",
  });

  const idWatcher = questionForm.watch("_id");

  useEffect(() => {
    if (
      !idWatcher &&
      editMode &&
      existingQuestionData?._id &&
      idWatcher !== existingQuestionData?._id
    ) {
      questionForm.reset({
        ...questionForm.getValues(),
        _id: existingQuestionData?._id ?? "",
        description: existingQuestionData?.content ?? "",
        tags: existingQuestionData?.tags?.map((t) => ({
          label: t.name,
          value: t.name,
        })),
        title: existingQuestionData?.title,
      });
    }
  }, [editMode, existingQuestionData, idWatcher, questionForm]);

  return (
    <div>
      <QuestionForm formMethods={questionForm} onSubmit={onSubmit} />
    </div>
  );
};

export default Question;
