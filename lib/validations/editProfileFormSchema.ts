import * as z from "zod";

export default z.object({
  name: z.string().min(1, "name is required"),
  userName: z.string().min(1, "userName is required"),
  portfolioWebsite: z.string(),
  location: z.string(),
  bio: z.string(),
  clerkId: z.string().min(1),
  path: z.string().min(1, "Path is required"),
});
