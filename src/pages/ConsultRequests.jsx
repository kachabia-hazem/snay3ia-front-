import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequestsTable from "../components/RequestsTable.jsx";
import Navbar from "../components/Navbar.jsx";
import "../styles/ConsultRequests.css";

const ConsultRequests = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();

  // Simulation appel API
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        // À remplacer par un vrai appel API
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
        setRequests(fakeData);
      } catch (error) {
        console.error("Erreur de chargement:", error);
      }
    };

    fetchRequests();
  }, []);

  // Fonction pour gérer l'acceptation de demande
  const handleAccept = (requestId) => {
    const updatedRequests = requests.map((request) => {
      if (request.id === requestId) {
        return { ...request, statut: "Accepté" };
      }
      return request;
    });
    setRequests(updatedRequests);
  };

  // Fonction pour gérer le refus de demande
  const handleReject = (requestId) => {
    const updatedRequests = requests.map((request) => {
      if (request.id === requestId) {
        return { ...request, statut: "Refusé" };
      }
      return request;
    });
    setRequests(updatedRequests);
  };

  return (
    <div className="consult-requests-page">
      <Navbar />

      <div className="consult-requests-container">
        <h2>📋 Demandes de Service</h2>

        <RequestsTable
          requests={requests}
          onAccept={handleAccept} // Passer la fonction d'acceptation à la table
          onReject={handleReject} // Passer la fonction de refus à la table
        />
      </div>
    </div>
  );
};

export default ConsultRequests;
