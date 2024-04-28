import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../utils/firebase";

const Withdrawls = ({ id }) => {
  const [withdrawls, setWithdrawls] = useState([]);
  async function getWithdrawls() {
    const q = query(
      collection(database, "withdrawls"),
      where("campaign", "==", id)
    );
    const data = await getDocs(q);
    setWithdrawls(data.docs);
  }
  return (
    <div className="">
      <div className="text-xl py-4 font-bold">Withdrawls</div>
      <div className="overflow-x-auto">
        {withdrawls == "" ? (
          <div className="text-gray-500 font-bold text-xl grid place-items-center h-[400px]">
            No withdrawl requests found
          </div>
        ) : (
          <table className="table bg-white">
            {/* head */}
            <thead>
              <tr>
                <th>S.no</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {withdrawls.map((item, index) => {
                return (
                  <tr>
                    <th>{index + 1}</th>
                    <td>{item.data()?.amount}</td>
                    <td>{item.data()?.date}</td>
                    <td>{item.data()?.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Withdrawls;
