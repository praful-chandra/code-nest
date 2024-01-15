import { cn } from "@/lib/utils";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TopPosts from "./TopPosts";
import { UserType } from "@/types/primitive";

type ProfileContentProps = {
  className?: string;
  user: string;
};

const ProfileContent = ({ className, user }: ProfileContentProps) => {
  const thisUser: UserType = JSON.parse(user);

  return (
    <div className={cn(className)}>
      <Tabs defaultValue="top-posts" className="flex-1">
        <TabsList className="background-light800_dark400 min-h-[42px] p-1">
          <TabsTrigger value="top-posts" className="tab">
            <TopPosts userId={thisUser._id} />
          </TabsTrigger>
          <TabsTrigger value="answers" className="tab">
            Answers
          </TabsTrigger>
        </TabsList>
        <TabsContent value="top-posts">Questions</TabsContent>
        <TabsContent value="answers" className="flex w-full flex-col gap-6">
          Answers
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProfileContent;
