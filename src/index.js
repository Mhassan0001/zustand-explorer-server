import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import morgan from "morgan";
import cors from "cors";

const CLIENT_URL = "http://localhost:5173";

//! =================================================

const server = express();
const port = process.env.PORT || 9000;

server.use(cors({ origin: CLIENT_URL, credentials: true }));
server.use(express.json());
server.use(morgan("dev"));

server.get("/", (req, res) => {
  res.json({ msg: "Server Running Successfully....." });
});

//! =================================================

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server Connected Successfully At ${port} & 
  MongoDB connected ✅........... `);
    });
  })
  .catch((err) => {
    console.error(`MOngo_DB Conection Failed.....${err.message}`);
    process.exit(1);
  });
