import React from "react";

const Avatar = ({ size = "md", name }) => {
  return (
    <div
      className={`primary aspect-square rounded-full text-white grid place-items-center 
      ${size == "sm" && "w-12 text-2xl"}
      ${size == "md" && "w-20 text-4xl"}
      ${size == "lg" && "w-24 text-5xl"}
      ${size == "xl" && "w-28 text-5xl"}
      ${size == "2xl" && "w-32 text-6xl"}
      ${size == "4xl" && "w-36 text-6xl"}
      ${size == "5xl" && "w-40 text-7xl"}
      `}
    >
      {name ? name?.split("")[0] : "G"}
    </div>
  );
};

export default Avatar;
