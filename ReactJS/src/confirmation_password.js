import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

  function ConfirmationPassword() {
    const [password, setPassword] = useState({
      Password: "",
      ConfirmPassword: ""
    });
    
    const navigate = useNavigate();
     
    const [data, setData] = useState([]);
    
    const [formErreur, setFormErreur] = useState('');
    const [success, setSuccess] = useState('');
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setPassword({...password, [name]: value});
      }
      
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErreur(confirmation(password));  
    }
    
    const confirmation = (valeur) => {
     const error = {};
    
    if(!valeur.Password) {
      error.Password = "Veuillez entrer le nouveau mot de passe !";
    } else if (valeur.Password.length < 8) {
        error.Password = "Le mot de passe doit contenir au minimum 8 caractères !";
    } 
    if(!valeur.ConfirmPassword) {
      error.ConfirmPassword = "Veuillez entrer la confirmation !";
    } else if (valeur.ConfirmPassword !== valeur.Password) {
        error.ConfirmPassword = "Le mot de passe et la confirmation ne sont pas identiques !";
    }
     return error;
    }
    
    useEffect(() => {
      const resultat = JSON.parse(localStorage.getItem('email'));
       setData(resultat);   
    }, []);
    
    const Confirmer = () => {
      Axios.post("https://node-express-authentification.herokuapp.com/confirmation_password", {
        email: data.email,
        password: password.Password,
        confirmation_password: password.ConfirmPassword
      }).then((response) => {
        if(response.data.messag) {
          setSuccess(response.data.messag);
          window.localStorage.removeItem("email");
        } 
      });
    }
    
    const valeur = window.localStorage.getItem("email");
      if(!valeur) {
        navigate('/connexion');
      }
    
    return (
     <div>
      <h2 className="texte">Confirmation de mot de passe</h2>
      <div className="card">
      {(success && (
      <>
      <p><div className="alert alert-success" id="passwordSuccess">{success}</div></p>
      </>
      )) || (
      <>
      <form onSubmit={handleSubmit}>
       <div className="form-group">
        <input type="password" name="Password" className="form-control" placeholder="Entrez le nouveau mot de passe" onChange={handleChange} />
        <p>{formErreur.Password &&<div class="alert alert-danger">{formErreur.Password}</div>}</p>
        <input type="password" name="ConfirmPassword" className="form-control" placeholder="Entrez la confirmation de mot de passe" onChange={handleChange} />
        <p>{formErreur.ConfirmPassword &&<div class="alert alert-danger">{formErreur.ConfirmPassword}</div>}</p>
        <button className="btn btn-primary btn-lg" onClick ={Confirmer}>Vérifier</button>
      </div>
      </form>
      </>
      )}
      </div>
     </div>
    )
  } 
  
export default ConfirmationPassword;
