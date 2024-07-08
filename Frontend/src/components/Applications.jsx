import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.post(
          "/api/v1/users/getRecruitmentsByClub",
          {
            club: "ietbit",
          },
        );
        console.log("applicants", response.data.message[0]);
        setApplications(response.data.message);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    fetchApplications();
  }, []);
  console.log("state", applications);

  return (
    <div className="h-screen bg-[url('/static/images/dashbg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat">
      <h1 className="m-auto p-3 text-center text-2xl font-bold text-white">
        Applications
      </h1>
      <Content applications={applications} />
    </div>
  );
}

const Content = ({ applications }) => {
  return (
    <div>
      {applications.map((application, index) => (
        <Card key={index} {...application} />
      ))}
    </div>
  );
};

function Card(props) {
  console.log("props", props);
  return (
    <div className="mb-6 overflow-hidden bg-white bg-[url('/static/images/dashbg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat p-6 shadow-sm sm:rounded-lg">
      <div className="mx-auto">
        <table className="min-w-full border border-gray-300 bg-white bg-gradient-to-r from-pink-800 to-red-500 text-white">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">Name</th>
              <th className="border-b px-4 py-2">Branch</th>
              <th className="border-b px-4 py-2">Roll</th>
              <th className="border-b px-4 py-2">Mobile</th>
              <th className="border-b px-4 py-2">Why Join</th>
              <th className="border-b px-4 py-2">Batch</th>
              <th className="border-b px-4 py-2">Roll</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b px-4 py-2">{props.user.toUpperCase()}</td>
              <td className="border-b px-4 py-2">
                {props.branch.toUpperCase()}
              </td>
              <td className="border-b px-4 py-2">{props.roll.toUpperCase()}</td>
              <td className="border-b px-4 py-2">
                {props.mobile.toUpperCase()}
              </td>
              <td className="border-b px-4 py-2">
                {props.reason.toUpperCase()}
              </td>
              <td className="border-b px-4 py-2">
                {props.batch.toUpperCase()}
              </td>
              <td className="border-b px-4 py-2">{props.roll.toUpperCase()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
