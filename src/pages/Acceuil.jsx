import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import ClientRequestForm from "./ClientRequestForm";
import {
  FiZap,
  FiDroplet,
  FiBook,
  FiLayers,
  FiTool,
  FiHome,
} from "react-icons/fi";
import "../styles/acceuil.css";
import Footer from "../components/Footer";
import CardOuvrier from "../components/Card";
import "bootstrap/dist/css/bootstrap.min.css";

function Acceuil() {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedArtisan, setSelectedArtisan] = useState(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let animationId;
    let scrollAmount = 0;
    const speed = 1;

    const scroll = () => {
      if (scrollContainer) {
        scrollAmount += speed;
        if (scrollAmount >= scrollContainer.scrollWidth / 2) {
          scrollAmount = 0;
        }
        scrollContainer.style.transform = `translateX(-${scrollAmount}px)`;
      }
      animationId = requestAnimationFrame(scroll);
    };

    scroll();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/service-categories"
        );
        if (!response.ok) {
          throw new Error(`Failed to fetch categories: ${response.statusText}`);
        }
        const data = await response.json();
        
        const categoryIcons = {
          Construction: <FiLayers className="category-icon" />,
          Plumbing: <FiZap className="category-icon" />,
          "Electrical Wiring": <FiZap className="category-icon" />,
          Painting: <FiDroplet className="category-icon" />,
          Carpentry: <FiTool className="category-icon" />,
          Roofing: <FiHome className="category-icon" />,
          Flooring: <FiLayers className="category-icon" />,
          "Home Renovation": <FiHome className="category-icon" />,
          Gardening: <FiDroplet className="category-icon" />,
          "Pest Control": <FiTool className="category-icon" />,
          "Air Conditioning": <FiZap className="category-icon" />,
          Cleaning: <FiDroplet className="category-icon" />,
          "Furniture Assembly": <FiTool className="category-icon" />,
          "Smart Home Setup": <FiZap className="category-icon" />,
          "Wallpaper Installation": <FiLayers className="category-icon" />,
          "Window Repair": <FiTool className="category-icon" />,
          "Gutter Cleaning": <FiDroplet className="category-icon" />,
          "Pool Maintenance": <FiHome className="category-icon" />,
          "Moving and Transport": <FiTool className="category-icon" />,
          "Home Security": <FiZap className="category-icon" />,
        };

        const mappedCategories = data.map((categoryName) => ({
          name: categoryName,
          icon: categoryIcons[categoryName] || <FiHome className="category-icon" />,
        }));

        setCategories(mappedCategories);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleContactClick = (artisan) => {
    setSelectedArtisan(artisan);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setSelectedArtisan(null);
  };

  return (
    <div className="acceuil-container">
      <Navbar />

      <div className="acceuil-content">
        <h1>Parcourir les principales catégories de métiers artisanaux</h1>

        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}

        {!loading && !error && (
          <div className="categories-container">
            <div className="categories-track">
              <div className="categories-scroll" ref={scrollRef}>
                {categories.map((category, index) => (
                  <div key={index} className="category-card">
                    <div className="icon-container">{category.icon}</div>
                    <h3>{category.name}</h3>
                  </div>
                ))}
                {categories.map((category, index) => (
                  <div key={`copy-${index}`} className="category-card">
                    <div className="icon-container">{category.icon}</div>
                    <h3>{category.name}</h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <h1
        style={{
          color: "#2c3e50",
          fontSize: "2.5rem",
          fontWeight: "600",
          marginBottom: "1.5rem",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        Nos Artisans
      </h1>
      <br />
      <CardOuvrier onContactClick={handleContactClick} />

      {showForm && (
        <ClientRequestForm
          artisan={selectedArtisan}
          onClose={handleFormClose}
        />
      )}

      <Footer />
    </div>
  );
}

export default Acceuil;