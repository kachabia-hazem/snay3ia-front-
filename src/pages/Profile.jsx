import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
  Modal,
} from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
  FaTrash,
  FaCalendarCheck,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/profile.css";
import axios from "axios";
import ProfileContainer from "../components/ProfileContainer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";

const Profile = () => {
  const navigate = useNavigate();
  const defaultProfileData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "client",
    servicesCategory: null,
    experience: null,
    location: null,
    bio: null,
    availability: null,
  };

  const [profileData, setProfileData] = useState(defaultProfileData);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const checkAuthentication = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      toast.error("Authentication required. Please login again.");
      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
      return false;
    }
    return true;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/service-categories"
        );
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!checkAuthentication()) return;

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setProfileData({
            ...defaultProfileData,
            ...response.data,
            servicesCategory:
              response.data.role === "service_provider"
                ? response.data.servicesCategory || null
                : null,
            experience:
              response.data.role === "service_provider"
                ? response.data.experience || null
                : null,
            location:
              response.data.role === "service_provider"
                ? response.data.location || null
                : null,
            bio:
              response.data.role === "service_provider"
                ? response.data.bio || null
                : null,
            availability:
              response.data.role === "service_provider"
                ? response.data.availability ?? true
                : null,
          });
        }
      } catch (error) {
        if (error.response?.status === 401) {
          toast.error("Session expired. Please login again.");
          setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");
            window.location.href = "/login";
          }, 2000);
        } else {
          toast.error("Failed to load profile data.");
        }
      }
    };

    fetchProfileData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: name === "experience" ? (value ? Number(value) : null) : value,
    }));
  };

  const handleAvailabilityChange = (e) => {
    const value = e.target.value === "true";
    setProfileData((prev) => ({
      ...prev,
      availability: value,
    }));
  };

  const handleSaveChanges = async () => {
    if (!checkAuthentication()) return;

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    const payload = {
      firstName: profileData.firstName,
      lastName: profileData.lastName,
      email: profileData.email,
      phone: profileData.phone,
    };

    if (profileData.role === "service_provider") {
      payload.servicesCategory = profileData.servicesCategory || null;
      payload.experience = profileData.experience
        ? Number(profileData.experience)
        : null;
      payload.location = profileData.location || null;
      payload.bio = profileData.bio || null;
      payload.availability = profileData.availability ?? true;
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/user/${userId}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const fetchResponse = await axios.get(
          `http://localhost:5000/api/user/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (fetchResponse.status === 200) {
          setProfileData(fetchResponse.data);
          setIsEditing(false);
          toast.success("Profile updated successfully!");
        } else {
          throw new Error("Failed to fetch updated profile");
        }
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error("Session expired. Please login again.");
        setTimeout(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          window.location.href = "/login";
        }, 2000);
      } else {
        toast.error("Failed to update profile. Please try again.");
      }
    }
  };

  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (!token || !userId) {
        toast.error("Authentication required. Please login again.");
        return;
      }

      await axios.delete(`http://localhost:5000/api/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("userId");

      toast.success("Account deleted successfully!", {
        position: "top-right",
        autoClose: 1200,
      });

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error("Failed to delete account. Please try again.");
    }
    setShowDeleteModal(false);
  };

  const handleViewReservations = () => {
    navigate("/reservations");
  };

  return (
    <Container fluid className="p-0">
      <ToastContainer />
      <Navbar />
      <div className="profile-container">
        <div className="main-content">
          <h2 className="mb-4 profile-title">My Professional Profile</h2>
          <Card className="mb-4 profile-details-card">
            <Card.Body>
              <h4 className="mb-3">Profile Details</h4>
              {isEditing ? (
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="firstName"
                          value={profileData.firstName || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          name="lastName"
                          value={profileData.lastName || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={profileData.email || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          name="phone"
                          value={profileData.phone || ""}
                          onChange={handleInputChange}
                          required
                        />
                      </Form.Group>
                    </Col>
                    {profileData.role === "service_provider" && (
                      <>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Job (Service Category)</Form.Label>
                            <Form.Select
                              name="servicesCategory"
                              value={profileData.servicesCategory || ""}
                              onChange={handleInputChange}
                              required
                            >
                              <option value="">Select a category</option>
                              {categories.map((category) => (
                                <option key={category} value={category}>
                                  {category}
                                </option>
                              ))}
                            </Form.Select>
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Years of Experience</Form.Label>
                            <Form.Control
                              type="number"
                              name="experience"
                              value={profileData.experience ?? ""}
                              onChange={handleInputChange}
                              min="0"
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              name="location"
                              value={profileData.location || ""}
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              name="bio"
                              value={profileData.bio || ""}
                              onChange={handleInputChange}
                              required
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Availability</Form.Label>
                            <Form.Select
                              name="availability"
                              value={profileData.availability ?? true}
                              onChange={handleAvailabilityChange}
                              required
                            >
                              <option value={true}>Available</option>
                              <option value={false}>Not Available</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </>
                    )}
                  </Row>
                  <Button
                    variant="success"
                    className="action-btn me-2"
                    onClick={handleSaveChanges}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="secondary"
                    className="action-btn"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </Form>
              ) : (
                <>
                  <Row>
                    <Col md={6}>
                      <p>
                        <FaUser className="me-2 text-muted icon" />
                        <strong>Full Name:</strong>{" "}
                        {profileData.firstName || profileData.lastName
                          ? `${profileData.firstName} ${profileData.lastName}`.trim()
                          : "N/A"}
                      </p>
                      {profileData.role === "service_provider" && (
                        <p>
                          <FaUser
                            className="me-2 text-muted picon"
                            style={{ color: "#00C846" }}
                          />
                          <strong>Job:</strong>{" "}
                          {profileData.servicesCategory || "N/A"}
                        </p>
                      )}
                      <p>
                        <FaPhone
                          className="me-2 text-muted picon"
                          style={{ color: "#00C846" }}
                        />
                        <strong>Phone:</strong> {profileData.phone || "N/A"}
                      </p>
                    </Col>
                    <Col md={6}>
                      <p>
                        <FaEnvelope
                          className="me-2 text-muted picon"
                          style={{ color: "#00C846" }}
                        />
                        <strong>Email:</strong> {profileData.email || "N/A"}
                      </p>
                      {profileData.role === "service_provider" && (
                        <>
                          <p>
                            <FaMapMarkerAlt
                              className="me-2 text-muted picon"
                              style={{ color: "#00C846" }}
                            />
                            <strong>Address:</strong>{" "}
                            {profileData.location || "N/A"}
                          </p>
                          <p>
                            <strong>Bio:</strong> {profileData.bio || "N/A"}
                          </p>
                        </>
                      )}
                    </Col>
                  </Row>
                  <div className="mt-3">
                    <Button
                      variant="primary"
                      className="action-btn me-2"
                      onClick={() => setIsEditing(true)}
                    >
                      <FaUser className="me-2" />
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      className="action-btn"
                      onClick={handleShowDeleteModal}
                    >
                      <FaTrash className="me-2" />
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
          <ProfileContainer
            icon={<FaCalendarCheck />}
            title="View Reservations"
            subtitle="Check your upcoming and past reservations"
            buttonText="View"
            onButtonClick={handleViewReservations}
            cardType="reservations"
          />
          {profileData.role === "service_provider" && (
            <Card className="availability-card mt-4">
              <Card.Body>
                <h4>Disponibilités</h4>
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span>
                      <FaClock className="me-2 text-muted" />
                      Lundi - Vendredi
                    </span>
                    <span className="text-muted">8h - 18h</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span>
                      <FaClock className="me-2 text-muted" />
                      Samedi
                    </span>
                    <span className="text-muted">9h - 14h</span>
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex justify-content-between align-items-center">
                    <span>
                      <FaClock className="me-2 text-muted" />
                      Dimanche
                    </span>
                    <span className="text-muted">Fermé</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          )}
        </div>
      </div>

      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        centered
        className="delete-confirmation-modal"
      >
        <Modal.Header closeButton className="modal-header">
          <Modal.Title className="modal-title">
            Confirmer la suppression
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body">
          Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est
          irréversible.
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button
            variant="outline-secondary"
            className="modal-cancel-btn"
            onClick={handleCloseDeleteModal}
          >
            Annuler
          </Button>
          <Button
            variant="danger"
            className="modal-confirm-btn"
            onClick={handleConfirmDelete}
          >
            Oui
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Profile;