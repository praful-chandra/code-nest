import * as z from "zod";

export default z.object({
  questionId: z.string().min(1, "questionId missing"),
  answerContent: z
    .string()
    .min(100, "answer must have atleast 100 characters."),
  author: z.object({
    _id: z.string().min(1),
  }),
  path: z.string().min(1, "Path is required"),
});
