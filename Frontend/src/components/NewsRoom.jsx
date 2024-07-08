import React, { useEffect, useState } from "react";
import axios from "axios";
import Navfunc from "./Dashnav";

function Navigator() {
  const [isOpen, setIsOpen] = useState("false");
  return <Navfunc props={isOpen} />;
}

export default function NewsR() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const response = await axios.get("/api/v1/news/getNews");
      console.log(response.data.message);
      setNewsList(response.data.message);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  return (
    <div className="bg-[url('/static/images/dashbg.jpg')] bg-cover bg-fixed bg-center bg-no-repeat text-center">
      <p className="bg-gradient-to-r from-red-600 to-pink-800 p-6 text-left font-serif text-4xl text-white md:text-6xl">
        NEWSROOM
      </p>
      <Navigator className="m-auto" />
      <Ns newsList={newsList} />
    </div>
  );
}

const Ns = ({ newsList }) => {
  return (
    <div className="grid bg-[url('/static/images/newsroom.jpeg')] bg-cover bg-fixed bg-center bg-no-repeat md:grid-cols-2">
      {newsList.map((news) => (
        <Cards key={news._id} {...news} />
      ))}
    </div>
  );
};

function Cards(props) {
  return (
    <div className="news-container m-10 rounded-xl bg-gradient-to-r from-pink-800 to-red-500 text-white shadow-lg shadow-white">
      <div className="l-card items-center rounded-xl">
        <div className="l-front">
          <img
            className="h-full w-full border-2 border-black shadow-lg shadow-white"
            src={props.poster}
            alt="poster"
            loading="lazy"
          />
        </div>
        <div className="l-rear">
          <div className="m-5 p-5">
            <div className="mb-2 mr-2 text-center text-xl font-bold uppercase md:text-2xl">
              {props.name}
            </div>
          </div>
          <div className="grid text-center text-sm md:text-xl">
            <span className="mb-2 mr-2 inline-block rounded-full font-semibold uppercase text-white">
              Posted on: {props.date}
            </span>
            <span className="mb-2 mr-2 inline-block rounded-full font-semibold uppercase text-white">
              Event Date: {props.eventdate}
            </span>
            <a
              href={props.link}
              className="inline-block rounded-full font-semibold uppercase text-white underline"
            >
              Link: {props.link}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
