import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faMapMarkerAlt, 
  faStar,
  faStarHalfAlt,
  faTools,
  faEnvelope
} from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // ⬅️ Ajouter ceci

function CardOuvrier() {
  const navigate = useNavigate(); // ⬅️ Initialiser le hook

  // Fonction pour afficher les étoiles
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`full-${i}`} icon={faStar} className="text-warning" />);
    }
    if (hasHalfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-warning" />);
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={faStar} className="text-secondary" />);
    }
    return stars;
  };

  const fakeWorkers = [
    {
      id: 1,
      name: "Mohamed Benali",
      address: "123 Rue Hassan II, Casablanca",
      avis: 4.8,
      metier: "Plombier",
      image: './assets/images/img.png'  
    },
    {
      id: 2,
      name: "Fatima Zahra",
      address: "45 Avenue Mohammed V, Rabat",
      avis: 3.5,
      metier: "Electricienne",
      image: './assets/images/img.png'
    },
    {
      id: 3,
      name: "Founes Aya",
      address: "Rome/italy",
      avis: 5,
      metier: "best ingeneer",
      image: './assets/images/img.png'  
    },
    {
      id: 4,
      name: "Kachabia Hazem",
      address: "Rome/italy",
      avis: 5,
      metier: "best ingeneer wo houma baad houmae ",
      image: './assets/images/img.png'  
    }
  ];

  // Fonction pour naviguer vers le formulaire
  const handleContactClick = () => {
    navigate('/ClientRequestForm'); // ⬅️ Redirection
  };

  return (
    <div className="d-flex flex-wrap gap-4">
      {fakeWorkers.map(worker => (
        <Card key={worker.id} style={{ width: '22rem' }} className="mb-4 shadow-sm">
          <Card.Body>
            <Card.Title className="text-center">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              {worker.name}
            </Card.Title>
          </Card.Body>
          <Card.Img 
            variant="top" 
            src={worker.image} 
            style={{ height: '180px', objectFit: 'contain', padding: '1rem' }} 
          />
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              <FontAwesomeIcon icon={faTools} className="me-2 text-primary" />
              <strong>Métier:</strong> {worker.metier}
            </ListGroup.Item>
            <ListGroup.Item>
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-danger" />
              <strong>Adresse:</strong> {worker.address}
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-flex align-items-center">
                <span className="me-2"><strong>Avis:</strong></span>
                <div>
                  {renderStars(worker.avis)}
                  <span className="ms-2 small text-muted">({worker.avis.toFixed(1)})</span>
                </div>
              </div>
            </ListGroup.Item>
          </ListGroup>
          <Card.Body className="text-center">
            <button onClick={handleContactClick} className="btn btn-primary">
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />
              Contacter
            </button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default CardOuvrier;
