import React from "react";
import "../styles/ClientConsultReports.css";

const ClientConsultReports = ({ reports, onCancel }) => {
  return (
    <div className="client-consult-reports-container">
      <table className="client-consult-reports-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Numéro de téléphone</th>
            <th>Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.length > 0 ? (
            reports.map((report) => (
              <tr key={report.id}>
                <td>{report.nom}</td>
                <td>{report.tel}</td>
                <td>{report.message}</td>
                <td>
                  <button
                    className="cancel-button"
                    onClick={() => onCancel(report.id)}
                  >
                    Annuler
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Aucun rapport disponible.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientConsultReports;
