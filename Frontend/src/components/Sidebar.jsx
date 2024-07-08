import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaCalendar, FaPowerOff, FaNewspaper } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import axios from "axios";

const logout = async (navigate) => {
  try {
    await axios.post(
      "/api/v1/users/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    localStorage.clear();
    navigate("/login");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

const checkAdminStatus = async () => {
  try {
    const response = await axios.get("/api/v1/users/currentUser", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(response.data.data);
    console.log(response.data.data.isAdmin);
    return response.data.data.isAdmin;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

function Sidebar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAdminStatus().then((isAdmin) => {
      setIsAdmin(isAdmin);
    });
  }, []);

  return (
    <div className="m-3">
      <ul className="absolute z-10 justify-center bg-[url('/static/images/dashbg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat md:relative md:flex">
        <li className="m-3 flex rounded-xl from-pink-600 to-red-500 text-white hover:bg-gradient-to-r hover:text-white hover:shadow-lg hover:shadow-white">
          <FaHome className="my-auto ml-8" size={25} />
          <Link to="/">
            <button className="p-5 font-sans text-lg font-bold">Home</button>
          </Link>
        </li>
        <li className="m-3 flex rounded-xl from-pink-600 to-red-500 text-white hover:bg-gradient-to-r hover:text-white hover:shadow-lg hover:shadow-white">
          <FaCalendar className="my-auto ml-8" size={25} />
          <Link to="/dashboard">
            <button className="p-5 font-sans text-lg font-bold">
              Dashboard
            </button>
          </Link>
        </li>
        {!isAdmin && (
          <li className="m-3 flex rounded-xl from-pink-600 to-red-500 text-white hover:bg-gradient-to-r hover:text-white hover:shadow-lg hover:shadow-white">
            <FaHome className="my-auto ml-8" size={25} />
            <Link to="/recruit">
              <button className="p-5 font-sans text-lg font-bold">
                Join Clubs
              </button>
            </Link>
          </li>
        )}
        {!isAdmin && (
          <li className="m-3 flex rounded-xl from-pink-600 to-red-500 text-white hover:bg-gradient-to-r hover:text-white hover:shadow-lg hover:shadow-white">
            <FaNewspaper className="my-auto ml-8" size={25} />
            <Link to="/news">
              <button className="p-5 font-sans text-lg font-bold">
                Newsroom
              </button>
            </Link>
          </li>
        )}
        {isAdmin && (
          <li className="m-3 flex rounded-xl from-pink-600 to-red-500 text-white hover:bg-gradient-to-r hover:text-white hover:shadow-lg hover:shadow-white">
            <MdAdminPanelSettings className="my-auto ml-8" size={25} />
            <Link to="/add">
              <button className="p-5 font-sans text-lg font-bold">
                Add News
              </button>
            </Link>
          </li>
        )}
        {isAdmin && (
          <li className="m-3 flex rounded-xl from-pink-600 to-red-500 text-white hover:bg-gradient-to-r hover:text-white hover:shadow-lg hover:shadow-white">
            <MdAdminPanelSettings className="my-auto ml-8" size={25} />
            <Link to="/applications">
              <button className="p-5 font-sans text-lg font-bold">
                Applications
              </button>
            </Link>
          </li>
        )}
        <li className="m-3 flex rounded-xl from-pink-600 to-red-500 text-white hover:bg-gradient-to-r hover:text-white hover:shadow-lg hover:shadow-white">
          <FaPowerOff className="my-auto ml-8" size={25} />
          <button
            onClick={() => logout(navigate)}
            className="p-5 font-sans text-lg font-bold"
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
