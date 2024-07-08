import React, { useState } from "react";
import axios from "axios";
import clubdetail from "../clubdetails";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function AdminNews() {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [poster, setPoster] = useState(null);
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const addPost = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("date", date);
      formData.append("eventDate", eventDate);
      formData.append("poster", poster);
      formData.append("link", url);

      await axios.post("/api/v1/news/addNews", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Posted successfully!");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
        const htmlDoc = new DOMParser().parseFromString(
          error.response.data,
          "text/html",
        );
        const errorElement = htmlDoc.querySelector("body");
        if (errorElement) {
          const errorMessage = errorElement.textContent.trim();
          const errormsg = errorMessage.split("at")[0].trim();
          console.log(errormsg);
          toast.error(errormsg);
        } else {
          console.log("Error: An unknown error occurred");
          toast.error("An unknown error occurred");
        }
      } else {
        console.log("Error:", error.message);
        toast.error("Error occurred during signup");
      }
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[url('/static/images/back_img.jpg')] bg-cover bg-fixed bg-center">
      <ToastContainer />
      <div className="h-[80%] w-[25rem] rounded-3xl bg-white bg-opacity-20">
        <div className="items-left m-5 flex h-full flex-col justify-evenly">
          <h1 className="text-center text-4xl font-bold text-white">
            ADD NOTICE
          </h1>
          <select
            className="rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-2 text-center"
            onChange={(e) => setName(e.target.value)}
          >
            <option value="">Select a Club from dropdown</option>
            {clubdetail.map((ele) => (
              <option value={ele.name} key={ele.name}>
                {ele.name}
              </option>
            ))}
          </select>
          <input
            type="date"
            placeholder="Date"
            className="rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-2 text-center"
            autoComplete="Current-date"
            onChange={(e) => setDate(e.target.value)}
          />
          <input
            type="date"
            placeholder="Event-Date"
            className="rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-2 text-center"
            autoComplete="Date"
            onChange={(e) => setEventDate(e.target.value)}
          />
          <input
            type="file"
            className="rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-2 text-center text-white"
            accept="image/*"
            onChange={(e) => setPoster(e.target.files[0])}
          />
          <input
            type="url"
            placeholder="Enter a link"
            className="rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-2 text-center"
            autoComplete="url"
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="mx-auto w-full rounded-xl border-2 bg-gradient-to-r from-red-700 to-pink-800 py-2 text-center text-white hover:opacity-80 md:text-2xl"
            onClick={addPost}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
