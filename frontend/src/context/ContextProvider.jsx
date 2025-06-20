import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react";

const authContext = createContext();

const ContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const login = (user) => {
        setUser(user)
    }

    const logout = () => {
        localStorage.removeItem('token')
        setUser(null)
    }
    useEffect(()=>{
      const verifyUser = async (params) => {
        try {
          const res = await axios.get("http://localhost:3030/api/auth/verify",{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },}
           )
          if(res.data.success){
            setUser(res.data.user);
          }else{
            setUser(null);
          }
        } catch (error) {
          console.log("Error verifying user:", error);
          
        }
      }
      verifyUser();
    },[])

  return(
  <authContext.Provider value={{user,login,logout}}>
    {children}
  </authContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(authContext);
};
export default ContextProvider;
