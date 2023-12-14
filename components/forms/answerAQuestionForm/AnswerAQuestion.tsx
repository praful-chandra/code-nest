"use client";

import React from "react";
import { useForm } from "react-hook-form";
import AnswerForm from "./Form";
import * as z from "zod";
import { answerFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";

type answerFormType = z.infer<typeof answerFormSchema>;

type AnswerPropsType = {
  questionId: string;
};

const AnswerAQuestionForm = ({ questionId }: AnswerPropsType) => {
  const answerFormMethods = useForm<answerFormType>({
    resolver: zodResolver(answerFormSchema),
    defaultValues: {
      answer: "",
      questionId,
    },
    reValidateMode: "onBlur",
    mode: "all",
  });

  const onSubmit = (vals: answerFormType) => {
    console.log({ vals });
  };

  return (
    <AnswerForm answerFormMethods={answerFormMethods} onSubmit={onSubmit} />
  );
};

export default AnswerAQuestionForm;
