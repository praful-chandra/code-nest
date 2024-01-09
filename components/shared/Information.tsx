import React from "react";
import Image from "next/image";
import Link from "next/link";

type InformationProps = {
  image: string;
  text: string;
  type?: "link" | "text";
  linkText?: string;
};

const Information = ({
  image,
  text,
  type = "text",
  linkText,
}: InformationProps) => {
  return (
    <div className="text-dark400_light700 flex items-center  gap-1">
      <Image src={image} width={16} height={16} alt={text} />
      <p>
        {type === "text" && <span className="paragraph-medium">{text}</span>}
        {type === "link" && (
          <Link href={text} target="_blank" passHref>
            <span className="paragraph-medium text-accent-blue">
              {" "}
              {linkText}
            </span>
          </Link>
        )}
      </p>
    </div>
  );
};

export default Information;
