import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();
connectDB();

const server = express();
server.use(express.json());

server.use("/api/projects", projectRoutes);

export default server;
