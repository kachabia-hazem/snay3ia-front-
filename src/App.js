import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom"; // Removed unused Router import
import "./index.css";
import Acceuil from "./pages/Acceuil";
import ClientRequestForm from "./pages/ClientRequestForm";
import Profile from "./pages/Profile";
import About from "./pages/About";
import ConsultRequests from "./pages/ConsultRequests";
import ReservationsPage from "./pages/ReservationsPage"; // Added import for ReservationsPage

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/acceuil" element={<Acceuil />} />
        <Route path="/client-request-form/:workerId" element={<ClientRequestForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} /> {/* Fixed case to lowercase */}
        <Route path="/consult-requests" element={<ConsultRequests />} /> {/* Fixed case */}
        <Route path="/reservations" element={<ReservationsPage />} /> {/* Fixed route */}
      </Routes>
    </div>
  );
}

export default App;