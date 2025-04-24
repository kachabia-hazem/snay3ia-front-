import {
  Routes,
  Route,
  BrowserRouter,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import "./index.css";
// import ClientDashboard from "./components/ClientDashboard";
import ServiceRequestForm from "./pages/ClientRequestForm";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Acceuil from "./pages/Acceuil";
import Profile from "./components/service-provider/profile/Profile";
import Settings from "./components/service-provider/settings/Settings";
import RequestsTable from "./components/RequestsTable";
import "bootstrap/dist/css/bootstrap.min.css";
import ConsultRequests from "./pages/ConsultRequests";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/serviceProviderProfile" element={<Profile />} />
        {/* <Route path="/dashboard" element={<ClientDashboard />} /> */}
        <Route path="/ClientRequestForm" element={<ServiceRequestForm />} />
        <Route path="/serviceProviderSettings" element={<Settings />} />
        <Route path="/RequestsTable" element={<RequestsTable />} />
        <Route path="/consultRequests" element={<ConsultRequests />} />
        <Route path="/Acceuil" element={<Acceuil />} />
      </Routes>
    </div>
  );
}

export default App;
