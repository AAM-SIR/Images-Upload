"use client";

import { deleteAllImagesApi, deleteImageApi, fetchImagesApi, uploadImageApi } from "@/api/imageapi";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [images, setImages] = useState([]);
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");
  const [msgType, setMsgType] = useState("success");
  const [loading, setLoading] = useState(true);

  const loadImages = async () => {
    setLoading(true);
    try {
      const res = await fetchImagesApi();
            setImages(res.data || []); // backend returns { count, data } -> use res.data.data if needed
        } catch (err) {
            console.error(err);
      setMsg("Failed to fetch images");
      setMsgType("error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleUpload = async () => {
    if (!file) return alert("Please select an image");
    await uploadImageApi(file);
    setMsg("Image uploaded successfully ✅");
    setMsgType("success");
    setFile(null);
    loadImages();
  };

  const handleDeleteAll = async () => {
    if (!confirm("Delete all images?")) return;
    await deleteAllImagesApi();
    setImages([]);
  };

  // ✅ NEW
  const handleDeleteOne = async (id) => {
    if (!confirm("Delete this image?")) return;
    await deleteImageApi(id);
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4 text-center">Dashboard</h1>

      <div className="mb-6 flex gap-4 justify-center flex-wrap">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="border p-2 rounded cursor-pointer"
        />
        <button onClick={handleUpload} className="bg-blue-600 text-white px-4 py-2 rounded cursor-pointer">
          Upload
        </button>
        <button onClick={handleDeleteAll} className="bg-red-600 text-white px-4 py-2 rounded cursor-pointer">
          Delete All
        </button>
      </div>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((img) => (
            <div key={img.id} className="border rounded shadow-sm bg-white p-2">
              <img
                src={img.image_url}
                className="w-full h-auto object-contain"
              />

              <p className="text-xs text-center mt-2">
                {new Date(img.created_at).toLocaleString()}
              </p>

              {/* ✅ DELETE BUTTON */}
              <button
                onClick={() => handleDeleteOne(img.id)}
                className="mt-2 w-full bg-red-500 text-white py-1 rounded hover:bg-red-600 cursor-pointer"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No images uploaded yet.</p>
      )}
    </div>
  );
}
