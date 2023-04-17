import CropEasy from "@/components/Crop/CropEasy";
import React, { createContext, useEffect, useState } from "react";
import defaultPicTest from "@/assets/images/naruto2.png";
import imgbbService from "@/services/imgbb";
import { UpdatePic } from "@/services/user";

export const UserPhotoContext = createContext();

export const UserPhotoProvider = ({ children }) => {
  const [openCrop, setOpenCrop] = useState(false);
  const [file, setFile] = useState(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [sinalize, setSinalize] = useState(false);

  async function updateUserPic(file) {
    try {
      let base64String;
      const reader = new FileReader();
      reader.addEventListener("load", async () => {
        base64String = reader.result;
        const imageUrl =
          (await imgbbService.uploadFile(base64String)) || defaultPicTest;
        await UpdatePic(imageUrl);
      });
      reader.readAsDataURL(file);
    } catch (error) {
      return;
    }
  }

  useEffect(() => {
    if (sinalize) {
      setSinalize(false);
      updateUserPic(file);
    }
  }, [sinalize]);

  return (
    <UserPhotoContext.Provider
      value={{ openCrop, setOpenCrop, file, setFile, photoURL, setPhotoURL }}
    >
      {!openCrop ? (
        children
      ) : (
        <CropEasy
          {...{
            photoURL,
            setOpenCrop,
            setPhotoURL,
            setFile,
            proporcao: 1,
            heightBlackArea: 300,
            setSinalize,
            sinalize,
          }}
        />
      )}
    </UserPhotoContext.Provider>
  );
};
