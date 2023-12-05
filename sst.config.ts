import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "next13",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "site", {
        environment: {
          NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
            process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!,
          CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY!,
          NEXT_PUBLIC_CLERK_SIGN_IN_URL:
            process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL!,
          NEXT_PUBLIC_CLERK_SIGN_UP_URL:
            process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL!,
          NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
            process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL!,
          NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
            process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL!,
          NEXT_PUBLIC_TINY_EDITOR_KEY: process.env.NEXT_PUBLIC_TINY_EDITOR_KEY!,
          MONGODB_URL: process.env.MONGODB_URL!,
          CLERK_WEBHOOK_SECRET: process.env.CLERK_WEBHOOK_SECRET!,
        },
      });

      stack.addOutputs({
        SiteUrl: site.url,
      });
    });
  },
} satisfies SSTConfig;
