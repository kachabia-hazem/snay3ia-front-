import React from "react";
 // Importer le style du tableau si nécessaire
 import "../styles/RequestsTable.css";
const RequestsTable = ({ requests, onAccept, onReject }) => {
  return (
    <div className="requests-table-container">
      <table className="requests-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Panne</th>
            <th>Description de panne</th>
            <th>Urgence</th>
            <th>Disponibilité</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.nom}</td>
                <td>{req.tel}</td>
                <td>{req.adr}</td>
                <td>{req.panne}</td>
                <td>{req.desc}</td>
                <td>{req.urgence}</td>
                <td>{req.dispo}</td>
                <td>
                <button className="accept-button" onClick={() => onAccept(req.id)}>Accepter</button>
                <button className="reject-button" onClick={() => onReject(req.id)}>Refuser</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Aucune demande reçue.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;
