import React from "react";
import Image from "next/image";

const TopQuestions = () => {
  const topQuestionsData = [
    {
      id: "popularTags-one",
      text: "Would it be appropriate to point out an error in another paper during a referee report?",
    },
    {
      id: "popularTags-two",
      text: "How can an airconditioning machine exist?",
    },
    {
      id: "popularTags-three",
      text: "Interrogated every time crossing UK Border as citizen",
    },
    {
      id: "popularTags-four",
      text: "Low digit addition generator",
    },
    {
      id: "popularTags-five",
      text: "What is an example of 3 numbers that do not make up a vector?",
    },
  ];
  return (
    <section className=" font-inter">
      <h3 className="h3-bold text-dark200_light900 mb-7">Top Questions</h3>
      <ul>
        {topQuestionsData?.map((hotItem) => (
          <li key={hotItem.id} className="mb-8 cursor-pointer last:mb-0">
            <div className="text-dark500_light700 flex items-start justify-between ">
              <p>{hotItem.text}</p>
              <Image
                src="/assets/icons/rightChivron.svg"
                width={20}
                height={20}
                alt="Proceed"
              />{" "}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopQuestions;
