import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const userId = localStorage.getItem("userId"); // assure-toi que l'ID est stocké au login

        if (!token || !userId) {
          throw new Error("Token ou ID utilisateur manquant");
        }

        const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur lors du chargement du profil");
        }

        const data = await response.json();
        setUserData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) return <p className="text-center">Chargement...</p>;
  if (error) return <p className="text-center text-danger">Erreur : {error}</p>;

  return (
    <div className="profile-container">
      <Navbar />
      <div className="profile-card">
        <img
          src="https://i.pravatar.cc/150?img=3"
          alt="avatar"
          className="profile-avatar"
        />
        <h2>{userData.firstName} {userData.lastName}</h2>
        <p><strong>Email :</strong> {userData.email}</p>
        <p><strong>Téléphone :</strong> {userData.phone || "Non renseigné"}</p>
        <p><strong>Rôle :</strong> {userData.role}</p>
        {userData.servicesCategory && (
          <>
            <p><strong>Catégorie :</strong> {userData.servicesCategory}</p>
            <p><strong>Expérience :</strong> {userData.experience} ans</p>
            <p><strong>Localisation :</strong> {userData.location}</p>
            <p><strong>Bio :</strong> {userData.bio}</p>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
