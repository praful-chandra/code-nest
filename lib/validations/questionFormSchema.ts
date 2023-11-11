import * as z from "zod";

export default z.object({
  title: z
    .string()
    .min(5, "Title must be atlease 5 characters.")
    .max(130, "Title must not be more than 130 characters."),
  description: z
    .string()
    .min(100, "Description must have atleast 100 characters."),
  tags: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .min(1, "There must be atleast one tag.")
    .max(3, "There can only be 3 tags at most."),
});
