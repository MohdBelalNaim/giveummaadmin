import React, { useState } from "react";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
  FaCalendar,
  FaCheck,
  FaDochub,
  FaEnvelope,
  FaEye,
  FaFacebook,
  FaFacebookF,
  FaHandHoldingHeart,
  FaLink,
  FaTimes,
  FaWhatsapp,
} from "react-icons/fa";
import Button from "./Button";
import { Link } from "react-router-dom";
import { BiMoney } from "react-icons/bi";

const MyCampaigns = ({ data, id }) => {
  const date = new Date();
  const day = date.getDay();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const today = new Date();
  const campaignEnds = new Date(data.date);

  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }

  const daysLeft = dateDiffInDays(today, campaignEnds);
  const [withdraw, setWithdraw] = useState(false);

  return (
    <>
      <div className="bg-white shadow-lg overflow-hidden border border-gray-100 rounded-xl  mb-4 max-sm:p-5">
        <div className="p-10 grid grid-cols-2 max-sm:grid-cols-1 gap-14 max-sm:gap-4">
          <div>
            <div className="flex max-sm:flex-col gap-4 mb-10 max-sm:mb-4">
              <img
                src={data.campaignImage[0]}
                alt=""
                className="h-32 w-32 object-cover max-sm:w-full"
              />
              <div>
                <div>{data.campaignTitle}</div>
                {daysLeft > 0 ? (
                  <div className="text-xs bg-green-500 w-max text-white py-1 px-5 rounded-full mt-5 max-sm:mt-2 max-sm:px-3">
                    {data?.status || "Pending"}
                  </div>
                ) : (
                  <div className="text-xs bg-red-500 w-max text-white py-1 px-5 rounded-full mt-5 max-sm:mt-2 max-sm:px-3">
                    Expired
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex gap-7 max-sm:flex-col max-sm:gap-2">
              <Link to={`/edit/${id}`} className="w-full">
                <button className="w-full border hover:text-white hover:bg-blue-500 rounded-full text-blue-500 border-blue-500 py-2">
                  Edit story
                </button>
              </Link>
              <Link to={`/edit/${id}`} className="w-full">
                <button className="w-full border hover:text-white hover:bg-blue-500 rounded-full text-blue-500 border-blue-500 py-2">
                  Upload documents
                </button>
              </Link>
            </div>

            <div className="pt-10  flex justify-between  max-sm:flex-col max-sm:gap-5">
              <div className="flex items-center gap-4">
                <div className="bg-blue-200 h-10 w-10 flex items-center text-primary text-2xl rounded-full justify-center max-sm:text-[18px] max-sm:h-10 max-sm:w-10">
                  <FaHandHoldingHeart />
                </div>
                <div className="flex-col max-sm:text-sm">
                  <div className="font-semibold">{data.goalAmount}</div>
                  <div className="text-gray-500 text-sm">Fund required</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-200 h-10 w-10 flex items-center text-primary text-2xl rounded-full justify-center max-sm:text-[18px] max-sm:h-10 max-sm:w-10">
                  <BiMoney />
                </div>
                <div className="flex-col max-sm:text-sm">
                  <div className="font-semibold">{data.raisedAmount}</div>
                  <div className="text-gray-500 text-sm">Fund raised</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-blue-200 h-10 w-10 flex items-center text-primary text-2xl rounded-full justify-center max-sm:text-[18px] max-sm:h-10 max-sm:w-10">
                  <FaCalendar />
                </div>
                <div className="flex-col max-sm:text-sm">
                  <div className="font-semibold">
                    {daysLeft <= 0 ? 0 : daysLeft}
                  </div>
                  <div className="text-gray-500 text-sm">Days left</div>
                </div>
              </div>
              {/* <div className="flex items-center gap-4">
                <div className="bg-blue-200 h-10 w-10 flex items-center text-primary text-2xl rounded-full justify-center max-sm:text-[18px] max-sm:h-10 max-sm:w-10">
                  <FaEye />
                </div>
                <div className="flex-col max-sm:text-sm">
                  <div className="font-semibold">{data.views}</div>
                  <div className="text-gray-500 text-sm">Views</div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
        <Link to={`/more/${id}`}>
          <div className="border-t bg-gray-100 text-center py-3 mt-5">
            View more details
          </div>
        </Link>
      </div>
    </>
  );
};

export default MyCampaigns;
