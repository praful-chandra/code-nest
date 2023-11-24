"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { questionFormSchema } from "@/lib/validations";
import QuestionForm from "./Form";
import { createQuestion } from "@/lib/actions/question.action";

type Props = {
  currentProfile: string;
};

const Question = ({ currentProfile }: Props) => {
  const onSubmit = (vals: z.infer<typeof questionFormSchema>) => {
    createQuestion(vals);
  };

  const questionForm = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      author: JSON.parse(currentProfile),
    },
    reValidateMode: "onBlur",
    mode: "all",
  });

  return (
    <div>
      <QuestionForm formMethods={questionForm} onSubmit={onSubmit} />
    </div>
  );
};

export default Question;
