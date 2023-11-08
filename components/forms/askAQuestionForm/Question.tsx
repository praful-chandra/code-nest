"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { questionFormSchema } from "@/lib/validations";
import QuestionForm from "./Form";

const Question = () => {
  const onSubmit = (vals: z.infer<typeof questionFormSchema>) => {
    console.log(vals);
  };

  const questionForm = useForm<z.infer<typeof questionFormSchema>>({
    resolver: zodResolver(questionFormSchema),
    defaultValues: {
      title: "",
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
