import { useState } from "react";
import {Routes, Route} from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./navbar.js";
import Inscription from "./inscription.js";
import Connexion from "./connexion.js";
import Profile from "./profile.js";
import Contexte from "./contexte.js";
import AuthenticatedRoutes from "./Authentification_routes.js";
import VerificationMail from "./verification_mail";
import ConfirmationPassword from "./confirmation_password";
import "./App.css";

  function App() {
  
   const [isAuthenticated, setIsAuthenticated] = useState(false);
  
   const login = () => {
     setIsAuthenticated(true);
   };
   
   const logout = () => {
     setIsAuthenticated(false);
     window.localStorage.removeItem("user");
   };
   
  return (
    <Contexte.Provider value={{ isAuthenticated, login, logout }}>
    <Navbar />

      <div className="container mt-2">
      
       <Routes>
         <Route path="/" element={<Inscription />} />
         <Route path="/connexion" element={<Connexion />} />
         <Route path="/verification_mail" element={<VerificationMail />} />
         <Route path="/confirmation_password" element={<ConfirmationPassword />} />
          
         <Route element={<AuthenticatedRoutes />}>
           <Route path="/profile" element={<Profile />} />
         </Route>
         
       </Routes>
      
      </div>
    </Contexte.Provider>
  );
  };

export default App;
