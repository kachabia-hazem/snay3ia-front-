import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Reservations from "../components/Reservations.jsx";
import Navbar from "../components/Navbar.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ReservationsPage.css";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [requests, setRequests] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check authentication
  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    if (!token || !userId) {
      toast.error("Authentication required. Please login again.");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      return false;
    }
    return true;
  };

  // Simulation appel API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID not found in local storage");
        }

        const response = await fetch(
          `http://localhost:5000/api/requests/byclientId/${userId}`
        );
        console.log(response);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error loading requests:", error);
        setError(error.message);
      } finally {
        // setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // if (isLoading) {
  //   return (
  //     <div className="consult-requests-page">
  //       <Navbar />
  //       <div className="consult-requests-container">
  //         <h2>📋 Réservations de Service</h2>
  //         <p>Loading...</p>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="consult-requests-page">
      <ToastContainer />
      <Navbar />
      <div className="consult-requests-container">
        <h2>📋 Réservations de Service</h2>
        <Reservations reservations={requests} />
      </div>
    </div>
  );
};

export default ReservationsPage;