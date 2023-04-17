import { useContext } from "react";
import { AuthContext } from "./index";

export const UseAuth = () => {
  const context = useContext(AuthContext);
  return context;
};