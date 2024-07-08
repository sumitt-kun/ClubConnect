import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignIn() {
  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center bg-[url('/static/images/back_img.jpg')] bg-cover bg-fixed bg-center p-2">
        <ToastContainer />
        <HomeBtn />
        <Sign />
      </div>
    </>
  );
}

function Sign() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signIn = async () => {
    try {
      const response = await axios.post("/api/v1/users/login", {
        email,
        password,
      });
      console.log("User logged in successfully:", response.data);
      toast.success("Signed in successfully");
      localStorage.setItem("user", JSON.stringify(response.data));
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
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
    <div className="h-[100%] w-[25rem] rounded-3xl bg-white bg-opacity-20 lg:w-[40%]">
      <ToastContainer />
      <div className="flex h-full flex-col items-center justify-evenly">
        <h1 className="text bg-transparent bg-clip-text text-4xl font-bold text-white">
          Sign In
        </h1>
        <input
          type="text"
          placeholder="Email"
          className="rounded-md border-white bg-transparent text-center text-xl font-semibold text-white"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="rounded-sm bg-transparent text-center text-xl text-white"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="text-white" onClick={signIn}>
          Sign In
        </button>
        <Link to="/login">
          <button
            onClick={() => navigate("/login")}
            className="text-xl text-white hover:shadow-white"
          >
            New User? Create Account
          </button>
        </Link>
      </div>
    </div>
  );
}

function HomeBtn() {
  return (
    <Link to="/">
      <button
        className="mb-2 rounded-lg from-pink-600 to-red-500 pb-0"
        onClick={() => window.location.reload()}
      >
        <h1 className="webkit mb-6 bg-clip-text text-xl font-extrabold text-transparent md:text-4xl">
          Home
        </h1>
      </button>
    </Link>
  );
}
