import React, { useState } from "react";
import axios from "axios";
import Navfunc from "./Dashnav";
import Swal from "sweetalert2";

function Navigator() {
  const [isOpen, setIsOpen] = useState(false);
  return <Navfunc props={isOpen} />;
}

export default function Recruit() {
  const [club, setClub] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [roll, setRoll] = useState("");
  const [branch, setBranch] = useState("");
  const [reason, setReason] = useState("");
  const [batch, setBatch] = useState("");

  function getCurrentDateTime() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!club || !name || !mobile || !roll || !branch || !reason || !batch) {
      Swal.fire({
        title: "Missing Fields",
        text: "All fields are required.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
    const formData = {
      user: name,
      club,
      mobile,
      roll,
      branch,
      reason,
      batch,
    };

    try {
      const response = await axios.post(
        "/api/v1/users/addRecruitment",
        formData,
      );

      console.log("API Response:", response.data);
      setClub("");
      setName("");
      setMobile("");
      setRoll("");
      setBranch("");
      setReason("");
      setBatch("");

      Swal.fire({
        title: "Application Submitted",
        text: "Your application has been submitted successfully.",
        icon: "success",
        confirmButtonText: "OK",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      Swal.fire({
        title: "Error",
        text: "An error occurred while submitting your application. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-[url('/static/images/back_img.jpg')] bg-cover bg-fixed bg-center">
      <div className="h-[35rem] w-[25rem] rounded-3xl bg-white bg-opacity-20">
        <div className="items-left m-5 flex h-full flex-col justify-evenly">
          <h1 className="text-center text-4xl font-bold text-white">
            JOIN CLUBS
          </h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label htmlFor="club" className="text-lg text-white">
              Select a Club:
            </label>
            <select
              id="club"
              value={club}
              onChange={(e) => setClub(e.target.value)}
              className="rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-1 text-center"
            >
              <option value="">Select a Club</option>
              <option value="ietbit">IET</option>
              <option value="ieeebit">IEEE</option>
              <option value="acmbit">ACM</option>
              <option value="ietebit">IETE</option>
            </select>

            <label htmlFor="name" className="text-lg text-white">
              Enter Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Name"
              className="rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-1 text-center"
            />

            <label htmlFor="mobile" className="text-lg text-white">
              Contact Number:
            </label>
            <input
              type="text"
              id="mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              placeholder="Contact Number"
              className="rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-1 text-center"
            />

            <label htmlFor="roll" className="text-lg text-white">
              BTECH/10XXX/XX:
            </label>
            <input
              type="text"
              id="roll"
              value={roll}
              onChange={(e) => setRoll(e.target.value)}
              placeholder="BTECH/10XXX/XX"
              className="rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-1 text-center"
            />

            <label htmlFor="branch" className="text-lg text-white">
              Branch:
            </label>
            <input
              type="text"
              id="branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              placeholder="Branch"
              className="rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-1 text-center"
            />

            <label htmlFor="reason" className="text-lg text-white">
              Why do you want to join?
            </label>
            <input
              type="text"
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why do you want to join?"
              className="rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-1 text-center"
            />

            <label htmlFor="batch" className="text-lg text-white">
              Batch:
            </label>
            <input
              type="text"
              id="batch"
              value={batch}
              onChange={(e) => setBatch(e.target.value)}
              placeholder="Batch"
              className="rounded-xl bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat p-1 text-center"
            />

            <button
              type="submit"
              className="mx-auto my-2 w-full rounded-xl border-2 bg-gradient-to-r from-red-700 to-pink-800 py-2 text-center
                text-white hover:opacity-80 md:text-2xl"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
