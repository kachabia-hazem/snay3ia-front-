import React, { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
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
  const [artisans, setArtisans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll animation for categories
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

  // Fetch categories and artisans
  useEffect(() => {
    // Fetch categories
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

        const mappedCategories = data.map((category, index) => {
          if (!category || !category.name) {
            console.warn(`Invalid category at index ${index}:`, category);
            return {
              name: "Unknown",
              count: 0,
              icon: <FiHome className="category-icon" />,
            };
          }
          return {
            name: category.name,
            count: category.articleCount || 0,
            icon: categoryIcons[category.name] || (
              <FiHome className="category-icon" />
            ),
          };
        });

        setCategories(mappedCategories);
      } catch (error) {
        setError(error.message);
      }
    };

    // Fetch artisans
    const fetchArtisans = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/artisans");
        if (!response.ok) {
          throw new Error(`Failed to fetch artisans: ${response.statusText}`);
        }
        const data = await response.json();
        setArtisans(data);
      } catch (error) {
        setError(error.message);
      }
    };

    // Fetch both categories and artisans
    Promise.all([fetchCategories(), fetchArtisans()])
      .then(() => setLoading(false))
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

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
                    <p>Articles: {category.count}</p>
                  </div>
                ))}
                {categories.map((category, index) => (
                  <div key={`copy-${index}`} className="category-card">
                    <div className="icon-container">{category.icon}</div>
                    <h3>{category.name}</h3>
                    <p>Articles: {category.count}</p>
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
      <div className="artisans-container">
        {artisans.length > 0 ? (
          artisans.map((artisan, index) => (
            <CardOuvrier
              key={index}
              firstName={artisan.firstName}
              lastName={artisan.lastName}
              category={artisan.servicesCategory}
              experience={artisan.experience}
              location={artisan.location}
              bio={artisan.bio}
              availability={artisan.availability}
            />
          ))
        ) : (
          <p>No artisans found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Acceuil;