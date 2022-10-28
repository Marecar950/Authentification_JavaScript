import { useState } from "react";
import Axios from "axios";
import avatar from "./avatar.png";

  function Inscription() {
  
    const [formValeur, setFormValeur] = useState({
      username: "",
      prenom: "",
      email: "",
      password: "",
      confirm_password: "",
      messag: "",
      success: false
    });
      
    const handleChange = (e) => {
    const { name, value } = e.target;
      setFormValeur({ ...formValeur, [name]: value });
    };

    const [formErreur, setFormErreur] = useState('');
    const [emailErreur, setEmailErreur] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setFormErreur(validation(formValeur));
    };
    
    const validation = (valeur) => {
    const erreur = {};
    const regex = /^[a-zA-Z0-9.]+@[a-z0-9]+.[a-z]{2,3}/;
    
      if (valeur.username.trim() === "") {
        erreur.username = "Le nom d'utilisateur est obligatoire !";
      } 
      if (valeur.prenom.trim() === "") {
        erreur.prenom = "Le prénom est obligatoire !";
      } 
      if (valeur.email.trim() === "") {
        erreur.email = "L'adresse email est obligatoire !";
      } else if (!regex.test(valeur.email)) {
          erreur.email = "Ceci n'est pas une adresse email valide !";
      }
      if (valeur.password === "") {
        erreur.password = "Le mot de passe est obligatoire !";
      } else if (valeur.password.length < 8) {
          erreur.password = "Le mot de passe doit contenir au minimum 8 caractères !";
      } 
      if (valeur.confirm_password === "") {
        erreur.confirm_password = "Le confirmation est obligatoire !";
      } else if (valeur.confirm_password !== valeur.password) {
          erreur.confirm_password = "Le mot de passe et la confirmation ne sont pas identiques !";
      }
      return erreur;
    };

    const Inscrire = () => {
      Axios.post("https://node-express-authentification.herokuapp.com/inscription", {
        username: formValeur.username,
        prenom: formValeur.prenom,
        email: formValeur.email,
        password: formValeur.password,
        confirm_password: formValeur.confirm_password,
      }).then((response) => {
        
      if(response.data.message) {
        setEmailErreur(response.data.message);
      } else {
          setFormValeur({
            messag: response.data.messag,
            success: true
          })
        }
      });
    };
  
  return (
  
   <>
    <h1>Bienvenue sur mon site</h1>
    <h2> Veuillez vous inscrire ou vous connecter</h2>
    <div className="card">
    <img src={avatar} alt="avatar profil" className="profile-image"></img>
    
    <form onSubmit={handleSubmit}>
     
      {!formValeur.success && (
      <div className="label">
    
       <label>Nom</label>
       <input type="text" name="username" placeholder="Entrez votre nom :" className="form-control" onChange={handleChange} />
       <p>{formErreur.username &&<div className='erreur-message'>{formErreur.username}</div>}</p>
       
       <label>Prénom</label>
       <input type="text" name="prenom" placeholder="Entrez votre prénom :" className="form-control" onChange={handleChange} />
       <p>{formErreur.prenom &&<div className='erreur-message'>{formErreur.prenom}</div>}</p>

       <label>Email</label>
       <input type="text" name="email" placeholder="Entrez votre email :" className="form-control" onChange={handleChange} />
       <p>{formErreur.email &&<div className='erreur-message'>{formErreur.email}</div>}</p>

       <div className="email_erreur">
         <p>{emailErreur}</p>
       </div>

       <label>Mot de passe</label>
       <input type="password" name="password" placeholder="Entrez un mot de passe :" className="form-control" onChange={handleChange} />
       <p>{formErreur.password &&<div className='erreur-message'>{formErreur.password}</div>}</p>

       <label>Confirmation de mot de passe</label>
       <input type="password" name="confirm_password" placeholder="Entrez un mot de passe à nouveau :" className="form-control" onChange={handleChange} />
       <p>{formErreur.confirm_password &&<div className='erreur-message'>{formErreur.confirm_password}</div>}</p>

       <div class="bouton">
         <button onClick={Inscrire} className="btn btn-primary btn-lg">S'inscrire</button>
       </div>
     
      </div>
      )}
     
      {formValeur.messag && (
       <div className="inscription">
        <div className="alert alert-success" id="Success">
         <p> {formValeur.messag} </p>
        </div>
       </div>
      )}
 
    </form>
    </div>
  </>
 );
}

export default Inscription;
