import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";
import blogrouter from "./routes/blogRoutes.js";
import projectrouter from "./routes/projectRoutes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use('/api', blogrouter);
app.use('/api', projectrouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));