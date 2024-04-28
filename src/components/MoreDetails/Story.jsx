import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BsCalendar2, BsGlobe, BsPersonFill } from "react-icons/bs";
import { database } from "../../utils/firebase";
import { INRFormat } from "../../utils/rupees_format";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import Style from "./story.module.css";
import { SpinnerCircular } from "spinners-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Story = ({ id }) => {
  const [campaign, setCampaign] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function accept(postId) {
    const campaignRef = doc(database, "campaigns", postId);
    updateDoc(campaignRef, {
      status: "Active",
    })
      .then((updated) => {
        navigate("/campaigns");
        toast.success("Campaign accepted");
      })
      .catch((err) => console.log(err));
  }

  function reject(postId) {
    const campaignRef = doc(database, "campaigns", postId);
    updateDoc(campaignRef, {
      status: "Rejected",
    })
      .then((updated) => {
        toast.error("Campaign rejected");
        navigate("/campaigns");
      })
      .catch((err) => console.log(err));
  }

  async function getData() {
    setLoading(true);
    const ref = doc(database, "campaigns", id);
    const data = await getDoc(ref);
    setCampaign(data.data());
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      {loading ? (
        <div className="w-full py-20 grid place-items-center">
          <SpinnerCircular color="blue" secondaryColor="lightgray" />
        </div>
      ) : (
        <div>
          <div className="text-2xl mt-4 max-sm:text-[18px]">
            {campaign?.campaignTitle}
          </div>
          <img
            src={campaign?.campaignImage}
            className="w-full h-[400px] max-sm:h-[320px] object-cover mt-4"
            alt=""
          />
          <div className="text-2xl max-sm:text-lg text-gray-400 mt-4">
            <span className="text-black">
              {INRFormat(campaign?.raisedAmount)}
            </span>{" "}
            raised of {INRFormat(campaign?.goalAmount)}
          </div>
          <div className="w-full h-3 mt-4 rounded-full bg-gray-300 overflow-hidden">
            <div
              className="h-3 rounded-full primary"
              style={{
                width:
                  (campaign?.raisedAmount / campaign.goalAmount) * 100 + "%",
              }}
            ></div>
          </div>
          <div className="flex justify-between mt-4 text-gray-500 max-sm:text-sm">
            <div className="flex gap-2 items-center">
              <BsPersonFill size={22} /> <span className="text-black">28</span>{" "}
              Givers
            </div>
            <div className="flex gap-2 items-center">
              <BsCalendar2 size={18} /> <span className="text-black">42</span>{" "}
              Days left
            </div>
          </div>
          <div className="grid max-sm:grid-cols-1 grid-cols-2 mt-4 gap-4">
            <div className="border rounded p-2 bg-white">
              <div className="text-sm text-gray-500">Campaigner</div>
              <div>{campaign?.campaignerName}</div>
              <div className="text-sm text-gray-500">from, India</div>
            </div>
            <div className="border rounded p-2 bg-white">
              <div className="text-sm text-gray-500">Benificiary</div>
              <div>{campaign?.benificiaryName}</div>
              <div className="text-sm text-gray-500">from, India</div>
            </div>
          </div>
          <div>
            <div className="text-xl flex items-center gap-3  py-5 border-b">
              <BsGlobe size={22} /> Story
            </div>
            <div className="mt-4">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                children={campaign?.story}
                className={`${Style.head} ${Style.newLine}`}
              ></ReactMarkdown>
            </div>
          </div>

          {campaign?.status == "Pending" && (
            <>
              <div className="border-t mt-5 pt-4 border-black">
                Update the campus status
              </div>
              <div className="flex gap-3 mt-5">
                <button
                  onClick={() => accept(id)}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg"
                >
                  Accept
                </button>
                <button
                  onClick={() => reject(id)}
                  className="bg-red-600 text-white px-6 py-2 rounded-lg"
                >
                  Rejected
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Story;
