import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import portfolioRoutes from "./routes/portfolioRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

dotenv.config({ path: resolve(__dirname, "../.env") });

const app = express();
const PORT = process.env.PORT || 5000;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, message: "API operativa" });
});

app.use("/api/portfolio", portfolioRoutes);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Error starting server:", error.message);
  process.exit(1);
});
