import { useState, useEffect } from "react";

  function Profile() {
  
    const [data, setData] = useState([]);
    
    useEffect(() => {
      const resultat = JSON.parse(localStorage.getItem('user'));
    
        setData(resultat);   
     }, []);
  
   return (
    <div>
     <div className="nom">
      <h1>Bonjour {data.nom}</h1><br />
     </div>
     
     <h5>Voici vos informations personnelles :</h5><br />
     <p>Votre nom : {data.nom}</p>
     <p>Votre prénom : {data.prenom}</p>
     <p>Votre mail : {data.mail}</p>
    </div>
   )
  };
  
export default Profile;
