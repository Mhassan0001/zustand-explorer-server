import express from "express";
const router = express.Router();
import { createAdmin, createUser, getMe, login } from "../controller/auth.js";
import { authMiddleware } from "../middleware/auth.js";

router.route("/createAdmin").post(createAdmin);
router.route("/create").post(createUser);
router.route("/login").post(login);
router.route("/me").get(authMiddleware,getMe);

export default router;
