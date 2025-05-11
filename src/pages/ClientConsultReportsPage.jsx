import React, { useState } from "react";
import ClientConsultReports from "../components/ClientConsultReports";
import Navbar from "../components/Navbar.jsx";

const ClientConsultReportsPage = () => {
  const [reports, setReports] = useState([
    { id: 1, nom: "Ali Ben Salah", tel: "22233444", message: "Demande d'information sur le service." },
    { id: 2, nom: "Leila Mami", tel: "55443322", message: "Problème avec la consultation en ligne." },
    { id: 3, nom: "Omar Trabelsi", tel: "99887766", message: "Besoin d'une assistance technique." },
  ]);

  const handleCancel = (id) => {
    const confirmed = window.confirm("Voulez-vous vraiment annuler ce rapport ?");
    if (confirmed) {
      setReports((prevReports) => prevReports.filter((report) => report.id !== id));
    }
  };

  return (
    <>
      <Navbar />
      <div className="page-container">
        <h2>Rapports de consultation des clients</h2>
        <ClientConsultReports reports={reports} onCancel={handleCancel} />
      </div>
    </>
  );
};

export default ClientConsultReportsPage;
