import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { database } from "../utils/firebase";
import { BiUser } from "react-icons/bi";

const AllCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  async function getCampaigns() {
    const ref = collection(database, "campaigns");
    const data = await getDocs(ref);
    setCampaigns(data.docs);
  }

  useEffect(() => {
    getCampaigns();
  }, []);

  return (
    <div className="px-8">
      <div className="text-xl font-bold">All Campaigns</div>
      <div className="overflow-x-auto mt-4">
        <table className="table bg-white">
          {/* head */}
          <thead>
            <tr>
              <th>S. no.</th>
              <th>Created By</th>
              <th>Campaign</th>
              <th>Total amount</th>
              <th>Raised amount</th>
              <th>Tip amount</th>
              <th>End date</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((item, index) => {
              return (
                <tr>
                  <td>{index + 1}</td>
                  <td className="flex items-center gap-2">
                    <BiUser className="text-blue-500"/>
                    <a href={`/profile/${item.data()?.campaignerEmail}`}>
                      {item.data()?.campaignerName}
                    </a>
                  </td>
                  <td>
                    <a
                      href={`https://give-umma.vercel.app/details/${item.id}`}
                      target="blank"
                    >
                      https://give-umma.vercel.app/details/{item.id}
                    </a>
                  </td>
                  <td>₹ {item.data()?.goalAmount}</td>
                  <td>₹ {item.data()?.raisedAmount}</td>
                  <td>₹ {item.data()?.totalTip}</td>
                  <td>{item.data()?.date}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCampaigns;
