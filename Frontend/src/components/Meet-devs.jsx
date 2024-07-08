import React from "react";
import dev_details from "../developer_details";
import { FaInstagram, FaLinkedin, FaGithub, FaCode } from "react-icons/fa";

function Meetdev() {
  return (
    <div
      id="developersSection"
      className="my-20 bg-[url('/static/images/img-bg.jpg')]"
    >
      <p className="leading-13 mb-6 bg-gradient-to-r from-red-600 to-pink-800 p-6 text-left font-serif text-4xl text-white md:text-6xl">
        Meet The Developers
      </p>
      <div className="flex items-center justify-center">
        {dev_details.map((ele, index) => (
          <Card
            key={index}
            img_url={ele.img_url}
            name={ele.name}
            insta_id={ele.insta_id}
            linkedin_id={ele.linkedin_id}
            contact={ele.contact}
            portfolio={ele.portfolio}
          />
        ))}
      </div>
    </div>
  );
}

function Card(props) {
  return (
    <div className="m-4 rounded-lg bg-gradient-to-r from-red-800 to-pink-800 text-white shadow-lg">
      <div className="flex flex-col items-center p-6">
        <img
          loading="lazy"
          className="dev-img h-48 w-48 rounded-full object-cover"
          src={props.img_url}
          alt="Developer"
        />
        <p className="mt-4 text-3xl font-semibold">{props.name}</p>
      </div>
      <div className="flex justify-center py-4">
        <a className="p-4 text-3xl" href={props.insta_id}>
          <FaInstagram />
        </a>
        <a className="p-4 text-3xl" href={props.linkedin_id}>
          <FaLinkedin />
        </a>
        <a className="p-4 text-3xl" href={props.contact}>
          <FaGithub />
        </a>
        <a className="p-4 text-3xl" href={props.portfolio}>
          <FaCode />
        </a>
      </div>
    </div>
  );
}

export default Meetdev;
