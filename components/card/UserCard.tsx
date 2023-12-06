import { fetchUserTags } from "@/lib/actions/tag.action";
import { TagType, UserType } from "@/types/primitive";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Tag from "../shared/Tag";

type UserCardProps = {
  user: UserType;
};

const UserCard = async ({ user }: UserCardProps) => {
  const userTags: TagType[] = await fetchUserTags({ userId: user?._id });
  return (
    <Link
      href={`/profile/${user?._id}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col items-center justify-center rounded-2xl border p-8">
        <div className="flex-center flex-col">
          <div className="h-[100px] w-[100px]">
            <Image
              src={user?.avatar}
              width={100}
              height={100}
              alt={`${user?.name} avatar`}
              className="rounded-full"
            />
          </div>
          <p className="text-dark200_light900 h3-bold mt-4">{user?.name}</p>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user?.userName}
          </p>
        </div>
        <div className="mt-5">
          {userTags?.length > 0 ? (
            <div className="flex items-center gap-2">
              {userTags?.map((utag) => (
                <Tag
                  key={utag?._id}
                  href={`/tag/${utag._id}`}
                  text={utag?.name}
                  variant="soft"
                />
              ))}
            </div>
          ) : (
            <Tag href="" text="No Tags yet" variant="soft" disabled />
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
