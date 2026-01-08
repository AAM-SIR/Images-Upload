// import pkg from "pg";
// import dotenv from "dotenv";

// dotenv.config();
// const { Pool } = pkg;

// const isProduction = process.env.NODE_ENV === "production";

// const pool = new Pool(
//   isProduction
//     ? {
//         // Render / Production
//         connectionString: process.env.DATABASE_URL,
//         ssl: { rejectUnauthorized: false },
//       }
//     : {
//         // Local PostgreSQL
//         host: process.env.PG_HOST,
//         user: process.env.PG_USER,
//         password: process.env.PG_PASSWORD,
//         database: process.env.PG_DATABASE,
//         port: Number(process.env.PG_PORT),
//         ssl: false,
//       }
// );

// pool.on("connect", () => {
//   console.log(
//     isProduction
//       ? "✅ Connected to Render PostgreSQL"
//       : "✅ Connected to Local PostgreSQL"
//   );
// });

// pool.on("error", (err) => {
//   console.error("❌ PostgreSQL error:", err);
//   process.exit(1);
// });

// export default pool;

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,  // external URL use karvu
  ssl: {
    rejectUnauthorized: false, // Render PostgreSQL mate SSL required
  },
});

export default pool;
