import React, { useEffect, useState } from "react";
import axios from "axios";
import Dashmain from "./Dashmain";
import Footer from "./Footer";
import Navfunc from "./Dashnav";
import { FaCaretDown } from "react-icons/fa";
const Navigator = () => {
  const [isOpen, setIsOpen] = useState(false);
  return <Navfunc props={isOpen} />;
};
const Greet = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get("/api/v1/users/currentUser");
        console.log("response", response.data.data);
        setUser(response.data.data.fullName);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    getCurrentUser();
  });
  return (
    <div className="m-auto rounded-lg bg-gradient-to-r from-pink-800 to-red-500 p-2 text-white">
      <h1 className="text-2xl font-bold">Welcome, {user}</h1>
    </div>
  );
};
const Dashboard = () => {
  return (
    <div className="bg-[url('/static/images/dashbg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      {/* <AlluserData /> */}
      <Greet />
      <div className="text-center">
        <Navigator />
        <Dashmain />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
