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
              <th>Panne</th>
              <th>Description de panne</th>
              <th>Urgence</th>
              <th>Disponibilité</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan="8">Aucune réservation trouvée.</td>
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
            <th>Panne</th>
            <th>Description de panne</th>
            <th>Urgence</th>
            <th>Disponibilité</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length > 0 ? (
            reservations.map((res) => (
              <tr key={res.id}>
                <td>{res.id}</td>
                <td>{res.nom}</td>
                <td>{res.tel}</td>
                <td>{res.adr}</td>
                <td>{res.panne}</td>
                <td>{res.desc}</td>
                <td>{res.urgence}</td>
                <td>{res.dispo}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Aucune réservation trouvée.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reservations;