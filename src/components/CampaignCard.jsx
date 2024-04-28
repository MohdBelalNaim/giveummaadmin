import React from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { database } from "../utils/firebase";
import { doc, updateDoc } from "firebase/firestore";
import toast from "react-hot-toast";

const CampaignCard = ({ data, id, method }) => {
  return (
    <Link to={`/more-details/${id}`}>
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-transform">
        <img
          src={data.campaignImage[0]}
          className="h-[260px] object-cover w-full"
          alt=""
        />
        <div className="p-4 space-y-3">
          <div className="">{data.campaignTitle}</div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;
