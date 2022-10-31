import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

  function VerificationMail() {
    const [mail, setMail] = useState({
      valeurMail: ""
    });
    
    const navigate = useNavigate();
     
    const [error, setError] = useState('');
    const [formErreur, setFormErreur] = useState('');
    
    const [mailSuccess, setMailSuccess] = useState({
      mail: ""
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setMail({...mail, [name]: value});
    }
      
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErreur(verification(mail));  
    }
    
    const verification = (valeur) => {
     const erreur = {};
    
    if(valeur.valeurMail.trim() === "") {
      erreur.valeurMail = "Veuillez entrer l'adresse mail !";
    }
     return erreur;
    }
    
    const Verifier = () => {
      Axios.post("https://node-express-authentification.herokuapp.com/verification_mail", {
        mail: mail.valeurMail,
      }).then((response) => {
        if(response.data.message) {
          setError(response.data.message);
        } else {
            setMailSuccess({
              mail: response.data[0].email
            });
        }
      });
    }
        
      if(mailSuccess.mail) {
        navigate("/confirmation_password");
        window.localStorage.setItem("mail", JSON.stringify(mailSuccess));
      }
      
    return (
     <div>
      <h2 className="texte">Confirmation de l'adresse mail</h2>
      <div className="card">
       <form onSubmit={handleSubmit}>
        <div className="form-group">
         <input type="text" name="valeurMail" className="form-control" placeholder="Entrez la confirmation de l'adresse mail :" onChange={handleChange} />
         <p>{formErreur.valeurMail &&<div class="alert alert-danger">{formErreur.valeurMail}</div>}</p>
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
