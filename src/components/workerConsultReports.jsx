import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/WorkerConsultReports.css";

const WorkerConsultReports = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reports, setReports] = useState([]);

  const fetchWorkerReports = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/reports/report/worker",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
        }
      );
      setReports(response.data);
      setLoading(false);
    } catch (err) {
      setError("Erreur lors de la récupération des rapports.");
      setLoading(false);
      console.error("Error fetching worker reports:", err);
    }
  };

  const handleConsult = async (reportId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/reports/report/${reportId}/consult`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert(response.data.message);
      fetchWorkerReports();
    } catch (err) {
      const message =
        err.response?.data?.message || "Erreur lors de la consultation.";
      setError(message);
      console.error("Error consulting report:", err);
    }
  };

  useEffect(() => {
    fetchWorkerReports();
  }, []);

  if (loading) {
    return <div>Chargement des rapports...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="worker-consult-reports-container">
      <h2>Rapports de Clients</h2>
      <table className="worker-consult-reports-table">
        <thead>
          <tr>
            <th>Client</th>
            <th>Numéro de téléphone</th>
            <th>Message</th>
            <th>Statut</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report._id}>
                <td>
                  {report.clientId
                    ? `${report.clientId.firstName || ""} ${
                        report.clientId.lastName || ""
                      }`.trim() || "Client indisponible"
                    : "Client indisponible"}
                </td>
                <td>{report.clientId?.phone || "N/A"}</td>
                <td>{report.message || "N/A"}</td>
                <td>
                  {report.status === "pending" && "En attente"}
                  {report.status === "consulted" && "Consulté"}
                  {report.status === "cancelled" && "Annulé"}
                  {report.status === "resolved" && "Résolu"}
                </td>
                <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                <td>
                  <button
                    className="consult-button"
                    onClick={() => handleConsult(report._id)}
                    disabled={report.status !== "pending"}
                  >
                    Marquer comme consulté
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Aucun rapport disponible.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerConsultReports;
