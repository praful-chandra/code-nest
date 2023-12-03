"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { questionFormSchema } from "@/lib/validations";
import QuestionForm from "./Form";
import { createQuestion } from "@/lib/actions/question.action";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  currentProfile: string;
};

const Question = ({ currentProfile }: Props) => {
  const pathname = usePathname();
  const router = useRouter();

  const onSubmit = async (vals: z.infer<typeof questionFormSchema>) => {
    await createQuestion(vals);
    router.push("/");
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

  console.log({
    err: questionForm.formState.errors,
    vals: questionForm.watch(),
  });

  return (
    <div>
      <QuestionForm formMethods={questionForm} onSubmit={onSubmit} />
    </div>
  );
};

export default Question;
