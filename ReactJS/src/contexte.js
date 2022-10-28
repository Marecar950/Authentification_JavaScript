import { createContext } from "react"; 

  const Contexte = createContext({
    isAuthenticated: false,
    login: () => {},
    logout: () => {}
  });
  
export default Contexte;
