import React, { createContext, useEffect, useState } from "react";
import {
  getUserLocalStorage,
  LoginRequest,
  setUserLocalStorage,
  SignupRequest,
} from "../../services/user";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUserLocalStorage());

  useEffect(() => {
    const user = getUserLocalStorage();

    if (user) {
      setUser(user);
    }
  }, []);

  async function authenticate(body) {
    const user = await LoginRequest(body);
    setUser(user);
    setUserLocalStorage(user);

    return user;
  }

  function signup(user) {
    const response = SignupRequest(user);
    return response;
  }

  function logout() {
    setUser(null);
    setUserLocalStorage(null);
  }

  return (
    <AuthContext.Provider value={{ user, authenticate, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};
