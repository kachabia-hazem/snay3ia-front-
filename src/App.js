import logo from "./logo.svg";
 import "./App.css";
 import Login from "./components/Login";
 import Register from "./components/Register";
 import { Router, Routes, Route } from "react-router-dom";
 import "./index.css";
 import Acceuil from "./pages/Acceuil";
 import ClientRequestForm from "./pages/ClientRequestForm";
  import Profile from "./pages/Profile";
  import About from "./pages/About";
 function App() {
   return (
     <div className="App">
       <Routes>
         <Route path="/" element={<aa />} />
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
         <Route path="/acceuil" element={<Acceuil />} />
          <Route path="/client-request-form" element={<ClientRequestForm />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
        </Routes>
     </div>
   );
 }
 
 export default App;