// src/components/About.jsx
import { Helmet } from 'react-helmet';
import '../styles/About.css';
import Navbar from '../components/Navbar.jsx';
export default function About() {
  const teamMembers = [
    { name: 'Aya Founès', initials: 'AF' },
    { name: 'Hazem Kachabia', initials: 'HK' },
    { name: 'Salma Merzoug',initials: 'SM' },
    { name: 'Rayen Mrad',initials: 'RM' },
  ];

  return (
    <>
    <div className="consult-requests-page">
      <Navbar />
      <Helmet>
        <title>À Propos - Sney3iya</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Helmet>
      <div className="main-container">
        {/* Hero Section */}
        <section
          className="hero-section"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1516321318428-4b2b6a0d9f66?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
          }}
        >
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <h1 className="hero-title">À Propos de Sney3iya</h1>
            <p className="hero-text">
              Découvrez l'histoire derrière Sney3iya, une plateforme innovante qui connecte les artisans qualifiés aux clients en quête de services professionnels.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mission-section">
          <div className="section-content">
            <h2 className="section-title">Notre Mission</h2>
            <p className="section-text">
              Sney3iya est une plateforme conçue pour simplifier la mise en relation entre artisans qualifiés (plombiers, électriciens, maçons, etc.) et clients à la recherche de services fiables. Nous offrons une expérience fluide et sécurisée, permettant aux clients de trouver des professionnels près de chez eux et aux artisans de promouvoir leurs compétences et de gérer leurs prestations efficacement.
            </p>
          </div>
        </section>

        {/* Team Section */}
        <section className="team-section">
          <div className="section-content">
            <h2 className="section-title">Notre Équipe</h2>
            <div className="team-grid">
              {teamMembers.map((member, index) => (
                <div key={index} className="team-card">
                  <div className="team-avatar">
                    <span className="avatar-initials">{member.initials}</span>
                  </div>
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="cta-section">
          <div className="section-content">
            <h2 className="section-title">Pourquoi Choisir Sney3iya ?</h2>
            <p className="section-text">
              Avec Sney3iya, trouvez des artisans de confiance en quelques clics ou développez votre activité en tant que professionnel. Notre plateforme sécurisée, intuitive et moderne garantit une expérience optimale pour tous.
            </p>
            <a href="#" className="cta-button">
              Rejoignez-nous dès aujourd'hui !
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="footer">
          <p>© 2025 Sney3iya. Tous droits réservés.</p>
        </footer>
      </div>
    </div>
    </>
  );
}