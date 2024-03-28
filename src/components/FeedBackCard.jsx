import React from "react";
import { Link } from "react-router-dom";

const FeedBackCard = ({id,data}) => {

  return (
    <Link to={`/report/${id}/${data.campaignId}`}>
      <div className="cursor-pointer flex gap-4 p-4 border-b text-sm hover:bg-gray-100">
        <div className="text-gray-500">{data.date}</div>
        <div>
          {data?.detail?.substring(0,100)+"..."}
        </div>
      </div>
    </Link>
  );
};

export default FeedBackCard;
