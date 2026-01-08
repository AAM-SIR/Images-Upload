import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import {
  deleteAllImages,
  deleteImageById,
  getAllImages,
  insertImage,
} from "../Models/Images.js";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Upload image
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "Image required" });
    }

    const uploadToCloudinary = (file) =>
      new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "images" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );

        streamifier.createReadStream(file.buffer).pipe(stream);
      });

    const result = await uploadToCloudinary(req.file);

    const savedImage = await insertImage(result.secure_url);

    res.status(201).json({
      message: "Image uploaded successfully",
      data: savedImage,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
};

// Get all images
export const getImages = async (req, res) => {
  try {
    const images = await getAllImages();
    res.json({ count: images.length, data: images });
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
};

// Delete image
export const deleteImage = async (req, res) => {
  try {
    const deleted = await deleteImageById(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete failed" });
  }
};

// Delete all
export const DeleteAllImages = async (req, res) => {
  try {
    await deleteAllImages();
    res.json({ message: "All images deleted" });
  } catch (err) {
    res.status(500).json({ error: "Delete all failed" });
  }
};
