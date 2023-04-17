import { useContext } from "react";
import { UserPhotoContext } from "./index";

export const useUserPhotoContext = () => {
  const context = useContext(UserPhotoContext);
  return context;
};
