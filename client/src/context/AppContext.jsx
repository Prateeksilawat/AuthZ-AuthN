// src/context/AppContext.js
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

// Create the context
export const AppContent = createContext();

// AppContext provider component
export const AppContext = (props) => {

  axios.defaults.withCredentials = true

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");

      data.success ? setUserData(data.userData) : toast.error(data.message);
    } 
    catch (error) {

      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const getAuthState = async () => {
    try {
        const {data} = await axios.get (backendUrl + '/api/auth/is-auth')
        if(data.success){
            setIsLoggedIn(true)
            getUserData()
        }
    } catch (error) {
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }

  useEffect(() => {
    getAuthState()
  },[])

  // Provide these values to the rest of the app
  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
    getAuthState
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
