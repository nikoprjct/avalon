import express from "express";
import dotenv from "dotenv";
import healthRoutes from "./routes/health";
import usersRoutes from "./routes/users";
import filesRoutes from "./routes/files";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/files", filesRoutes);

const PORT = Number(process.env.BACKEND_PORT) || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Backend API running on port ${PORT}`);
});
