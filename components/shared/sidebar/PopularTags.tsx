import React from "react";
import Tag from "@/components/shared/Tag";
import { getTopTags } from "@/lib/actions/tag.action";

const PopularTags = async () => {
  const topTagsData = await getTopTags();

  return (
    <section className=" font-inter">
      <h3 className="h3-bold text-dark200_light900 mb-7">Popular Tags</h3>
      <ul>
        {topTagsData?.map((hotItem) => (
          <li key={hotItem.id} className="mb-8 cursor-pointer last:mb-0">
            <div className="text-dark500_light700 flex items-start justify-between ">
              <Tag href={`/tags/${String(hotItem._id)}`} text={hotItem.name} />
              <p className="small-medium text-dark500_light700">
                {hotItem.numberOfQuestions}+
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopularTags;
