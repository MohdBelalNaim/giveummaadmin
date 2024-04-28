import React, { useEffect, useState } from "react";
import Avatar from "../Avatar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { database } from "../../utils/firebase";
import { SpinnerCircular } from "spinners-react";

const Givers = ({ id }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  async function getDonations() {
    setLoading(true);
    const q = query(
      collection(database, "donations"),
      where("campaignId", "==", id)
    );
    const data = await getDocs(q);
    setData(data.docs);
    setLoading(false);
  }
  useEffect(() => {
    getDonations();
  }, []);

  return (
    <div>
      <div className="text-xl mt-4 font-bold">Givers </div>
      {loading ? (
        <div className="w-full py-20 grid place-items-center">
          <SpinnerCircular color="blue" secondaryColor="lightgray" />
        </div>
      ) : (
        data.map((item, index) => {
          return (
            <div className="flex items-center gap-3 py-6 border-b">
              <Avatar name={"Belal"} size="sm" />
              <div>
                <div>{item.data()?.name}</div>
                <div>₹{item.data()?.amount}</div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Givers;
