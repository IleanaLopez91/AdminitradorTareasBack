import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();
connectDB();

const server = express();
server.use(cors(corsConfig));
server.use(morgan("dev"));
server.use(express.json());

server.use("/api/projects", projectRoutes);

export default server;
