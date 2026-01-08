// import axios from "axios";

// export const uploadImageApi = async (file) => {
//   if (!process.env.NEXT_PUBLIC_API_URL) {
//     throw new Error("API URL not defined");
//   }

//   const formData = new FormData();
//   formData.append("image", file);

//   const res = await axios.post(
//     `${process.env.NEXT_PUBLIC_API_URL}/api/images/upload`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     }
//   );

//   if (!res.data) {
//     throw new Error("Upload failed");
//   }

//   return res.data;
// };

import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL; 

export const uploadImageApi = async (file) => {
  if (!file) throw new Error("No file selected");
  
  if (!API_URL) throw new Error("API URL not defined");

  const formData = new FormData();
  formData.append("image", file);

  const res = await axios.post(`${API_URL}/api/images/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

export const fetchImagesApi = async () => {
  if (!API_URL) throw new Error("API URL not defined");

  const res = await axios.get(`${API_URL}/api/images/get-all`);
  return res.data; // array of images
};  

export const deleteImageApi = async (id) => {
  const res = await axios.delete(`${API_URL}/api/images/delete/${id}`);
  return res.data;
};

export const deleteAllImagesApi = async () => {
  const res = await axios.delete(`${API_URL}/api/images/delete-all`);
  return res.data;
};