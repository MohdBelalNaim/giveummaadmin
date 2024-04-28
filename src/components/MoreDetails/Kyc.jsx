import React from "react";
import { IoDocumentOutline } from "react-icons/io5";

const Kyc = () => {
  return (
    <div className="grid gap-y-10">
      <div className="mt-12">
        <div className="text-xl font-medium">Campaigner KYC</div>
        <div className="flex items-center justify-between border pl-3 mt-4 bg-white">
          Aadhar card
          <div className="flex items-center gap-2 bg-gray-200 p-2">
            <IoDocumentOutline /> View document
          </div>
        </div>
        <div className="flex items-center justify-between border pl-3 mt-4 bg-white">
          PAN card
          <div className="flex items-center gap-2 bg-gray-200 p-2">
            <IoDocumentOutline /> View document
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-xl font-medium">Benificiary KYC</div>
        <div className="flex items-center justify-between border pl-3 mt-4 bg-white">
          Aadhar card
          <div className="flex items-center gap-2 bg-gray-200 p-2">
            <IoDocumentOutline /> View document
          </div>
        </div>
        <div className="flex items-center justify-between border pl-3 mt-4 bg-white">
          PAN card
          <div className="flex items-center gap-2 bg-gray-200 p-2">
            <IoDocumentOutline /> View document
          </div>
        </div>
      </div>
      <div className="mt-4">
        <div className="text-xl font-medium">Bank proof</div>
        <div className="flex items-center justify-between border pl-3 mt-4 bg-white">
          Bank cancel cheque
          <div className="flex items-center gap-2 bg-gray-200 p-2">
            <IoDocumentOutline /> View document
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kyc;
