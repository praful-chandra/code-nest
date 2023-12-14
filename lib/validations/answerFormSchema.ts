import * as z from "zod";

export default z.object({
  questionId: z.string().min(1, "questionId missing"),
  answer: z.string().min(100, "answer must have atleast 100 characters."),
});
