import React from "react";
import TopQuestions from "./TopQuestions";
import PopularTags from "./PopularTags";

const RightBar = () => {
  return (
    <section className="custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen  flex-col justify-between  gap-16 overflow-y-auto border-l p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden xl:w-[350px]">
      <TopQuestions />
      <PopularTags />
    </section>
  );
};

export default RightBar;
