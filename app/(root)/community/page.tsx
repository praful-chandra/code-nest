import { UserCard } from "@/components/card";
import Filters from "@/components/shared/Filters";
import LocalSearch from "@/components/shared/search/LocalSearch";
import { communityFilters } from "@/constants/filters";
import { fetchAllUser } from "@/lib/actions/user.action";
import { SearchParamsProps } from "@/types";
import { UserType } from "@/types/primitive";
import Link from "next/link";
import React from "react";

const Page = async ({ searchParams }: SearchParamsProps) => {
  const allUsers: UserType[] = await fetchAllUser({
    searchQuery: searchParams?.query,
  });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Community</h1>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          name="searchQuestions"
          placeHolder="Search for Amazing community members"
        />
        <div className="">
          <Filters
            filterOptions={communityFilters}
            otherClasses="min-h-[56px] sm:min-w-[170px]"
          />
        </div>
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {allUsers.length > 0 ? (
          allUsers.map((user) => <UserCard key={user._id} user={user} />)
        ) : (
          <div className="paragraph-regular text-dark200_light800 mx-auto max-w-4xl text-center">
            <p>No users yet</p>
            <Link href="/signup" className="mt-2 font-bold text-accent-blue">
              Join to be the first!
            </Link>
          </div>
        )}
      </section>
    </>
  );
};

export default Page;
