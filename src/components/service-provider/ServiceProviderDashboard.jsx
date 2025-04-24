import React from "react";
import {
  Container,
  Row,
  Col,
  Table,
  ListGroup,
  Card,
  Button,
  Badge,
} from "react-bootstrap";
import {
  FaCheck,
  FaTimes,
  FaEye,
  FaEdit,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./SideBar/SideBar";

const ServiceProviderDashboard = () => {
  const recentRequests = [
    {
      client: "Sophie Martin",
      task: "Réparation robinet",
      priority: "Urgent",
      date: "15/06/2023",
    },
    {
      client: "Jean Dubois",
      task: "Installation chauffe-eau",
      priority: "Standard",
      date: "16/06/2023",
    },
    {
      client: "Marie Leroy",
      task: "Fuite sous évier",
      priority: "Urgent",
      date: "16/06/2023",
    },
    {
      client: "Pierre Moreau",
      task: "Remplacement WC",
      priority: "Standard",
      date: "20/06/2023",
    },
  ];

  const appointments = [
    {
      client: "Sophie Martin",
      task: "Réparation robinet",
      time: "10:00 - 11:30",
      address: "23 Rue de Lilas, Paris",
    },
    {
      client: "Lucas Bernard",
      task: "Débouchage évier",
      time: "14:30 - 15:30",
      address: "45 Avenue Victor Hugo, Paris",
    },
    {
      client: "Emma Petit",
      task: "Changement joint",
      time: "17:00 - 18:00",
      address: "12 Rue de Commerce, Paris",
    },
  ];

  return (
    <Container fluid className="p-0 dashboard-container">
      <Row className="m-0">
        {/* Sidebar */}
        <Col md={2} className="p-0">
          <Sidebar />
        </Col>

        {/* Main Content */}
        <Col md={10} className="p-4 main-content">
          <h2 className="mb-4 elegant-title">Tableau de Bord</h2>

          {/* Recent Requests Section */}
          <Card className="mb-4 shadow-sm elegant-card">
            <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Demandes Récentes</h4>
              <Badge bg="light" text="dark">
                {recentRequests.length} en attente
              </Badge>
            </Card.Header>
            <Card.Body>
              <Table striped hover responsive className="elegant-table">
                <thead>
                  <tr>
                    <th>Client</th>
                    <th>Tâche</th>
                    <th>Priorité</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentRequests.map((request, index) => (
                    <tr key={index}>
                      <td>{request.client}</td>
                      <td>{request.task}</td>
                      <td>
                        <Badge
                          bg={
                            request.priority === "Urgent" ? "danger" : "success"
                          }
                          className="py-2 px-3"
                        >
                          {request.priority === "Urgent" && (
                            <FaExclamationTriangle className="me-1" />
                          )}
                          {request.priority}
                        </Badge>
                      </td>
                      <td>{request.date}</td>
                      <td>
                        <Button
                          variant="outline-success"
                          size="sm"
                          className="me-2 action-btn"
                          title="Accepter"
                        >
                          <FaCheck />
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          className="action-btn"
                          title="Refuser"
                        >
                          <FaTimes />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Button variant="link" className="text-primary p-0 elegant-link">
                Voir toutes les demandes →
              </Button>
            </Card.Body>
          </Card>

          {/* Upcoming Appointments Section */}
          <Card className="mb-4 shadow-sm elegant-card">
            <Card.Header className="bg-info text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Rendez-vous à venir</h4>
              <Badge bg="light" text="dark">
                {appointments.length} aujourd'hui
              </Badge>
            </Card.Header>
            <Card.Body>
              <ListGroup className="mb-3 elegant-list">
                {appointments.map((appointment, index) => (
                  <ListGroup.Item
                    key={index}
                    className="d-flex justify-content-between align-items-center border-0 py-3"
                  >
                    <div className="appointment-details">
                      <strong className="d-block text-dark">
                        {appointment.client} - {appointment.task}
                      </strong>
                      <small className="text-muted d-flex align-items-center">
                        <FaClock className="me-1" /> Aujourd’hui,{" "}
                        {appointment.time}
                      </small>
                      <small className="text-muted">
                        {appointment.address}
                      </small>
                    </div>
                    <div className="appointment-actions">
                      <Button
                        variant="outline-primary"
                        size="sm"
                        className="me-2 action-btn"
                        title="Voir détails"
                      >
                        <FaEye />
                      </Button>
                      <Button
                        variant="outline-warning"
                        size="sm"
                        className="action-btn"
                        title="Modifier"
                      >
                        <FaEdit />
                      </Button>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Button variant="link" className="text-primary p-0 elegant-link">
                Voir calendrier complet →
              </Button>
            </Card.Body>
          </Card>

          {/* Recent Reviews Section */}
          <Card className="shadow-sm elegant-card">
            <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Dernières Évaluations</h4>
              <Badge bg="light" text="dark">
                En attente
              </Badge>
            </Card.Header>
            <Card.Body>
              <div className="text-center py-3 text-muted">
                {/* Placeholder for reviews - you can add real content here */}
                <p>Aucune nouvelle évaluation pour le moment</p>
                <Button
                  variant="link"
                  className="text-primary p-0 elegant-link"
                >
                  Voir toutes les évaluations →
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ServiceProviderDashboard;
