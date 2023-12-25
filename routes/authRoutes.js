import express from "express";
const router = express.Router();

import rateLimiter from "express-rate-limit";

import {
  register,
  login,
  updateUser,
  getCurrentUser,
  logout,
} from "../controllers/authController.js";

import authenticateUser from "../middleware/auth.js";

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

router.route("/register").post(apiLimiter, register);
router.route("/login").post(apiLimiter, login);
router.get("/logout", logout);

router.route("/updateUser/:id").patch(authenticateUser, updateUser);
router.route("/getCurrentUser").get(authenticateUser, getCurrentUser);

// Export the router
export default router;
