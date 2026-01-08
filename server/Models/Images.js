import pool from "../DBConnection/PGConnection.js";

export const ensureImagesTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS images (
        id SERIAL PRIMARY KEY,
        image_url TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Images table ready");
  } catch (err) {
    console.error("❌ Table create error:", err);
  }
};

export const insertImage = async (imageUrl) => {
  const result = await pool.query(
    "INSERT INTO images (image_url) VALUES ($1) RETURNING *",
    [imageUrl]
  );
  return result.rows[0];
};

export const getAllImages = async () => {
  const result = await pool.query(
    "SELECT * FROM images ORDER BY created_at DESC"
  );
  return result.rows;
};

export const deleteImageById = async (id) => {
  const result = await pool.query(
    "DELETE FROM images WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0];
};

export const deleteAllImages = async () => {
  await pool.query("DELETE FROM images");
};
