import React, { useEffect, useState } from "react";
import Button from "../components/Button";
import { FaCheck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import MyCampaigns from "../components/MyCampaigns";
import useModel from "../customHooks/useModel";
import {
  doc,
  getDoc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";

import Loader from "../components/Loader";
import Avatar from "../components/Avatar";
import UpdateFormModel from "../components/UpdateProfile";
import { SpinnerCircular } from "spinners-react";
import { useNavigate, useParams } from "react-router-dom";
import { database } from "../utils/firebase";

const Profile = () => {
  const { id } = useParams();
  const [updateForm, toggleUpdateForm] = useModel();
  const uid = localStorage.getItem("user");
  let [userData, setUserData] = useState();
  let [campaigns, setUserCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingCampaigns, setLoadingCampaigns] = useState(false);

  async function getData() {
    const q = query(collection(database, "users"), where("email", "==", id));
    const data = await getDocs(q);
    setUserData(data.docs[0].data());
    return data.docs[0].data();
  }

  async function getUser() {
    const q = query(collection(database, "users"), where("email", "==", id));
    const data = await getDocs(q);
    console.log(data.docs[0].data());
  }

  async function getFundraisers(email) {
    setLoadingCampaigns(true);
    const data = await getDocs(
      query(
        collection(database, "campaigns"),
        where("campaignerEmail", "==", email)
      )
    );
    setUserCampaigns(data.docs);
    setLoadingCampaigns(false);
  }

  useEffect(() => {
    getUser();
    getData().then(async (data) => {
      getFundraisers(data?.email);
      setIsLoading(false);
    });
  }, []);

  const name = userData?.name;
  const email = userData?.email;
  const phone = userData?.phone;
  const pan = userData?.pan;
  const aadhar = userData?.aadhar;
  const city = userData?.city;
  const dob = userData?.dob;
  const photo = userData?.photo;
  const linkedin = userData?.linkedin;
  const facebook = userData?.facebook;

  const profileOptions = [
    {
      data: phone,
      name: "phone",
      label: "Update Phone number",
    },
    {
      data: city,
      name: "city",
      label: "Add City",
    },
    {
      data: email,
      name: "email",
      label: "Verify Email ID",
    },
    {
      data: linkedin,
      name: "linkedin",
      label: "Link Facebook Profile",
    },
    {
      data: facebook,
      name: "facebook",
      label: "Link LinkedIn Profile",
    },
    {
      data: photo,
      name: "photo",
      label: "Add Profile pic",
    },
    {
      data: pan,
      name: "pan",
      label: "Add PAN card number",
    },

    {
      data: dob,
      name: "dob",
      label: "Add Date of birth",
    },
  ];
  return (
    <>
      {isLoading && <Loader />}

      <div className="container mx-auto pb-16 max-sm:px-2 lg:px-8">
        <section>
          <div className="text-xl font-bold max-sm:mt-4 mt-8">Your Profile</div>

          <div className="flex gap-8  max-sm:flex-col items-start py-5 ">
            <div className="bg-white p-5 flex-1 max-sm:w-full shadow-lg border rounded-lg relative max-sm:p-2">
              <div className="flex justify-end absolute right-6 max-sm:hidden">
                <Button onClick={toggleUpdateForm} size="md" type="outline">
                  Edit
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-x-28 gap-y-5 p-5 max-sm:gap-x-10">
                <div className="max-sm:grid max-sm:place-items-center">
                  {photo ? (
                    <img
                      src={photo}
                      className="h-24 w-24 object-contain rounded-full"
                      alt=""
                    />
                  ) : (
                    <Avatar size="5xl" name={name} />
                  )}
                </div>
                <div className="place-self-end justify-self-start">
                  <div className="text-gray-500 max-sm:text-sm">Name</div>
                  <div className="text-lg font-light max-sm:text-sm">
                    {name}
                  </div>
                </div>
                <div className="max-sm:text-sm">
                  <div className="text-gray-500">Email</div>
                  <div className="text-lg font-light max-sm:text-sm">
                    {email}
                  </div>
                </div>
                <div className="max-sm:text-sm">
                  <div className="text-gray-500">Date of Birth</div>
                  <div className="text-lg font-light max-sm:text-sm">
                    {dob || "Not added"}
                  </div>
                </div>
                <div className="max-sm:text-sm">
                  <div className="text-gray-500">Phone Number</div>
                  <div className="text-lg font-light max-sm:text-sm">
                    {phone || "Not added"}
                  </div>
                </div>
                <div className="max-sm:text-sm">
                  <div className="text-gray-500">City of Residence</div>
                  <div className="text-lg font-light max-sm:text-sm">
                    {city || "Not added"}
                  </div>
                </div>
                <div className="max-sm:text-sm">
                  <div className="text-gray-500">PAN Number</div>
                  <div className="text-lg font-light max-sm:text-sm">
                    {pan || "Not added"}
                  </div>
                </div>
              </div>
              <div className="lg:hidden mt-4">
                <Button
                  type="outline"
                  width="full"
                  size="md"
                  onClick={toggleUpdateForm}
                >
                  EDIT
                </Button>
              </div>
            </div>
            <div className="bg-white shadow-lg border rounded-lg max-sm:w-full">
              <div className="px-8 py-4 font-semibold border-b border-gray-300 text-sm">
                YOUR PROFILE STRENGTH : STRONG
              </div>
              {profileOptions.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`flex items ${
                      index != profileOptions.length - 1 && "border-b"
                    } border-gray-300`}
                  >
                    <div className="w-[86%] py-3 px-4 text-sm">
                      {item.label}
                    </div>
                    <div className="w-[14%] border-l border-gray-300 flex items-center justify-center">
                      {item.data ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <FaTimesCircle className="text-red-500" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section>
          <div className="text-xl font-bold mb-4">Fundraisers</div>
          {loadingCampaigns ? (
            <div className="grid place-items-center py-10">
              <SpinnerCircular color="dodgerblue" secondaryColor="lightgray" />
            </div>
          ) : (
            campaigns.map((campaign, index) => {
              return (
                <MyCampaigns
                  key={index}
                  data={campaign.data()}
                  id={campaign.id}
                />
              );
            })
          )}
        </section>
      </div>

      <UpdateFormModel
        data={profileOptions}
        controller={[updateForm, toggleUpdateForm]}
        updateProfile={getData}
        name={name}
      />
    </>
  );
};

export default Profile;
