import { lazy } from "react";
import { MdCampaign, MdDashboard, MdMessage, MdReport } from "react-icons/md";
import { BiMoneyWithdraw, BiSolidDonateHeart } from "react-icons/bi";
import { FaPowerOff, FaUsers } from "react-icons/fa";
import { BsNewspaper, BsPenFill } from "react-icons/bs";

export const PageRoutes = [
  {
    path: "/",
    title: "Dashboard",
    element: lazy(() => import("./pages/HomePage")),
    icon: <MdDashboard size={24} />,
  },
  {
    path: "/donations",
    title: "Donations",
    element: lazy(() => import("./pages/DonationPage")),
    icon: <BiSolidDonateHeart size={24} />,
  },
  {
    path: "/campaigns",
    title: "Campaigns",
    element: lazy(() => import("./pages/DonationPage")),
    icon: <MdCampaign size={24} />,
  },
  {
    path: "/requests",
    title: "Withdrawl requests",
    element: lazy(() => import("./pages/DonationPage")),
    icon: <BiMoneyWithdraw size={24} />,
  },
  {
    path: "/users",
    title: "Accounts",
    element: lazy(() => import("./pages/UsersPage")),
    icon: <FaUsers size={24} />,
  },
  {
    path: "/reports",
    title: "Reports",
    element: lazy(() => import("./pages/DonationPage")),
    icon: <MdReport size={24} />,
  },
  {
    path: "/create-blog",
    title: "Create Blog",
    element: lazy(() => import("./pages/DonationPage")),
    icon: <BsPenFill size={24} />,
  },
  {
    path: "/all-blogs",
    title: "All Blogs",
    element: lazy(() => import("./pages/AllBlogs")),
    icon: <BsNewspaper size={24} />,
  },
  {
    path: "/logout",
    title: "Logout",
    element: lazy(() => import("./pages/DonationPage")),
    icon: <FaPowerOff size={24} />,
  },
];
