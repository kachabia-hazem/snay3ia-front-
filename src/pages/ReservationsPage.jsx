import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Reservations from "../components/Reservations.jsx";
import Navbar from "../components/Navbar.jsx";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/ReservationsPage.css";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
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
    const fetchReservations = async () => {
      if (!checkAuthentication()) return;

      try {
        // Fake data
        const fakeData = [
          {
            id: 1,
            nom: "Ali",
            tel: "58047144",
            adr: "rue basatin grand tunis",
            panne: "circuit court",
            desc: "ma yemhi chy",
            urgence: "fisa3 fisa3",
            dispo: "8h - 10h",
          },
          {
            id: 2,
            nom: "Salah",
            tel: "22630277",
            adr: "ariana el kobra",
            panne: "masse f dhaw",
            desc: "ambouba tech3l w tetfa wahadha w brise ma7rou9",
            urgence: "fisa3 fisa3 zeda",
            dispo: "10h - 12h",
          },
        ];
        setReservations(fakeData);
      } catch (error) {
        console.error("Erreur de chargement:", error);
        toast.error("Failed to load reservations.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchReservations();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="consult-requests-page">
        <Navbar />
        <div className="consult-requests-container">
          <h2>📋 Réservations de Service</h2>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="consult-requests-page">
      <ToastContainer />
      <Navbar />
      <div className="consult-requests-container">
        <h2>📋 Réservations de Service</h2>
        <Reservations reservations={reservations} />
      </div>
    </div>
  );
};

export default ReservationsPage;