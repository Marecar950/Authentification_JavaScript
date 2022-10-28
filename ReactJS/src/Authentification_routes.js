import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Contexte from "./contexte.js";
import Profile from "./profile";

  const AuthenticatedRoutes = () => {
  
    const { isAuthenticated } = useContext(Contexte);
           
     return isAuthenticated ? <Profile /> : <Navigate to='/connexion' />;
  };
  
export default AuthenticatedRoutes;
