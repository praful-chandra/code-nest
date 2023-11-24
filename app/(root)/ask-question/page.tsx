import Question from "@/components/forms/askAQuestionForm";
import { SignedIn } from "@clerk/nextjs";
import React from "react";
import { getCurrentProfile } from "@/lib/currentProfile";

const Page = async () => {
  const currentProfile = await getCurrentProfile();

  return (
    <SignedIn>
      <div>
        <h1 className="h1-bold text-dark100_light900 ">Ask a Question</h1>
        <div className="mt-9">
          <Question currentProfile={JSON.stringify(currentProfile)} />
        </div>
      </div>
    </SignedIn>
  );
};

export default Page;
