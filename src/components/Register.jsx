import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import "../styles/Login.css";

const RegisterForm = () => {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    role: "client",
    servicesCategory: "",
    experience: "",
    location: "",
    bio: "",
    availability: true,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [categories, setCategories] = useState([]);
  const [passwordError, setPasswordError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");

  const navigate = useNavigate(); // Initialiser useNavigate

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "password") {
      if (value.length < 8) {
        setPasswordError(
          "Le mot de passe doit contenir au moins 8 caractères."
        );
      } else {
        setPasswordError("");
      }
    }

    if (name === "servicesCategory") {
      setCategoryError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSubmitStatus("");

    if (formData.password.length < 8) {
      setPasswordError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (formData.role === "service_provider" && !formData.servicesCategory) {
      setCategoryError("Veuillez sélectionner une catégorie de service.");
      return;
    }

    const dataToSend = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role,
    };

    if (formData.role === "service_provider") {
      dataToSend.servicesCategory = formData.servicesCategory;
      dataToSend.experience = formData.experience;
      dataToSend.location = formData.location;
      dataToSend.bio = formData.bio;
      dataToSend.availability = formData.availability;
    }

    console.log("Données envoyées :", dataToSend);

    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });
      const responseData = await response.json();
      if (response.ok) {
        // Afficher une alerte et naviguer après confirmation
        alert("Inscription réussie !");
        setFormData(initialFormData); // Réinitialiser le formulaire
        setPasswordError("");
        setCategoryError("");
        navigate("/login"); // Naviguer vers la page de connexion
        console.log("Registration successful", responseData);
      } else {
        setSubmitStatus(responseData.message || "Échec de l'inscription.");
        console.log("Registration failed", responseData);
      }
    } catch (error) {
      setSubmitStatus("Erreur réseau. Veuillez réessayer.");
      console.log("Error registering", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src="/assets/images/logo.png" className="logo" />

        <h1 className="login-title">Inscription</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Prénom :</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Nom :</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email :</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Téléphone :</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mot de passe :</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div className="form-group">
            <label>Rôle :</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="client">Client</option>
              <option value="service_provider">Prestataire de service</option>
            </select>
          </div>
          {formData.role === "service_provider" && (
            <>
              <div className="form-group">
                <label>Catégorie de service :</label>
                <select
                  name="servicesCategory"
                  value={formData.servicesCategory}
                  onChange={handleChange}
                  required
                >
                  <option value="">Sélectionnez une catégorie</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                {categoryError && (
                  <p className="error-message">{categoryError}</p>
                )}
              </div>
              <div className="form-group">
                <label>Expérience (années) :</label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Localisation :</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Bio :</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>
              <div className="form-group remember-me">
                <input
                  type="checkbox"
                  name="availability"
                  checked={formData.availability}
                  onChange={handleChange}
                />
                <label>Disponible pour les services</label>
              </div>
            </>
          )}
          <button type="submit" className="login-button">
            S'inscrire
          </button>
          {submitStatus && (
            <p
              className={
                submitStatus.includes("réussie")
                  ? "success-message"
                  : "error-message"
              }
            >
              {submitStatus}
            </p>
          )}
        </form>
        <p className="register-link">
          Vous avez déjà un compte ?{" "}
          <a href="/login" className="register-link-text">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;