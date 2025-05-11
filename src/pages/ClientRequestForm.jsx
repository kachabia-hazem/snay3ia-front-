
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/ClientRequestForm.css";

const SERVICE_TYPES = [
  "Construction", "Plumbing", "Electrical Wiring", "Painting", "Carpentry",
  "Roofing", "Flooring", "Home Renovation", "Gardening", "Pest Control",
  "Air Conditioning", "Cleaning", "Furniture Assembly", "Smart Home Setup",
  "Wallpaper Installation", "Window Repair", "Gutter Cleaning",
  "Pool Maintenance", "Moving and Transport", "Home Security"
];

const URGENCY_LEVELS = [
  { value: "low", label: "Faible (1 semaine+)" },
  { value: "medium", label: "Moyenne (2-3 jours)" },
  { value: "high", label: "Haute (< 24 heures)" }
];

const DISPONIBILITES = ["Matin", "Apres-midi", "Soir"];

 

const ServiceRequestForm = () => {
  const { workerId } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      urgency: "medium" // Set default value
    }
  });
  const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
  const [clientId, setClientId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  useEffect(() => {
    // In a real app, get client ID from auth context
    // const mockClientId = "662f7638427d0d5b0dc7e46a";
    const userId = localStorage.getItem("userId");
    setClientId(userId);
  }, []);

  const handleTimeSlotChange = (slot, isChecked) => {
    setSelectedTimeSlots(prev => ({
      ...prev,
      [slot]: isChecked
    }));
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      // Get selected time slots
      const availability = Object.keys(selectedTimeSlots)
        .filter(slot => selectedTimeSlots[slot])
        .map(slot => ({
          period: slot,
          startTime: data[`startTime_${slot}`],
          endTime: data[`endTime_${slot}`]
        }));

      const requestData = {
        fullName: data.nom,
        phone: data.telephone,
        address: data.adresse,
        serviceRequested: data.serviceType,
        preferredDate: `${data.date}T10:00:00.000Z`,
        client: clientId,
        serviceProvider: workerId,
        description: data.serviceDescription,
        urgency: data.urgence,
        availability: availability
      };

      console.log("Submitting request:", requestData);

      const response = await fetch('http://localhost:5000/api/requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}` // Add auth if needed
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      alert("Votre demande a été envoyée avec succès!");
    
    // Navigate to home page after alert
    navigate('/Acceuil');
    } catch (error) {
      console.error('Error submitting request:', error);
      alert(`Error submitting request: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Demande de Service</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        
        <div className="form-group">
          <label className="form-label">Nom du client</label>
          <input 
            {...register("nom", { required: "Nom requis" })} 
            className="form-input" 
            placeholder="Entrez votre nom" 
          />
          {errors.nom && <p className="error-message">{errors.nom.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Téléphone</label>
          <input 
            type="tel" 
            {...register("telephone", { 
              required: "Numéro requis",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Numéro de téléphone invalide"
              }
            })} 
            className="form-input" 
            placeholder="Votre numéro" 
          />
          {errors.telephone && <p className="error-message">{errors.telephone.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Adresse du client</label>
          <input 
            type="text" 
            {...register("adresse", { required: "Adresse requise" })} 
            className="form-input" 
            placeholder="Entrez votre adresse" 
          />
          {errors.adresse && <p className="error-message">{errors.adresse.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Type de service</label>
          <select
            {...register("serviceType", { required: "Type de service requis" })}
            className="form-select"
          >
            <option value="">Sélectionnez un service</option>
            {SERVICE_TYPES.map((service) => (
              <option key={service} value={service}>{service}</option>
            ))}
          </select>
          {errors.serviceType && <p className="error-message">{errors.serviceType.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Description du service</label>
          <textarea 
            {...register("serviceDescription", { required: "Description requise" })} 
            className="form-input"
            placeholder="Décrivez en détail le service demandé"
            rows={4}
          />
          {errors.serviceDescription && <p className="error-message">{errors.serviceDescription.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Urgency Level</label>
          <select 
            {...register("urgency", { required: "Please select urgency level" })} 
            className="form-select"
          >
            {URGENCY_LEVELS.map((level) => (
              <option key={level.value} value={level.value}>
                {level.label}
              </option>
            ))}
          </select>
          {errors.urgency && <p className="error-message">{errors.urgency.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Date souhaitée</label>
          <input 
            type="date" 
            {...register("date", { required: "Date requise" })} 
            className="form-input" 
            min={new Date().toISOString().split('T')[0]}
          />
          {errors.date && <p className="error-message">{errors.date.message}</p>}
        </div>

        <div className="form-group">
          <label className="form-label">Disponibilités</label>
          <div className="availability-container">
            {DISPONIBILITES.map((slot) => (
              <div key={slot} className="availability-item">
                <label className="availability-label">
                  <input 
                    type="checkbox" 
                    {...register("disponibilites")} 
                    value={slot}
                    onChange={(e) => handleTimeSlotChange(slot, e.target.checked)}
                    className="availability-checkbox"
                  />
                  <span className="availability-text">{slot}</span>
                </label>
                {selectedTimeSlots[slot] && (
                  <div className="time-input-group highlighted-time-group">
                    <input 
                      type="time" 
                      {...register(`startTime_${slot}`)} 
                      className="time-input"
                    />
                    <span className="time-separator">à</span>
                    <input 
                      type="time" 
                      {...register(`endTime_${slot}`)} 
                      className="time-input"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
        </button>
      </form>
    </div>
  );
};

export default ServiceRequestForm;