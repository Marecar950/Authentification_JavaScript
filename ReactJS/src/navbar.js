import { useContext } from "react";
import {Link} from "react-router-dom";
import Contexte from "./contexte.js";
  
  function Navbar() {
  
   const { isAuthenticated, logout } = useContext(Contexte);
   
   const Logout = () => {
     logout();
   };
  
  return (
 
    <nav className="navbar navbar-expand navbar-dark bg-primary">
     <div className="container">
     <ul className="navbar-nav ms-auto"> 
        { (!isAuthenticated && (
        <>
          <li class="nav-link">
            <Link className="navbar-brand" to='/'>Inscription</Link>
          </li>
          <li class="nav-link">
            <Link className="navbar-brand" to='/connexion'>Connexion</Link>
          </li>
        </> 
        )) || (
        <>
          <li class="nav-link">
            <button className="bouton_logout" onClick={Logout}>Déconnexion</button>
          </li>
        </>
        )}
     </ul>
     </div>
     </nav>
  )
  }
   
 export default Navbar;
