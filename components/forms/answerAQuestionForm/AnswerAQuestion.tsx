"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import AnswerForm from "./Form";
import * as z from "zod";
import { answerFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import { answerQuestion } from "@/lib/actions/answer.action";

type answerFormType = z.infer<typeof answerFormSchema>;

type AnswerPropsType = {
  questionId: string;
  currentProfile: string;
};

const AnswerAQuestionForm = ({
  questionId,
  currentProfile,
}: AnswerPropsType) => {
  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();

  const answerFormMethods = useForm<answerFormType>({
    resolver: zodResolver(answerFormSchema),
    defaultValues: {
      answerContent: "",
      questionId,
      path: pathname,
      author: JSON.parse(currentProfile),
    },
    reValidateMode: "onBlur",
    mode: "all",
  });

  const onSubmit = (vals: answerFormType) => {
    setIsLoading(true);
    answerQuestion(vals)
      .then(() => {
        answerFormMethods.reset();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AnswerForm
      answerFormMethods={answerFormMethods}
      onSubmit={onSubmit}
      isLoading={isLoading}
    />
  );
};

export default AnswerAQuestionForm;
