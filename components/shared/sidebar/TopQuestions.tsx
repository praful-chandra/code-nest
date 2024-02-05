import React from "react";
import Image from "next/image";
import { getTopQuestions } from "@/lib/actions/question.action";
import { IQuestion } from "@/database/question.model";
import Link from "next/link";

const TopQuestions = async () => {
  const topQuestionsData: IQuestion[] = await getTopQuestions();

  return (
    <section className=" font-inter">
      <h3 className="h3-bold text-dark200_light900 mb-7">Top Questions</h3>
      <ul>
        {topQuestionsData?.map((hotItem) => (
          <li key={hotItem.id} className="mb-8 cursor-pointer last:mb-0">
            <Link href={`/question/${hotItem._id}`}>
              <div className="text-dark500_light700 flex items-start justify-between ">
                <p>{hotItem.title}</p>
                <Image
                  src="/assets/icons/rightChivron.svg"
                  width={20}
                  height={20}
                  alt="Proceed"
                  className="invert-colors"
                />{" "}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TopQuestions;
