import { useState } from "react";
 import { useForm } from "react-hook-form";
 import "../styles/ClientRequestForm.css";
 
 const URGENCE_OPTIONS = ["Urgence (intervention < 24h)", "Standard (2-3 jours)", "Planifié (1 semaine+)"];
 const DISPONIBILITES = ["Matin", "Apres-midi", "Soir"];
 
 const ServiceRequestForm = () => {
   const { register, handleSubmit, formState: { errors } } = useForm();
   const [selectedTimeSlots, setSelectedTimeSlots] = useState({});
 
   const handleTimeSlotChange = (slot, isChecked) => {
     setSelectedTimeSlots(prev => ({
       ...prev,
       [slot]: isChecked
     }));
   };
 
   const onSubmit = (data) => {
     console.log("Demande envoyée :", data);
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
             {...register("telephone", { required: "Numéro requis" })} 
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
           <label className="form-label">Urgence</label>
           <select 
             {...register("urgence", { required: "Indiquez l'urgence" })} 
             className="form-select"
           >
             <option value="">Sélectionnez un niveau d'urgence</option>
             {URGENCE_OPTIONS.map((option) => (
               <option key={option} value={option}>{option}</option>
             ))}
           </select>
           {errors.urgence && <p className="error-message">{errors.urgence.message}</p>}
         </div>
 
         <div className="form-group">
           <label className="form-label">Date souhaitée</label>
           <input 
             type="date" 
             {...register("date", { required: "Date requise" })} 
             className="form-input" 
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
 
         <button type="submit" className="submit-button">Envoyer la demande</button>
       </form>
     </div>
   );
 };
 
 export default ServiceRequestForm;