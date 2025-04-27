import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import RequestsTable from "../components/RequestsTable.jsx";
import Navbar from "../components/Navbar.jsx";

const ConsultRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID not found in local storage");
        }

        const response = await fetch(
          `http://localhost:5000/api/requests/bySericeId/${userId}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error("Error loading requests:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleAccept = async (requestId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${requestId}/accept`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "accepted" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update request status");
      }

      setRequests(requests.map(request => 
        request._id === requestId ? { ...request, status: "accepted" } : request
      ));
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("Failed to accept request");
    }
  };

  const handleReject = async (requestId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/requests/${requestId}/reject`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "rejected" }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update request status");
      }

      setRequests(requests.map(request => 
        request._id === requestId ? { ...request, status: "rejected" } : request
      ));
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("Failed to reject request");
    }
  };

  if (loading) {
    return (
      <div className="consult-requests-page">
        <Navbar />
        <div className="consult-requests-container">
          <h2>📋 Demandes de Service</h2>
          <p>Chargement en cours...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="consult-requests-page">
        <Navbar />
        <div className="consult-requests-container">
          <h2>📋 Demandes de Service</h2>
          <p className="error-message">Erreur: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="consult-requests-page">
      <Navbar />
      <div className="consult-requests-container">
        <h2>📋 Demandes de Service</h2>
        
        {requests.length === 0 ? (
          <p>Aucune demande trouvée</p>
        ) : (
          <RequestsTable
            requests={requests}
            onAccept={handleAccept}
            onReject={handleReject}
          />
        )}
      </div>
    </div>
  );
};

export default ConsultRequests;