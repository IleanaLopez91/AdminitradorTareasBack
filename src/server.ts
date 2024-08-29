import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();
connectDB();

const server = express();
server.use(cors(corsConfig));
server.use(express.json());

server.use("/api/projects", projectRoutes);

export default server;
