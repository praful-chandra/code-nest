import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {
  title: string;
  content: string;
  link: string;
  linkText: string;
};

const NoResult = ({ content, link, linkText, title }: Props) => {
  return (
    <div className="flex-center flex-col">
      <Image
        src="/assets/images/noResultLight.svg"
        alt="no result"
        width={300}
        height={490}
        className="dark:hidden"
      />
      <Image
        src="/assets/images/noResultDark.svg"
        alt="no result"
        width={300}
        height={490}
        className="hidden dark:block"
      />
      <h2 className="h2-bold text-dark200_light900 mt-8">{title}</h2>

      <p className="body-regular text-dark500_light700 my-4 max-w-sm">
        {content}
      </p>

      <Link href={link}>
        <Button className="paragraph-medium primary-gradient mt-5 min-h-[46px] rounded-lg px-4 py-3 text-light-900 hover:bg-primary-500 dark:bg-primary-500 dark:text-light-900">
          {linkText}
        </Button>
      </Link>
    </div>
  );
};

export default NoResult;
