const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const bcrypt = require('bcryptjs');
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "database-1.c87ughtxanqz.eu-west-3.rds.amazonaws.com",
  user: "admin",
  password: "MOUZAMMIL20", 
  database: "authentification",
});

db.connect(err=>{
  if(err) {
    console.log(err.message);
  }
});

app.post("/inscription", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const prenom = req.body.prenom;
  const password = req.body.password;
  const confirm_password = req.body.confirm_password;
  const regex = /^[a-zA-Z0-9.]+@[a-z0-9]+.[a-z]{2,3}/;
 
  const passwordBcrypt = bcrypt.hashSync(password, 10);
  
   if(username != "" && prenom != "" && email != "" && regex.test(email)  && password != "" && confirm_password != "" && password == confirm_password) {
    
    db.query("INSERT INTO utilisateurs (nom, prenom, email, password) SELECT * FROM (SELECT ? AS nom, ? AS prenom, ? AS email, ? AS password) AS tmp WHERE NOT EXISTS (SELECT email FROM utilisateurs WHERE email = ?)",
    [username, prenom, email, passwordBcrypt, email], 
    (err, result) => {
    
    if(err) {
      console.log(err);
    } 
    
    if(result.affectedRows == 0) {
      res.send({ message: "L'email existe déjà !"});
    } 
    else {
      res.send({ messag: "Votre inscription à bien été enregistré."});
    } 
    });
   }
}); 

app.post("/connexion", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
    
    db.query("SELECT * FROM utilisateurs WHERE email = ?", email, function(err, result) {
    
      if(err) {
        console.log(err);
      }
      
      if(email != "" && password != "") {
      
      if(result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, results) => {
        
        if(results) {
          res.send(result);
        } else {
          res.send({ message: "Email ou mot de passe incorrect !" });
        }
      });   
      } else {
          res.send({ message: "Email ou mot de passe incorrect !" });
        }
      }
   });
});  

app.post("/verification_mail", (req, res) => {
  const email = req.body.email;
  
  if(email != "") {
  
  db.query("SELECT email from utilisateurs where email = ? ", email, (err, result) => {
  
    if(err) {
      console.log(err);
    }
    
    if(!result.length > 0) {
      res.send({ message: "Email incorrect !" });
    } else {
        res.send(result);
    }
  });
  }
}); 

app.post("/confirmation_password", (req, res) => {
  const password = req.body.password;
  const confirmation_password = req.body.confirmation_password;
  const email = req.body.email;
  
  const passwordBcrypt = bcrypt.hashSync(password, 10);
  
  if(password != "" && confirmation_password != "" && password === confirmation_password) {
  
  db.query("UPDATE utilisateurs SET password = ? where email = ?", [passwordBcrypt, email], (err, result) => {
  
    if(err) {
      console.log(err);
    }
    
    if(result.changedRows == 1) {
        res.send({ messag: "Votre mot de passe à bien été mis à jour."});
    }
  });
  }
});  
            
app.listen(PORT, () => {
  console.log("Your server is running on port " + `${PORT}`);
});
