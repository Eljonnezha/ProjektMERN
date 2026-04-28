import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
export const UserContext = createContext({});
export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({});
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/user/", {
          withCredentials: true,
        });
        setUserInfo(res.data || {});
      } catch (err) {
        setUserInfo({});
      } finally {
        setAuthChecked(true);
      }
    };

    loadUser();
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo, authChecked }}>
      {children}
    </UserContext.Provider>
  );
};
