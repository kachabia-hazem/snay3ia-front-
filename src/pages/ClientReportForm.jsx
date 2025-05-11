import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/ClientReportForm.css"; // Ensure this CSS file exists for styling

const ClientReportForm = () => {
  const { workerId } = useParams(); // Retrieves the workerId from the URL
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setError("Veuillez entrer un message.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/reports/report",
        {
          workerId,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assuming token is stored in localStorage
          },
        }
      );

      setSuccess(response.data.message || "Rapport envoyé avec succès.");
      setMessage("");
      setError("");

      // Navigate after a delay to show success message
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || "Erreur lors de l'envoi du rapport."
      );
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Signaler un travailleur</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="message">Message :</label>
          <textarea
            id="message"
            className="form-control"
            rows="5"
            placeholder="Décrivez le problème..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-danger">
          Envoyer
        </button>
      </form>
    </div>
  );
};

export default ClientReportForm;
