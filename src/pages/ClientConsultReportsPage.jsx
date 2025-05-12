import React from "react";
import { useParams } from "react-router-dom";
import ClientConsultReports from "../components/ClientConsultReports";
import Navbar from "../components/Navbar";
import "../styles/ClientConsultReports.css";

const ClientConsultReportsPage = () => {
  // Get the clientId from URL parameters if needed
  const { clientId } = useParams();

  return (
    <>
      <Navbar />
      <div className="page-container">
        <ClientConsultReports clientId={clientId} />
      </div>
    </>
  );
};

export default ClientConsultReportsPage;
