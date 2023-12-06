import Filters from "@/components/shared/Filters";
import NoResult from "@/components/shared/NoResult";
import Tag from "@/components/shared/Tag";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { tagFilters } from "@/constants/filters";
import { fetchAllTags } from "@/lib/actions/tag.action";
import { TagType } from "@/types/primitive";
import Link from "next/link";
import React from "react";

const Page = async () => {
  const allTags: TagType[] = await fetchAllTags({});

  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Tags</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch name="searchTags" placeHolder="Search for Tags" />
        <div className="">
          <Filters
            filterOptions={tagFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
        </div>
      </div>

      {!!allTags?.length && (
        <section className="mt-12 flex flex-wrap gap-4">
          {allTags?.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border px-8 py-10 sm:w-[260px]">
                <Tag disabled href="" text={tag?.name} />
                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length}+
                  </span>{" "}
                  Questions
                </p>
              </article>
            </Link>
          ))}
        </section>
      )}

      {!allTags?.length && (
        <NoResult
          title="No Tags Found"
          content="It looks like there are no tags found."
          link="/ask-question"
          linkText="Ask a question"
        />
      )}
    </>
  );
};

export default Page;
