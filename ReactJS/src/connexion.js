import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import Axios from "axios";
import avatar from "./avatar.png";
import Contexte from "./contexte.js";

  function Connexion() {
  
   const navigate = useNavigate();
   const { isAuthenticated, login, logout } = useContext(Contexte);
  
   const [formValeur, setFormValeur] = useState({
     email: "",
     password: ""
   });

   const handleChange = (e) => {
     const { name, value } = e.target;
      setFormValeur({ ...formValeur, [name]: value});
   };
  
   const [connexionReussie, setConnexionReussie ] = useState({
     identifiant: "",
     nom: "",
     prenom: "",
     mail: "",
     success: false
   });

   const [formErreur, setFormErreur] = useState('');
   
   const [connexionErreur, setConnexionErreur] = useState('');
  
   const handleSubmit = (e) => {
     e.preventDefault();
     setFormErreur(validation(formValeur));
   };
 
   const validation = (valeur) => {
    const erreur = {};
    
    if (valeur.email.trim() === "") {
      erreur.email = "Veuillez entrez votre adresse email !";
    } if (!valeur.password) {
        erreur.password = "Veuillez entrez votre mot de passe !";
      } 
    return erreur;
   };
  
   const Connecter  = () => {
    
     Axios.post("https://node-express-authentification.herokuapp.com/connexion", {
      email: formValeur.email,
      password: formValeur.password,
     }).then((response) => {
      
     if(response.data.message) {
       setConnexionErreur(response.data.message);
     } 
     else {
       setConnexionReussie({
        identifiant: response.data[0].id,
        nom: response.data[0].nom,
        prenom: response.data[0].prenom,
        mail: response.data[0].email,
        success: true
       });
      login();
     } 
     });
   };

   const valeur = window.localStorage.getItem("user");
    valeur ? login(): logout();

    if(isAuthenticated) {
      navigate('/profile');
    } if(connexionReussie.success) {
        window.localStorage.setItem("user", JSON.stringify({...connexionReussie}));
      }

  return (
  
   <div>
    <div className="card">
    <img src={avatar} alt="avatar profil" className="profile-image"></img>
  
    <form onSubmit={handleSubmit}>
    <div className="label">
    
      <label>Email</label>
      <input type="text" name="email" placeholder="Entrez votre email :" className="form-control" onChange={handleChange} />
      <p>{formErreur.email &&<div className='erreur-message'>{formErreur.email}</div>}</p>

      <label>Mot de passe</label>
      <input type="password" name="password" placeholder="Entrez votre mot de passe :" className="form-control" onChange={handleChange} />
      <p>{formErreur.password &&<div className='erreur-message'>{formErreur.password}</div>}</p>

      <div className="bouton">
        <button onClick={Connecter} className="btn btn-success btn-lg">Se connecter</button>
      </div>
      <br />
      
      {connexionErreur && (
      <div className="connexion_erreur">
        <h5><div className="alert alert-danger">{connexionErreur}</div></h5>
      </div>
      )}
      
      <Link className="password" to="/verification_mail">mot de passe oublié</Link>
            
    </div>  
    </form>
    </div>
   </div>
 );
 }

export default Connexion;
