import express from "express";
import upload from "../Middleware/multerStorage.js";
import {
  uploadImage,
  getImages,
  deleteImage,
  DeleteAllImages,
} from "../Controller/Images.js";

const router = express.Router();

router.post("/upload", upload.single("image"), uploadImage);
router.get("/get-all", getImages);
router.delete("/delete/:id", deleteImage);
router.delete("/delete-all", DeleteAllImages);

export default router;
