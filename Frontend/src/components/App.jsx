import React, { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Login";
import SignIn from "./SignIn";
import Dashboard from "./Dashboard";
import AdNews from "./AdNews";
import NewsR from "./NewsRoom";
import Descr from "./Descr";
import ClubD from "./ClubD";
import Profile from "./Profile";
import Recruit from "./Recruitment";
import Applications from "./Applications";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import axios from "axios";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/de" element={<Descr />} />
        <Route path="/cd" element={<ClubD />} />
        <Route
          path="/news"
          element={
            <ProtectedRoute>
              <NewsR />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add"
          element={
            <ProtectedRouteForAdmin>
              <AdNews />
            </ProtectedRouteForAdmin>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recruit"
          element={
            <ProtectedRoute>
              <Recruit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/applications"
          element={
            <ProtectedRoute>
              <Applications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}
export default App;

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/v1/users/currentUser", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

const ProtectedRouteForAdmin = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await axios.get("/api/v1/users/currentUser", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const user = response.data.data;
        setIsAdmin(user.isAdmin);
      } catch (error) {
        console.error("Error checking admin:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAdmin();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAdmin) {
    return children;
  } else {
    return <Navigate to="/signin" />;
  }
};
