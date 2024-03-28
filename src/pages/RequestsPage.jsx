import React, { useEffect, useState } from "react";
import CampaignCard from "../components/CampaignCard";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../utils/firebase";
import Loader from "../components/Loader";
import { Toaster } from "react-hot-toast";

const RequestsPage = () => {
  const campaignsRef = collection(database, "withdrawls");
  const [requests, setRequests] = useState([]);
  const [current, setCurrent] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCampaigns() {
    const data = await getDocs(campaignsRef);
    setRequests(data.docs);
    setCurrent(data.docs);
    setLoading(false);
  }
  useEffect(() => {
    getCampaigns();
  }, []);

  function filterRequest(type) {
    const data = requests.filter((item) => item.data()?.status == type);
    setCurrent(data);
  }

  return (
    <>
      {loading && <Loader />}
      <Toaster />
      <div className="p-5 h-[100dvh] overflow-scroll">
        <div className="text-xl font-bold mb-4">Withdrawl Requests</div>
        <div className="flex gap-3 mb-5">
          <div
            onClick={() => filterRequest("Pending")}
            className={`cursor-pointer hover:bg-black hover:text-white border border-black rounded-full px-4 py-1`}
          >
            Pending
          </div>
          <div
            onClick={() => filterRequest("Processing")}
            className={`cursor-pointer hover:bg-black hover:text-white border border-black rounded-full px-4 py-1`}
          >
            Processing
          </div>
          <div
            className={`cursor-pointer hover:bg-black hover:text-white border border-black rounded-full px-4 py-1`}
          >
            Completed
          </div>
        </div>
        {current == "" && (
          <div className="text-xl font-bold text-gray-500 grid place-items-center h-[80vh] rounded-lg text-center">
            No new requests found
          </div>
        )}
        <div className="overflow-x-auto">
          <table className="table bg-white">
            <thead>
              <tr>
                <th>S. no.</th>
                <th>Request date</th>
                <th>Campaign</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {current.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.data()?.date}</td>
                    <td>{item.data()?.campaign}</td>
                    <td>{item.data()?.amount}</td>
                    <td>{item.data()?.status}</td>
                    <td>
                      <select name="" id="">
                        <option value="processing">In progress</option>
                        <option value="completed">Withdrawl completed</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default RequestsPage;
