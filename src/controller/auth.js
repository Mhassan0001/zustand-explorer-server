import auth from "../models/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError.js";
import asyncHandler from "../middleware/asyncHandler.js";

//!================================================================

const cookieOption = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 24 * 60 * 60 * 1000,
};

//!================================================================

const createUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, mobile } = req.body;
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);

  const existingUser = await auth.findOne({ email });

  if (existingUser) {
    throw new AppError("Email Already Registered...... ", 400);
  }

  const data = await auth.create({
    firstName,
    lastName,
    email,
    mobile,
    password: hash,
    role: "user",
  });

  const token = jwt.sign(
    {
      _id: data._id,
      firstName: data.firstName,
      role: data.role,
    },
    process.env.JWT_KEY,
    { expiresIn: "1d" },
  );

  data.password = undefined;
  res.cookie("token", token, cookieOption);
  res.status(201).json({ msg: "User Created Successfully", data: data });
});

//!================================================================

const createAdmin = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, mobile } = req.body;
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);

  const existingUser = await auth.findOne({ email });

  if (existingUser) {
    throw new AppError("Email Already Registered...... ", 400);
  }

  const data = await auth.create({
    firstName,
    lastName,
    email,
    mobile,
    password: hash,
    role: "admin",
  });

  const token = jwt.sign(
    {
      _id: data._id,
      firstName: data.firstName,
      role: data.role,
    },
    process.env.JWT_KEY,
    { expiresIn: "1d" },
  );

  data.password = undefined;
  res.cookie("token", token, cookieOption);
  res.status(201).json({ msg: "User Created Successfully", data: data });
});

//!================================================================

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await auth.findOne({ email });
  if (!user) {
    throw new AppError("You are not Registered", 404);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Password is Wrong", 401);
  }

  const token = jwt.sign(
    {
      email: user.email,
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_KEY,
    { expiresIn: "1d" },
  );

  user.password = undefined;
  res.cookie("token", token, cookieOption);

  res.status(200).json({
    msg: "Login successfully",
    data: user,
  });
});

export { createUser, login, createAdmin };
