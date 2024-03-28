import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { database } from "../utils/firebase";
import { getDoc, doc } from "firebase/firestore";
import Loader from "../components/Loader";

const FeedBackDetailsPage = () => {
  const { id, campaign } = useParams();
  const [report, setReport] = useState({});
  const [camp, setCampaign] = useState({});
  const [loading, setLoding] = useState(true);

  async function getCampaignData() {
    const ref = doc(database, "campaigns", campaign);
    const data = await getDoc(ref);
    console.log(data.data());
    setCampaign(data.data());
  }

  const reportRef = doc(database, "reports", id);
  async function getReportData() {
    const data = await getDoc(reportRef);
    setReport(data.data());
    console.log(data.data());
    setLoding(false);
  }
  useEffect(() => {
    getReportData();
    getCampaignData();
  }, []);
  return (
    <>
      {loading && <Loader />}
      <div className="p-5">
        <div className="text-xl font-bold mb-4">Report</div>
        <div className="bg-white rounded-lg p-4">
          <div className="text-gray-500">{report.date}</div>
          <div className="mt-3">{report.detail}</div>
          <div className="mt-5">
            <a
              href={`https://give-umma.vercel.app/details/${report.campaignId}`}
              target="blank"
            >
              <div className="flex gap-2 bg-blue-100 rounded p-3">
                <img
                  src={camp.campaignImage}
                  className="size-36 object-cover"
                  alt=""
                />
                <div className="w-[720px] ">
                  <div className="text-lg font-bold">{camp?.campaignTitle}</div>
                  <div>{camp?.story?.substring(0, 300) + "..."}</div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeedBackDetailsPage;
