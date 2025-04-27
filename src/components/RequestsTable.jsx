import React from "react";
import "../styles/RequestsTable.css";

const RequestsTable = ({ requests, onAccept, onReject }) => {
  // Format availability data for display
  const formatAvailability = (availability) => {
    if (!availability || availability.length === 0) return "N/A";
    return availability.map(item => (
      `${item.period}: ${item.startTime} - ${item.endTime}`
    )).join(", ");
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="requests-table-container">
      <table className="requests-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Service</th>
            <th>Description</th>
            <th>Urgence</th>
            <th>Disponibilité</th>
            <th>Date demandée</th>
            <th>Statut</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {requests.length > 0 ? (
            requests.map((req) => (
              <tr key={req._id}>
                <td>{req._id.substring(18)}</td> {/* Show last part of ID */}
                <td>{req.fullName}</td>
                <td>{req.phone}</td>
                <td>{req.address}</td>
                <td>{req.serviceRequested}</td>
                <td>{req.description}</td>
                <td>
                  {req.urgency === 'high' ? 'Haute' : 
                   req.urgency === 'medium' ? 'Moyenne' : 'Faible'}
                </td>
                <td>{formatAvailability(req.availability)}</td>
                <td>{formatDate(req.preferredDate)}</td>
                <td>
                  <span className={`status-badge ${req.status}`}>
                    {req.status === 'pending' ? 'En attente' :
                     req.status === 'accepted' ? 'Accepté' : 'Refusé'}
                  </span>
                </td>
                <td className="action-buttons">
                  {req.status === 'pending' && (
                    <>
                      <button
                        className="accept-button"
                        onClick={() => onAccept(req._id)}
                      >
                        Accepter
                      </button>
                      <button
                        className="reject-button"
                        onClick={() => onReject(req._id)}
                      >
                        Refuser
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11">Aucune demande reçue.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RequestsTable;