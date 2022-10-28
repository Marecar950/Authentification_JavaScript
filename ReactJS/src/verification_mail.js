import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

  function VerificationMail() {
    const [email, setEmail] = useState({
      valeurEmail: ""
    });
    
    const navigate = useNavigate();
     
    const [error, setError] = useState('');
    const [formErreur, setFormErreur] = useState('');
    
    const [emailSuccess, setEmailSuccess] = useState({
      email: ""
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEmail({...email, [name]: value});
    }
      
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErreur(verification(email));  
    }
    
    const verification = (valeur) => {
     const erreur = {};
    
    if(valeur.valeurEmail.trim() === "") {
      erreur.valeurEmail = "Veuillez entrer l'adresse mail !";
    }
     return erreur;
    }
    
    const Verifier = () => {
      Axios.post("https://node-express-authentification.herokuapp.com/verification_mail", {
        email: email.valeurEmail,
      }).then((response) => {
        if(response.data.message) {
          setError(response.data.message);
        } else {
            setEmailSuccess({
              email: response.data[0].email
            });
        }
      });
    }
        
      if(emailSuccess.email) {
        navigate("/confirmation_password");
        window.localStorage.setItem("email", JSON.stringify(emailSuccess));
      }
      
    return (
     <div>
      <h2 className="texte">Confirmation de l'adresse mail</h2>
      <div className="card">
       <form onSubmit={handleSubmit}>
        <div className="form-group">
         <input type="text" name="valeurEmail" className="form-control" placeholder="Entrez la confirmation de l'adresse mail :" onChange={handleChange} />
         <p>{formErreur.valeurEmail &&<div class="alert alert-danger">{formErreur.valeurEmail}</div>}</p>
         {error && (
           <p><div className="alert alert-danger">{error}</div></p>
         )}
         <button className="btn btn-primary btn-lg" onClick ={Verifier}>Vérifier</button>
        </div>
      </form>
      </div>
     </div>
    )
  } 
  
export default VerificationMail;
