"use client";

import { uploadImageApi } from "@/api/imageapi";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");  

  const handleUpload = async () => {
    if (!file) return alert("Please select image");

    try {
      const res = await uploadImageApi(file);
      console.log("Upload response:", res);
      setMsg("Image uploaded successfully ✅");
    } catch (err) {
      console.error(err);
      setMsg(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-xl shadow-md w-[360px]">
        <h1 className="text-xl font-semibold text-center mb-4">
          Image Upload
        </h1>

        <input
          type="file"
          accept="image/*"
          className="w-full border p-2 rounded mb-4 cursor-pointer"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4 cursor-pointer"
        >
          Upload
        </button>

        <div className="text-center mb-4">
          <a
            href="/dashboard"
            className="text-blue-600 hover:underline cursor-pointer"
          >
            Go to Dashboard
          </a>
        </div>

        {msg && <p className="text-center mt-4 text-sm">{msg}</p>}
      </div>
    </div>
  );
}
