import React from "react";
import { useParams } from "react-router-dom";
import WorkerConsultReports from "../components/workerConsultReports";
import Navbar from "../components/Navbar";
import "../styles/WorkerConsultReports.css";

const WorkerConsultReportsPage = () => {
  // Get the workerId from URL parameters if needed
  const { workerId } = useParams();

  return (
    <>
      <Navbar />
      <div className="page-container">
        <WorkerConsultReports workerId={workerId} />
      </div>
    </>
  );
};

export default WorkerConsultReportsPage;
