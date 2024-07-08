import React from "react";
import axios from "axios";
import { GridLoader } from "react-spinners";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import useState from "react-usestateref";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function Login() {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center bg-[url('/static/images/back_img.jpg')] bg-cover bg-fixed bg-center p-2">
        <ToastContainer />
        <div className="flex h-full w-full flex-col items-center justify-center">
          <HomeBtn />
          <SignUp />
        </div>
      </div>
    </>
  );
}

function SignUp() {
  const [naam, setNaam] = useState("");
  const [mob, setMob] = useState("");
  const [roll, setRoll] = useState("");
  const [branch, setBranch] = useState("");
  const [poster, setPoster] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [spin, setSpin, spinRef] = useState(false);
  const navigate = useNavigate();

  const signUp = async () => {
    setSpin(true);
    try {
      const formData = new FormData();
      formData.append("fullName", naam);
      formData.append("mobile", mob);
      formData.append("roll", roll);
      formData.append("branch", branch);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("idCard", poster);
      const res = await axios.post("/api/v1/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });
      console.log(res.data);
      toast.success("Signup successful now login using same credentials");
      setTimeout(() => {
        navigate("/signin");
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
    } finally {
      setSpin(false);
    }
  };
  return (
    <div className="h-[50rem] w-[25rem] rounded-3xl bg-white bg-opacity-20 lg:w-[40%]">
      <div className="flex h-full flex-col items-center justify-evenly">
        <h1 className="text bg-transparent bg-clip-text p-2 text-4xl font-bold text-white">
          Create Account
        </h1>
        <input
          type="text"
          placeholder="Enter Full Name"
          className="text-l h-5 rounded-md bg-transparent p-2 text-center font-semibold text-white"
          autoComplete=""
          onChange={(e) => setNaam(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter mobile number"
          className="text-l rounded-md border-white bg-transparent p-2 text-center font-semibold text-white"
          autoComplete="mob"
          onChange={(e) => setMob(e.target.value)}
        />
        <input
          type="text"
          placeholder=" Roll: BTECH/10XXX/22"
          className="text-l rounded-md border-white bg-transparent p-2 text-center font-semibold text-white"
          autoComplete=""
          onChange={(e) => setRoll(e.target.value)}
        />
        <input
          type="text"
          placeholder="Branch"
          className="rounded-md border-white bg-transparent p-2 text-center text-xl font-semibold text-white"
          autoComplete=""
          onChange={(e) => setBranch(e.target.value)}
        />
        <label className="drop-container" id="drop-container">
          <span className="drop-title">Drop Your Photo here</span>
          <input
            type="file"
            placeholder=""
            className="ml-10 rounded-md border-white bg-transparent pl-4 text-center text-xl font-semibold text-gray-800"
            autoComplete=""
            accept="image/*"
            onChange={(e) => setPoster(e.target.files[0])}
          />
        </label>
        <input
          type="text"
          placeholder="Email"
          className="rounded-md border-white bg-transparent p-2 text-center text-xl font-semibold text-white"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        <input
          type="password"
          placeholder="Enter Password"
          className="rounded-sm bg-transparent p-2 text-center text-xl text-white"
          autoComplete="current-password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {spin ? (
          <div className="flex w-full items-center justify-center">
            <GridLoader color="#000" />
          </div>
        ) : (
          <button className="p-2 text-white" onClick={signUp}>
            Sign Up
          </button>
        )}

        <Link to="/signin">
          <button className="p-2 text-xl text-white hover:shadow-white">
            Existing User? Login
          </button>
        </Link>
      </div>
    </div>
  );
}
function HomeBtn() {
  function refreshPage() {
    setTimeout(() => {
      window.location.reload(false);
    }, 500);
    console.log("page to reload");
  }
  return (
    <Link to="/">
      <button onClick={refreshPage}>
        <h1 className="webkit mb-6 bg-clip-text text-xl font-extrabold text-transparent md:text-4xl ">
          Home
        </h1>
      </button>
    </Link>
  );
}
