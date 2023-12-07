import React from "react";
import Image from "next/image";

type MetricProps = {
  image: string;
  value: string;
  text: string;
};

const Metric = ({ image, value, text }: MetricProps) => {
  return (
    <div className="text-dark400_light700 flex items-center  gap-1">
      <Image src={image} width={16} height={16} alt={text} />
      <p>
        <span className="small-medium mr-1">{value}</span>
        <span className="small-regular">{text}</span>
      </p>
    </div>
  );
};

export default Metric;
