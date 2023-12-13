import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuthTokenFromCookie } from "./getToken";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const token = getAuthTokenFromCookie();
  const login = (userData) => {
    setUser(userData);
  };
  useEffect(() => {
    // (async function (){
    //     try {
    //       console.log(token)
    //         const response = await fetch("https://eagle-backend-ekxb.onrender.com/users", {
    //           method: 'POST',
    //           headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${token}`,
    //           },
    //           body: JSON.stringify({}),
    //         });
    //         let res=await response.json();
    //         if (!response.ok) {
    //           throw new Error(`HTTP error! Status: ${response.status}`);
    //         }
    //         const responseData = await response.json();
    //         console.log(responseData);
    //       } catch (error) {
    //         console.error('Error:', error);
    //       }
    // })()
  }, []);

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
