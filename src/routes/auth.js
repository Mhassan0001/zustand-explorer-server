import express from "express";
const router = express.Router();
import { createAdmin,createUser,login } from "../controller/auth";

router.route("/createAdmin").post(createAdmin);
router.route("/create").post(createUser);
router.route("/login").post(login);

export default router;
