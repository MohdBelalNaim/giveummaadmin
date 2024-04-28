import React, { useState } from "react";
import Story from "../components/MoreDetails/Story";
import BankDetails from "../components/MoreDetails/BankDetails";
import Kyc from "../components/MoreDetails/Kyc";
import Withdrawls from "../components/MoreDetails/Withdrawls";
import Givers from "../components/MoreDetails/Givers";
import { useParams } from "react-router-dom";

const MoreDetails = () => {
  const { id } = useParams();
  const menu = {
    Story: <Story id={id} />,
    Bank: <BankDetails id={id} />,
    KYC: <Kyc id={id} />,
    Withdrawls: <Withdrawls id={id} />,
    Givers: <Givers id={id} />,
  };

  const [current, setCurrent] = useState("Story");
  return (
    <>
      <div className="w-[min(840px,98%)] mx-auto py-10 max-sm:py-5">
        <select
          onChange={(e) => setCurrent(e.target.value)}
          className="w-full border rounded p-3 hidden max-sm:block bg-gray-100"
        >
          <option value="Story">Story</option>
          <option value="Bank">Bank Details</option>
          <option value="KYC">KYC</option>
          <option value="Withdrawls">Withdrawls</option>
          <option value="Givers">Givers</option>
        </select>
        <div className="max-sm:hidden flex justify-between border border-gray-500 rounded-md">
          {Object.keys(menu).map((item, index) => {
            return (
              <div
                onClick={() => setCurrent(item)}
                className={`max-sm:text-sm hover:bg-gray-100 overflow-hidden cursor-pointer w-full text-center py-1.5 ${
                  index != Object.keys(menu).length - 1 && "border-r"
                } border-gray-500 ${item == current && "text-blue-600"}`}
              >
                {item == "Bank" ? "Bank Details" : item}
              </div>
            );
          })}
        </div>
        <div className="max-sm:px-3">{menu[current]}</div>
      </div>
    </>
  );
};

export default MoreDetails;
