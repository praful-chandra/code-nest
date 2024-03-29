
import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopPosts from "./TopPosts";
import { UserType } from "@/types/primitive";
import UserAnswers from "./UserAnswers";
import {SearchParamsType} from "@/types";

type ProfileContentProps = {
  className?: string;
  user: string;
  searchParams: SearchParamsType;
};

const ProfileContent = ({ className, user, searchParams }: ProfileContentProps) => {
  const thisUser: UserType = JSON.parse(user);

  return (
    <div className={cn(className)}>
      <Tabs defaultValue="top-posts" className="flex-1">
        <TabsList className="background-light800_dark400 min-h-[42px] p-1">
          <TabsTrigger value="top-posts" className="tab">
            Top Posts
          </TabsTrigger>
          <TabsTrigger value="answers" className="tab">
            Answers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="top-posts">
          <TopPosts userId={thisUser._id} searchParams={searchParams}/>
        </TabsContent>
        <TabsContent value="answers" className="flex w-full flex-col gap-6">
          <UserAnswers userId={thisUser._id} searchParams={searchParams} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileContent;
