import React from "react";

interface TagProps {
  text: string;
}

const Tag = ({ text }: TagProps) => {
  return (
    <div className="background-light800_dark300 subtle-medium rounded-md px-4 py-2 uppercase">
      {text}
    </div>
  );
};

export default Tag;
