import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ClientConsultReports.css";

const ClientConsultReports = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reports, setReports] = useState([]);

  const fetchClientReports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/reports/report/client",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Set the reports from the response data
      setReports(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors de la récupération des rapports.");
      setLoading(false);
      console.error("Error fetching reports:", err);
    }
  };

  const handleCancel = async (reportId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/reports/report/${reportId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(response.data.message); // Show success message
      // Refresh the reports list after cancellation
      fetchClientReports();
    } catch (err) {
      const message =
        err.response?.data?.message || "Erreur lors de l'annulation.";
      setError(message);
      console.error("Error cancelling report:", err);
    }
  };

  useEffect(() => {
    fetchClientReports();
  }, []);

  if (loading) {
    return <div className="loading">Chargement des rapports...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="client-consult-reports-container">
      <h2>Mes Rapports</h2>
      {reports.length > 0 ? (
        <table className="client-consult-reports-table">
          <thead>
            <tr>
              <th>Travailleur</th>
              <th>Numéro de téléphone</th>
              <th>Message</th>
              <th>Statut</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report._id}>
                <td>
                  {report.workerId
                    ? `${report.workerId.firstName} ${report.workerId.lastName}`
                    : "Travailleur indisponible"}
                </td>
                <td>{report.workerId?.phone || "N/A"}</td>
                <td>{report.message}</td>
                <td>
                  <span className={`status-badge status-${report.status}`}>
                    {report.status === "pending" && "En attente"}
                    {report.status === "consulted" && "Consulté"}
                    {report.status === "cancelled" && "Annulé"}
                    {report.status === "resolved" && "Résolu"}
                  </span>
                </td>
                <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="cancel-button"
                    onClick={() => handleCancel(report._id)}
                    disabled={
                      report.status === "cancelled" ||
                      report.status === "resolved"
                    }
                  >
                    Annuler
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="no-reports">Aucun rapport disponible.</div>
      )}
    </div>
  );
};

export default ClientConsultReports;
