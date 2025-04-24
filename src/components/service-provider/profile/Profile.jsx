import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  ListGroup,
} from "react-bootstrap";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../SideBar/SideBar";
import "./Profile.css"; // Assurez-vous que ce fichier existe
import axios from "axios";
import ProfileCard from "./Card";
import { FaStar } from "react-icons/fa6";

const Profile = () => {
  // Données par défaut
  const defaultProfileData = {
    firstName: "Non défini",
    lastName: "",
    email: "Non défini",
    phone: "Non défini",
    role: "Non défini",
    servicesCategory: "Non défini",
    experience: "Non défini",
    location: "Non défini",
    bio: "Aucune bio disponible",
    availability: [],
  };

  // State pour stocker les données du profil
  const [profileData, setProfileData] = useState(defaultProfileData);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);

  // Fetch user data from the backend
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
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      console.log("Token from localStorage:", token);
      console.log("UserId from localStorage:", userId);

      if (!token) {
        console.error("No token found, user not authenticated");
        return;
      }

      if (!userId) {
        console.error("No user ID found in localStorage");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:5000/api/user/${userId}`
        );

        if (response.status === 200) {
          console.log("Profile data fetched:", response.data);
          setProfileData({ ...defaultProfileData, ...response.data });
        }
      } catch (error) {
        console.error(
          "Error fetching profile data:",
          error.response?.data || error.message
        );
      }
    };

    fetchProfileData();
  }, []);

  return (
    <Container fluid className="p-0 profile-container">
      <Row className="m-0">
        {/* Sidebar */}
        <Col md={2} className="p-0">
          <Sidebar />
        </Col>
        {/* Contenu principal */}
        <Col md={10} className="p-4 main-content">
          <h2 className="mb-4 profile-title">My professional profile</h2>
          {/* Profile Cards in a horizontal list */}
          <ul className="profile-cards-list">
            <li>
              <ProfileCard
                icon={<FaUser />}
                title="personal information"
                subtitle="manage your contact information and public profile"
                buttonText="Edit"
                onButtonClick={() => setIsEditing(!isEditing)}
                cardType="info"
              />
            </li>
            <li>
              <ProfileCard
                icon={<FaStar />}
                title="average rating"
                subtitle="4.5/5 stars based on 100 reviews"
                buttonText="View reviews"
                cardType="rating"
              />
            </li>
          </ul>
          {/* Informations personnelles */}
          <Card className="mb-4 profile-details-card">
            <Card.Body>
              <h4 className="mb-3">Profile details</h4>
              {isEditing ? (
                <Form>
                  <Row>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={profileData.firstName}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          defaultValue={profileData.lastName}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          type="email"
                          defaultValue={profileData.email}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group className="mb-3">
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                          type="tel"
                          defaultValue={profileData.phone}
                        />
                      </Form.Group>
                    </Col>

                    {/* Display extra fields if user is a service provider */}
                    {profileData.role === "service_provider" && (
                      <>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Job (Service Category)</Form.Label>
                            <Form.Select
                              defaultValue={profileData.servicesCategory}
                            >
                              <option>Select a category</option>
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
                              defaultValue={profileData.experience}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                              type="text"
                              defaultValue={profileData.location}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={12}>
                          <Form.Group className="mb-3">
                            <Form.Label>Bio</Form.Label>
                            <Form.Control
                              as="textarea"
                              rows={3}
                              defaultValue={profileData.bio}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Availability</Form.Label>
                            <Form.Select
                              defaultValue={profileData.availability}
                            >
                              <option value={true}>Available</option>
                              <option value={false}>Not Available</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </>
                    )}
                  </Row>
                  <Button variant="success" className="action-btn">
                    Save Changes
                  </Button>
                </Form>
              ) : (
                <Row>
                  <Col md={6}>
                    <p>
                      <FaUser className="me-2 text-muted icon" />
                      <strong>Full Name :</strong>{" "}
                      {`${profileData.firstName} ${profileData.lastName}`}
                    </p>
                    <p>
                      <FaUser
                        className="me-2 text-muted picon"
                        style={{ color: "#00C846" }}
                      />
                      <strong>Job :</strong> {profileData.servicesCategory}
                    </p>
                    <p>
                      <FaPhone
                        className="me-2 text-muted picon"
                        style={{ color: "#00C846" }}
                      />
                      <strong>Phone :</strong> {profileData.phone}
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <FaEnvelope
                        className="me-2 text-muted picon"
                        style={{ color: "#00C846" }}
                      />
                      <strong>Email:</strong> {profileData.email}
                    </p>
                    <p>
                      <FaMapMarkerAlt
                        className="me-2 text-muted picon"
                        style={{ color: "#00C846" }}
                      />
                      <strong>Address:</strong> {profileData.location}
                    </p>
                    <p>
                      <strong>Bio:</strong> {profileData.bio}
                    </p>
                  </Col>
                </Row>
              )}
            </Card.Body>
          </Card>

          {/* Disponibilités */}
          <Card className="availability-card">
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
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
