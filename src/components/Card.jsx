import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faMapMarkerAlt,
  faStar,
  faStarHalfAlt,
  faTools,
  faEnvelope,
  faFlag,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function CardOuvrier() {
  const [currentUserRole, setCurrentUserRole] = useState("");

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    setCurrentUserRole(role);
  }, []);

  const navigate = useNavigate();
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/users")
      .then((response) => response.json())
      .then((data) => {
        // Filtrer uniquement les prestataires de service
        const filtered = data.filter(
          (user) => user.role === "service_provider"
        );
        setWorkers(filtered);
      })
      .catch((error) =>
        console.error("Erreur lors de la récupération des données:", error)
      );
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`full-${i}`}
          icon={faStar}
          className="text-warning"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FontAwesomeIcon
          key="half"
          icon={faStarHalfAlt}
          className="text-warning"
        />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={faStar}
          className="text-secondary"
        />
      );
    }

    return stars;
  };

  return (
    <div className="d-flex flex-wrap gap-4">
      {workers.map((worker) => (
        <Card
          key={worker._id}
          style={{ width: "22rem" }}
          className="mb-4 shadow-sm"
        >
          <Card.Body>
            <Card.Title className="text-center">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              {worker.firstName} {worker.lastName}
            </Card.Title>
          </Card.Body>
          <Card.Img
            variant="top"
            src={"./assets/images/img.png"}
            style={{ height: "180px", objectFit: "contain", padding: "1rem" }}
          />
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <FontAwesomeIcon icon={faTools} className="me-2 text-primary" />
              <strong>Métier:</strong>{" "}
              {worker.servicesCategory || "Non spécifié"}
            </ListGroup.Item>
            <ListGroup.Item>
              <FontAwesomeIcon
                icon={faMapMarkerAlt}
                className="me-2 text-danger"
              />
              <strong>Adresse:</strong> {worker.location || "Non spécifiée"}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-flex align-items-center">
                <span className="me-2">
                  <strong>Avis:</strong>
                </span>
                <div>
                  {renderStars(worker.avis || 4)}{" "}
                  {/* note fictive si non disponible */}
                  <span className="ms-2 small text-muted">
                    ({(worker.avis || 4).toFixed(1)})
                  </span>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <Card.Body className="text-center">
            <button
              onClick={() => navigate(`/client-request-form/${worker._id}`)}
              className="btn btn-primary"
            >
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              Contacter
            </button>
          </Card.Body>
          {currentUserRole === "client" && (
            <Card.Body className="text-center">
              <button
                onClick={() => navigate(`/client-report-form/${worker._id}`)}
                className="btn btn-danger"
              >
                <FontAwesomeIcon icon={faFlag} className="me-2" />
                Report
              </button>
            </Card.Body>
          )}
        </Card>
      ))}
    </div>
  );
}

export default CardOuvrier;
