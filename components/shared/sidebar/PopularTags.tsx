import React from "react";
import Tag from "@/components/shared/Tag";

const PopularTags = () => {
  const popularTagsData = [
    {
      id: "topQuestions-one",
      text: "Javascript",
      count: 20152,
    },
    {
      id: "topQuestions-two",
      text: "Next.js",
      count: 18493,
    },
    {
      id: "topQuestions-three",
      text: "React.js",
      count: 16269,
    },
    {
      id: "topQuestions-four",
      text: "Node.js",
      count: 15121,
    },
    {
      id: "topQuestions-five",
      text: "Python",
      count: 14431,
    },
    {
      id: "topQuestions-six",
      text: "Microsoft Azure",
      count: 9429,
    },
    {
      id: "topQuestions-seven",
      text: "Postgresql",
      count: 8765,
    },
    {
      id: "topQuestions-eight",
      text: "Machine Learning",
      count: 4562,
    },
  ];
  return (
    <section className=" font-inter">
      <h3 className="h3-bold text-dark200_light900 mb-7">Popular Tags</h3>
      <ul>
        {popularTagsData?.map((hotItem) => (
          <li key={hotItem.id} className="mb-8 cursor-pointer last:mb-0">
            <div className="text-dark500_light700 flex items-start justify-between ">
              <Tag text={hotItem.text} />
              <p className="small-medium text-dark500_light700">
                {hotItem.count}+
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default PopularTags;
