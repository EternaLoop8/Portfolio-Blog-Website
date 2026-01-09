import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import "dotenv/config";
import router from "./routes/blogRoutes.js";

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/', router);

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

