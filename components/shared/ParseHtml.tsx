"use client";

import React, { useEffect } from "react";
import parse from "html-react-parser";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.min.css";

type ParsHtmlProps = {
  content: string;
};
const ParseHtml = ({ content }: ParsHtmlProps) => {
  useEffect(() => {
    const highlight = async () => {
      await Prism.highlightAll(); // <--- prepare Prism
    };
    highlight(); // <--- call the async function
  }, [content]);

  return (
    <div className="body-regular text-dark400_light700">{parse(content)}</div>
  );
};

export default ParseHtml;
