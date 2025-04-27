import React from "react";
import "../styles/Reservations.css";

const Reservations = ({ reservations }) => {
  // Fallback if reservations is undefined or null
  if (!reservations || !Array.isArray(reservations)) {
    return (
      <div className="reservations-table-container">
        <table className="reservations-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Téléphone</th>
              <th>Adresse</th>
              <th>Service demandé</th>
              <th>Description de panne</th>
              <th>Urgence</th>
              <th>Disponibilité</th>
              <th>Date préférée</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="10">Aucune réservation trouvée.</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="reservations-table-container">
      <table className="reservations-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Téléphone</th>
            <th>Adresse</th>
            <th>Service demandé</th>
            <th>Description de panne</th>
            <th>Urgence</th>
            <th>Disponibilité</th>
            <th>Date préférée</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((res) => (
              <tr key={res._id}>
                <td>{res._id}</td>
                <td>{res.fullName}</td>
                <td>{res.phone}</td>
                <td>{res.address}</td>
                <td>{res.serviceRequested}</td>
                <td>{res.description}</td>
                <td>{res.urgency}</td>
                <td>
                  {res.availability && res.availability.length > 0 ? (
                    res.availability.map((slot) => (
                      <div key={slot._id}>
                        {slot.period} ({slot.startTime} - {slot.endTime})
                      </div>
                    ))
                  ) : (
                    "Non spécifiée"
                  )}
                </td>
                <td>{new Date(res.preferredDate).toLocaleDateString()}</td>
                <td>{res.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">Aucune réservation trouvée.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;
