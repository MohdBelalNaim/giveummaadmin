import React, { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../utils/firebase";
import Loader from "../components/Loader";
import { Toaster } from "react-hot-toast";
import ActiveCampaignCard from "../components/ActiveCampaignCard";
import { IoReload } from "react-icons/io5";

const ActiveCampaignsPage = () => {
  const campaignsRef = collection(database, "campaigns");

  const [allCampaigns, setAllCampaigns] = useState([]);
  const [currCampaigns, setCurrCampaigns] = useState([]);

  const menuOptions = [
    {
      text: "All",
      method: getAll,
    },
    {
      text: "Active",
      method: activeCampaigns,
    },
    {
      text: "Pending",
      method: pendingCampaigns,
    },
    {
      text: "Rejected",
      method: rejectedCampaigns,
    },
  ];

  const [curr, setCurr] = useState("All");
  const [loading, setLoading] = useState(true);
  async function getCampaigns() {
    const data = await getDocs(campaignsRef);
    setAllCampaigns(data.docs);
    setCurrCampaigns(data.docs);
    setCurr("All");
    setLoading(false);
  }

  function getAll() {
    setCurrCampaigns(allCampaigns);
  }

  function pendingCampaigns() {
    const pendingCampaigns = allCampaigns.filter(
      (item) => item.data()?.status == "Pending"
    );
    setCurrCampaigns(pendingCampaigns);
  }
  function activeCampaigns() {
    const activeCampaigns = allCampaigns.filter(
      (item) => item.data()?.status == "Active"
    );
    setCurrCampaigns(activeCampaigns);
  }
  function rejectedCampaigns() {
    const rejectedCampaigns = allCampaigns.filter(
      (item) => item.data()?.status == "Rejected"
    );
    setCurrCampaigns(rejectedCampaigns);
  }

  function handleMenu(method, text) {
    method();
    setCurr(text);
  }

  useEffect(() => {
    getCampaigns();
  }, []);
  return (
    <>
      {loading && <Loader />}
      <Toaster />
      <div className="p-5 h-[100dvh] overflow-scroll">
        <div className="text-xl font-bold mb-4 flex justify-between items-center">
          <div>{curr} campaigns </div>
          <IoReload
            onClick={getCampaigns}
            className="cursor-pointer text-gray-600"
          />
        </div>
        <div className="flex gap-3 mb-4 py-2">
          {menuOptions.map((item, index) => {
            return (
              <div
                key={index}
                className={`cursor-pointer hover:bg-black hover:text-white border border-black rounded-full px-4 py-1 ${
                  curr == item.text && "bg-black text-white"
                }`}
                onClick={() => handleMenu(item.method, item.text)}
              >
                {item.text}
              </div>
            );
          })}
        </div>
        {currCampaigns == "" && (
          <div className="text-xl font-bold text-gray-500 grid place-items-center h-[80vh] rounded-lg text-center">
            No {curr} campaigns found
          </div>
        )}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {currCampaigns.map((item, index) => {
            return (
              <ActiveCampaignCard data={item.data()} id={item.id} key={index} />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ActiveCampaignsPage;
