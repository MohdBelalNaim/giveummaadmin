import React from "react";

const BankDetails = () => {
  return (
    <>
      <div className="text-xl font-bold py-4">Benificiary bank details</div>
      <div className="grid gap-y-3">
        <div className="border rounded p-3 text-gray-600 bg-white">Current</div>
        <div className="border rounded p-3 text-gray-600 bg-white">
          Account number
        </div>
        <div className="border rounded p-3 text-gray-600 bg-white">
          IFSC code
        </div>
        <div className="border rounded p-3 text-gray-600 bg-white">
          Bank name
        </div>
        <div className="border rounded p-3 text-gray-600 bg-white">
          Branch name
        </div>
        <div className="border rounded p-3 text-gray-600 bg-white">
          {" "}
          Documents
        </div>
      </div>
    </>
  );
};

export default BankDetails;
